export const supportedCountryValues = [
  "canada",
  "germany",
  "australia",
  "usa",
  "uk",
  "france"
] as const;

export type CountryValue = (typeof supportedCountryValues)[number];

export const countryLabels: Record<CountryValue, string> = {
  canada: "Canada",
  germany: "Germany",
  australia: "Australia",
  usa: "USA",
  uk: "UK",
  france: "France"
};

export const countryOptions: ReadonlyArray<{ value: CountryValue; label: string }> =
  supportedCountryValues.map((value) => ({
    value,
    label: countryLabels[value]
  }));

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".docx"] as const;

export const ACCEPTED_FILE_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
] as const;

export type AcceptedFileMimeType = (typeof ACCEPTED_FILE_MIME_TYPES)[number];

export interface FileLike {
  name: string;
  size: number;
  type: string;
}

export interface CountryRule {
  label: string;
  documentStyle: {
    preferredDocumentName: string;
    formattingPriorities: string[];
    layoutNotes: string[];
  };
  pageGuidance: {
    idealPageRange: string;
    earlyCareer: string;
    experienced: string;
  };
  photoPolicy: {
    recommendation: string;
    guidance: string;
  };
  requiredOrCommonSections: string[];
  forbiddenOrDiscouragedItems: string[];
  toneGuidance: string[];
  specialNotes: string[];
}

export interface ConvertPreviewSection {
  status: "pending";
  note: string;
  items: string[];
}

export type ConversionStatus =
  | "validated_placeholder"
  | "text_extracted_ready"
  | "cv_mapped_ready";
export type ExtractionStatus = "completed";
export type MappingStatus = "completed" | "partial" | "minimal";

export interface StructuredCvOtherSection {
  title: string;
  entries: string[];
}

export interface StructuredCvData {
  fullName: string | null;
  headline: string | null;
  contact: string[];
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
  experience: string[];
  education: string[];
  skills: string[];
  certifications: string[];
  languages: string[];
  projects: string[];
  otherSections: StructuredCvOtherSection[];
  mappingStatus: MappingStatus;
  detectedSections: string[];
  missingLikelySections: string[];
  mappingWarnings: string[];
}

export interface ConvertResultPreview {
  summary: ConvertPreviewSection;
  experience: ConvertPreviewSection;
  education: ConvertPreviewSection;
  skills: ConvertPreviewSection;
  extraSections: ConvertPreviewSection;
  countryRulesUsed: CountryRule;
}

export interface ConvertApiSuccess {
  success: true;
  country: CountryValue;
  countryLabel: string;
  originalFileName: string;
  detectedMimeType: string;
  maxFileSizeMb: number;
  conversionStatus: ConversionStatus;
  extractionStatus: ExtractionStatus;
  extractedText: string;
  extractedTextPreview: string;
  extractedCharacterCount: number;
  structuredCv: StructuredCvData;
  message: string;
  resultPreview: ConvertResultPreview;
}

export interface ConvertApiError {
  success: false;
  error: {
    code: "VALIDATION_ERROR" | "EXTRACTION_ERROR" | "SERVER_ERROR";
    message: string;
    details?: string[];
  };
}

export type ConvertApiResponse = ConvertApiSuccess | ConvertApiError;

export function isSupportedCountry(value: string): value is CountryValue {
  return supportedCountryValues.some((country) => country === value);
}

export function getCountryLabel(country: CountryValue): string {
  return countryLabels[country];
}

export function detectMimeType(file: FileLike): string {
  const normalizedType = file.type.trim().toLowerCase();

  if (normalizedType.length > 0) {
    return normalizedType;
  }

  const normalizedName = file.name.toLowerCase();

  if (normalizedName.endsWith(".pdf")) {
    return "application/pdf";
  }

  if (normalizedName.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }

  return "application/octet-stream";
}

export function validateResumeFile(file: FileLike | null): string[] {
  if (!file) {
    return [];
  }

  const normalizedName = file.name.toLowerCase();
  const normalizedType = detectMimeType(file);
  const hasAcceptedExtension = ACCEPTED_FILE_EXTENSIONS.some((extension) =>
    normalizedName.endsWith(extension)
  );
  const hasAcceptedMimeType = ACCEPTED_FILE_MIME_TYPES.includes(
    normalizedType as AcceptedFileMimeType
  );
  const errors: string[] = [];

  if (!hasAcceptedExtension && !hasAcceptedMimeType) {
    errors.push("Please upload a PDF or DOCX file.");
  }

  if (file.size <= 0) {
    errors.push("The uploaded file is empty.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.push(`File size must be ${MAX_FILE_SIZE_MB}MB or less.`);
  }

  return errors;
}
