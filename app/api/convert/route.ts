import { NextResponse } from "next/server";
import { AiConversionError, convertCvWithOpenAI } from "@/lib/ai-convert";
import { countryRules } from "@/lib/country-rules";
import { TextExtractionError, extractTextFromResume } from "@/lib/extract-text";
import { mapCvSections } from "@/lib/map-cv-sections";
import {
  MAX_FILE_SIZE_MB,
  getCountryLabel,
  isSupportedCountry,
  type ConvertApiError,
  type ConvertApiSuccess,
  type CountryValue,
  type FileLike,
  validateResumeFile
} from "@/lib/convert";

export const runtime = "nodejs";

function jsonError(
  message: string,
  status: number,
  details?: string[],
  code: ConvertApiError["error"]["code"] = "VALIDATION_ERROR"
) {
  return NextResponse.json<ConvertApiError>(
    {
      success: false,
      error: {
        code,
        message,
        details: details && details.length > 0 ? details : undefined
      }
    },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");
    const countryEntry = formData.get("country");
    const file = fileEntry instanceof File ? fileEntry : null;
    const country =
      typeof countryEntry === "string" ? countryEntry.trim().toLowerCase() : "";
    const validationErrors: string[] = [];

    if (!file) {
      validationErrors.push("A CV file is required.");
    }

    if (!country) {
      validationErrors.push("A target country is required.");
    }

    if (file) {
      const normalizedFile: FileLike = {
        name: file.name,
        size: file.size,
        type: file.type
      };

      validationErrors.push(...validateResumeFile(normalizedFile));
    }

    if (country && !isSupportedCountry(country)) {
      validationErrors.push("Please select one of the supported countries.");
    }

    if (validationErrors.length > 0) {
      return jsonError(
        "We could not start the conversion flow. Please review your file and country selection.",
        400,
        Array.from(new Set(validationErrors))
      );
    }

    if (!file || !isSupportedCountry(country)) {
      return jsonError(
        "The conversion request could not be prepared from the submitted data.",
        400
      );
    }

    const typedCountry: CountryValue = country;
    const rules = countryRules[typedCountry];
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const extractionResult = await extractTextFromResume({
      fileName: file.name,
      mimeType: file.type,
      buffer: fileBuffer
    });
    const structuredCv = mapCvSections(extractionResult.text);
    const conversionResult = await convertCvWithOpenAI({
      structuredCv,
      rawText: extractionResult.text,
      countryRules: rules,
      targetCountry: typedCountry
    });

    const responseBody: ConvertApiSuccess = {
      success: true,
      country: typedCountry,
      countryLabel: getCountryLabel(typedCountry),
      originalFileName: file.name,
      detectedMimeType: extractionResult.mimeType,
      maxFileSizeMb: MAX_FILE_SIZE_MB,
      conversionStatus: "completed",
      extractionStatus: extractionResult.status,
      extractedTextPreview: extractionResult.preview,
      extractedCharacterCount: extractionResult.characterCount,
      structuredCv,
      convertedCv: conversionResult.convertedCv,
      message: `Your ${rules.documentStyle.preferredDocumentName.toLowerCase()} draft was converted for ${getCountryLabel(
        typedCountry
      )}. Review the cleaned preview below or export it as a PDF.`,
      debug:
        process.env.NODE_ENV !== "production"
          ? {
              aiModel: conversionResult.model,
              structuredOutputMode: "responses.parse+zod",
              structuredOutputSchema: conversionResult.structuredOutputSchema,
              extractedText: extractionResult.text,
              countryRulesUsed: rules
            }
          : undefined
    };

    return NextResponse.json<ConvertApiSuccess>(responseBody, { status: 200 });
  } catch (error) {
    if (error instanceof TextExtractionError) {
      return jsonError(error.publicMessage, 422, undefined, "EXTRACTION_ERROR");
    }

    if (error instanceof AiConversionError) {
      const status =
        error.code === "MISSING_API_KEY"
          ? 500
          : error.code === "STRUCTURED_OUTPUT_REFUSAL"
            ? 422
            : 502;

      return jsonError(
        error.publicMessage,
        status,
        undefined,
        "CONVERSION_ERROR"
      );
    }

    console.error("Convert API error:", error);

    return jsonError(
      "Something unexpected happened while converting your CV. Please try again.",
      500,
      undefined,
      "SERVER_ERROR"
    );
  }
}
