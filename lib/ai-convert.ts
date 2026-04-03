import "server-only";

import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {
  convertedCvSchema,
  convertedCvSchemaName,
} from "@/lib/converted-cv-schema";
import {
  getOutputLanguageLabel,
  type ConvertedCvData,
  type CountryRule,
  type CountryValue,
  type OutputLanguageValue,
  type StructuredCvData
} from "@/lib/convert";
import { normalizeConvertedCv } from "@/lib/normalize-converted-cv";

const OPENAI_CV_MODEL = "gpt-4.1";

interface ConvertWithOpenAIInput {
  structuredCv: StructuredCvData;
  rawText: string;
  countryRules: CountryRule;
  targetCountry: CountryValue;
  outputLanguage: OutputLanguageValue;
}

interface ConvertWithOpenAIResult {
  convertedCv: ConvertedCvData;
  model: string;
  structuredOutputSchema: string;
}

type AiConversionErrorCode =
  | "MISSING_API_KEY"
  | "STRUCTURED_OUTPUT_REFUSAL"
  | "INVALID_STRUCTURED_OUTPUT"
  | "REQUEST_FAILED";

let cachedClient: OpenAI | null = null;

export class AiConversionError extends Error {
  code: AiConversionErrorCode;
  publicMessage: string;

  constructor(code: AiConversionErrorCode, publicMessage: string, cause?: unknown) {
    super(publicMessage, cause ? { cause } : undefined);
    this.name = "AiConversionError";
    this.code = code;
    this.publicMessage = publicMessage;
  }
}

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new AiConversionError(
      "MISSING_API_KEY",
      "The AI conversion service is not configured yet. Add OPENAI_API_KEY and try again."
    );
  }

  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }

  return cachedClient;
}

function buildSystemPrompt(
  targetCountry: CountryValue,
  outputLanguage: OutputLanguageValue,
  countryRules: CountryRule
): string {
  const outputLanguageLabel = getOutputLanguageLabel(outputLanguage);
  const canadaSpecificInstruction =
    targetCountry === "canada"
      ? [
          "For Canada specifically, produce a concise target-role headline instead of a keyword stack.",
          "Keep the header clean in this order: name, headline, contact details.",
          "Write a concise professional summary in 2 to 3 sentences.",
          "Use reverse-chronological experience entries with consistent dates and use Present for ongoing roles.",
          "Make each job clear and achievement-oriented in a Canadian resume style.",
          "Prefer strong action- and result-oriented wording without inventing metrics."
        ].join(" ")
      : "";

  return [
    "You are CVConverterPro, an expert resume and CV rewriting assistant.",
    `Rewrite the candidate's source CV for ${countryRules.label} (${targetCountry}).`,
    `The final converted CV must be written entirely in ${outputLanguageLabel}.`,
    outputLanguage === "english"
      ? "Produce natural, professional English throughout the final CV."
      : "Produce natural, professional French throughout the final CV.",
    "Do not mix languages anywhere in the final output.",
    "Follow the supplied country rules closely.",
    "Keep the output truthful to the source material.",
    "Do not invent companies, job titles, dates, achievements, credentials, employers, or skills.",
    "Remove forbidden or discouraged personal information when the country rules call for it.",
    "Improve clarity, professionalism, formatting, and ATS readability.",
    "Use concise, recruiter-friendly phrasing and polished bullet wording where helpful.",
    "Avoid repeating the same email, phone number, or location in multiple places.",
    "If information is missing, leave the string empty or the array empty instead of guessing.",
    "Provide a lightweight ATS feedback score and concise suggestions without inventing missing information.",
    canadaSpecificInstruction,
    "Return only the structured response defined by the schema."
  ]
    .filter(Boolean)
    .join(" ");
}

function buildUserPrompt({
  structuredCv,
  rawText,
  countryRules,
  outputLanguage
}: ConvertWithOpenAIInput): string {
  // Future prompt construction can combine this with job-specific requirements.
  return [
    `Requested output language: ${getOutputLanguageLabel(outputLanguage)}`,
    "",
    "Target country rules:",
    JSON.stringify(countryRules, null, 2),
    "",
    "Heuristically mapped CV data:",
    JSON.stringify(structuredCv, null, 2),
    "",
    "Raw extracted CV text:",
    rawText,
    "",
    "Output instructions:",
    "- name: best cleaned candidate name.",
    "- headline: concise target role or professional headline, not a stacked keyword list.",
    "- contact: preserve only truthful contact information.",
    "- summary: 2 to 4 polished sentences aligned to the target market.",
    "- experience: return an array of structured job objects.",
    "- each experience object must contain title, company, location, startDate, endDate, and bullets.",
    "- each job must contain 3-6 bullet points. Do not return paragraphs.",
    "- every bullet must start with an action verb, stay concise, and fit within 1-2 lines max.",
    "- use consistent date formatting and use Present for ongoing roles when appropriate.",
    "- education: concise, factual education entries with consistent date formatting where dates are present.",
    "- skills: relevant skill keywords grounded in the source CV.",
    `- write every heading, sentence, bullet, and label in ${getOutputLanguageLabel(outputLanguage)} only.`,
    "- keep the final CV ATS-friendly and professionally readable in the requested language.",
    "- do not repeat contact information in the headline, summary, or section content.",
    "- atsScore: provide a numeric score from 0 to 100 for ATS friendliness.",
    "- atsStrengths: list 2 to 3 concise strengths.",
    "- atsWeaknesses: list 2 to 3 concise weaknesses.",
    "- atsFeedback: list 2 to 3 short, actionable suggestions.",
    "- keep ATS feedback realistic, concise, and grounded in the source CV.",
    "- extraSections: only include truthful sections such as Projects, Certifications, or Languages when supported by the source text."
  ].join("\n");
}

function isRefusalContent(
  value: unknown
): value is { type: "refusal"; refusal: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    "refusal" in value &&
    value.type === "refusal" &&
    typeof value.refusal === "string"
  );
}

function hasContentArray(value: unknown): value is { content: unknown[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "content" in value &&
    Array.isArray(value.content)
  );
}

function extractRefusalReason(response: {
  output: unknown[];
}): string | null {
  const refusal = response.output
    .filter(hasContentArray)
    .flatMap((item) => item.content)
    .find(isRefusalContent);

  return refusal?.refusal?.trim() || null;
}

async function requestStructuredConversion(
  input: ConvertWithOpenAIInput
): Promise<ConvertWithOpenAIResult> {
  const client = getOpenAIClient();

  try {
    const response = await client.responses.parse({
      model: OPENAI_CV_MODEL,
      instructions: buildSystemPrompt(
        input.targetCountry,
        input.outputLanguage,
        input.countryRules
      ),
      input: buildUserPrompt(input),
      text: {
        format: zodTextFormat(convertedCvSchema, convertedCvSchemaName, {
          description: "Country-adapted CV content for CVConverterPro."
        })
      }
    });

    if (response.output_parsed) {
      return {
        convertedCv: normalizeConvertedCv({
          convertedCv: response.output_parsed,
          structuredCv: input.structuredCv,
          targetCountry: input.targetCountry
        }),
        model: OPENAI_CV_MODEL,
        structuredOutputSchema: convertedCvSchemaName
      };
    }

    const refusalReason = extractRefusalReason(response);

    if (refusalReason) {
      throw new AiConversionError(
        "STRUCTURED_OUTPUT_REFUSAL",
        "The AI conversion service could not convert this CV safely. Please try a clearer or more standard resume format.",
        new Error(refusalReason)
      );
    }

    throw new AiConversionError(
      "INVALID_STRUCTURED_OUTPUT",
      "We could not validate a reliable AI conversion response. Please try again."
    );
  } catch (error) {
    if (error instanceof AiConversionError) {
      throw error;
    }

    throw new AiConversionError(
      "REQUEST_FAILED",
      "We could not complete the AI conversion right now. Please try again.",
      error
    );
  }
}

export async function convertCvWithOpenAI(
  input: ConvertWithOpenAIInput
): Promise<ConvertWithOpenAIResult> {
  return requestStructuredConversion(input);
}
