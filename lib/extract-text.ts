import "server-only";

import mammoth from "mammoth";
import {
  detectMimeType,
  type ExtractionStatus,
  type FileLike
} from "@/lib/convert";

const EXTRACTION_PREVIEW_LENGTH = 400;

type ExtractableFileFormat = "pdf" | "docx";

export interface ExtractTextInput {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface ExtractTextResult {
  format: ExtractableFileFormat;
  mimeType: string;
  text: string;
  preview: string;
  characterCount: number;
  status: ExtractionStatus;
}

export class TextExtractionError extends Error {
  code: "UNSUPPORTED_FILE_TYPE" | "EXTRACTION_FAILED" | "EMPTY_TEXT";
  publicMessage: string;

  constructor(
    code: "UNSUPPORTED_FILE_TYPE" | "EXTRACTION_FAILED" | "EMPTY_TEXT",
    publicMessage: string,
    cause?: unknown
  ) {
    super(publicMessage, cause ? { cause } : undefined);
    this.name = "TextExtractionError";
    this.code = code;
    this.publicMessage = publicMessage;
  }
}

function normalizeExtractedText(text: string): string {
  return text
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

function buildPreview(text: string): string {
  if (text.length <= EXTRACTION_PREVIEW_LENGTH) {
    return text;
  }

  return `${text.slice(0, EXTRACTION_PREVIEW_LENGTH).trimEnd()}...`;
}

function detectExtractableFormat(file: Pick<FileLike, "name" | "type">): ExtractableFileFormat {
  const normalizedMimeType = detectMimeType({
    name: file.name,
    type: file.type,
    size: 0
  });
  const normalizedName = file.name.toLowerCase();

  if (normalizedMimeType === "application/pdf" || normalizedName.endsWith(".pdf")) {
    return "pdf";
  }

  if (
    normalizedMimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    normalizedName.endsWith(".docx")
  ) {
    return "docx";
  }

  throw new TextExtractionError(
    "UNSUPPORTED_FILE_TYPE",
    "This file type is not supported for text extraction."
  );
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    throw new TextExtractionError(
      "EXTRACTION_FAILED",
      "We could not read text from that PDF. Please try another file.",
      error
    );
  } finally {
    await parser.destroy();
  }
}

async function extractDocxText(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new TextExtractionError(
      "EXTRACTION_FAILED",
      "We could not read text from that DOCX file. Please try another file.",
      error
    );
  }
}

export async function extractTextFromResume(input: ExtractTextInput): Promise<ExtractTextResult> {
  const format = detectExtractableFormat({
    name: input.fileName,
    type: input.mimeType
  });

  const rawText =
    format === "pdf"
      ? await extractPdfText(input.buffer)
      : await extractDocxText(input.buffer);
  const normalizedText = normalizeExtractedText(rawText);

  if (normalizedText.length === 0) {
    throw new TextExtractionError(
      "EMPTY_TEXT",
      "We could not extract readable text from that file. Please try a clearer PDF or DOCX."
    );
  }

  return {
    format,
    mimeType: detectMimeType({
      name: input.fileName,
      type: input.mimeType,
      size: input.buffer.length
    }),
    text: normalizedText,
    preview: buildPreview(normalizedText),
    characterCount: normalizedText.length,
    status: "completed"
  };
}
