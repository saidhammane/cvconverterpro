import { NextResponse } from "next/server";
import { countryRules } from "@/lib/country-rules";
import { TextExtractionError, extractTextFromResume } from "@/lib/extract-text";
import { mapCvSections } from "@/lib/map-cv-sections";
import {
  MAX_FILE_SIZE_MB,
  getCountryLabel,
  isSupportedCountry,
  type ConvertApiError,
  type ConvertApiSuccess,
  type ConvertPreviewSection,
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

function buildPendingSection(note: string): ConvertPreviewSection {
  return {
    status: "pending",
    note,
    items: []
  };
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
    const normalizedFile: FileLike = {
      name: file.name,
      size: file.size,
      type: file.type
    };
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Future step: map extracted raw text into structured CV fields before prompt creation.
    const extractionResult = await extractTextFromResume({
      fileName: file.name,
      mimeType: file.type,
      buffer: fileBuffer
    });
    const structuredCv = mapCvSections(extractionResult.text);

    // Future step: build an AI prompt from extracted text, mapped CV data, and country rules.
    // Future step: apply country-specific rewriting to the mapped sections below.
    // Future step: replace the placeholder preview below with shaped conversion output.
    const responseBody: ConvertApiSuccess = {
      success: true,
      country: typedCountry,
      countryLabel: getCountryLabel(typedCountry),
      originalFileName: file.name,
      detectedMimeType: extractionResult.mimeType,
      maxFileSizeMb: MAX_FILE_SIZE_MB,
      conversionStatus: "cv_mapped_ready",
      extractionStatus: extractionResult.status,
      extractedText: extractionResult.text,
      extractedTextPreview: extractionResult.preview,
      extractedCharacterCount: extractionResult.characterCount,
      structuredCv,
      message:
        "Your file passed validation, text extraction, and heuristic CV structuring. The AI conversion step can plug into this contract next.",
      resultPreview: {
        summary: buildPendingSection(
          "Professional summary rewriting can use the mapped profile fields and raw extracted text next."
        ),
        experience: buildPendingSection(
          "Experience bullets can now be rewritten from the mapped work history structure."
        ),
        education: buildPendingSection(
          "Education normalization can now build on the mapped education entries."
        ),
        skills: buildPendingSection(
          "Skills grouping and localization can now build on the heuristic section mapping."
        ),
        extraSections: buildPendingSection(
          "Languages, certifications, projects, and other extra sections will be added dynamically later."
        ),
        countryRulesUsed: rules
      }
    };

    return NextResponse.json<ConvertApiSuccess>(responseBody, { status: 200 });
  } catch (error) {
    if (error instanceof TextExtractionError) {
      return jsonError(error.publicMessage, 422, undefined, "EXTRACTION_ERROR");
    }

    console.error("Convert API placeholder error:", error);

    return jsonError(
      "Something unexpected happened while preparing the conversion flow. Please try again.",
      500,
      undefined,
      "SERVER_ERROR"
    );
  }
}
