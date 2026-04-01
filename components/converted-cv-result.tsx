"use client";

import { useState } from "react";
import { ConvertedCvPreview } from "@/components/converted-cv-preview";
import type { ConvertApiSuccess, CountryValue } from "@/lib/convert";

function formatExtraSectionsPreview(extraSections: ConvertApiSuccess["convertedCv"]["extraSections"]): string {
  const titles = extraSections.slice(0, 3).map((section) => section.title);

  if (titles.length === 0) {
    return "No extra sections were added in this draft.";
  }

  return titles.join(", ");
}

function sanitizeFilenamePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function buildPdfFileName(country: CountryValue, candidateName: string): string {
  const countryPart = sanitizeFilenamePart(country) || "country";
  const namePart = sanitizeFilenamePart(candidateName);

  return namePart.length > 0
    ? `cvconverterpro-${countryPart}-${namePart}-converted-cv.pdf`
    : `cvconverterpro-${countryPart}-converted-cv.pdf`;
}

interface ConvertedCvResultProps {
  result: ConvertApiSuccess;
}

export function ConvertedCvResult({ result }: ConvertedCvResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const structuredCv = result.structuredCv;
  const convertedCv = result.convertedCv;
  const detectedSectionsPreview = structuredCv.detectedSections.slice(0, 6);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const [{ pdf }, { ConvertedCvPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/converted-cv-pdf-document")
      ]);

      const blob = await pdf(
        <ConvertedCvPdfDocument
          convertedCv={convertedCv}
          countryLabel={result.countryLabel}
        />
      ).toBlob();

      if (blob.size === 0) {
        throw new Error("Generated PDF blob was empty.");
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = buildPdfFileName(result.country, convertedCv.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("PDF export error:", error);
      setDownloadError("We could not generate the PDF right now. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-emerald-800">{result.message}</p>

      <div className="mt-3 grid gap-3 text-sm text-emerald-900 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="font-semibold">Target country</p>
          <p className="mt-1">{result.countryLabel}</p>
        </div>
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="font-semibold">Conversion status</p>
          <p className="mt-1">{result.conversionStatus}</p>
        </div>
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="font-semibold">Extraction status</p>
          <p className="mt-1">{result.extractionStatus}</p>
        </div>
        <div className="rounded-2xl bg-white/70 px-4 py-3">
          <p className="font-semibold">Extracted characters</p>
          <p className="mt-1">{result.extractedCharacterCount}</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white/70 px-4 py-4 text-sm text-emerald-950">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Converted CV preview</p>
            <p className="mt-1 text-sm text-emerald-800">
              Cleaned for rendering and export with deduplicated contact details and normalized text.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {isDownloading ? "Preparing PDF..." : "Download PDF"}
          </button>
        </div>
        <div className="mt-4">
          <ConvertedCvPreview convertedCv={convertedCv} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
            <p className="font-semibold">Header cleanup</p>
            <p className="mt-1 text-emerald-900">
              {convertedCv.contactLineItems.length > 0
                ? `${convertedCv.contactLineItems.length} unique contact items`
                : "No contact line items were available."}
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
            <p className="font-semibold">Section depth</p>
            <p className="mt-1 text-emerald-900">
              Experience: {convertedCv.experience.length} | Education: {convertedCv.education.length}
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
            <p className="font-semibold">Extra sections</p>
            <p className="mt-1 text-emerald-900">
              {formatExtraSectionsPreview(convertedCv.extraSections)}
            </p>
          </div>
        </div>

        {downloadError ? (
          <p className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {downloadError}
          </p>
        ) : null}
      </div>

      <div className="mt-3 rounded-2xl bg-white/70 px-4 py-3 text-sm text-emerald-900">
        <p className="font-semibold">Structured source signals</p>
        <p className="mt-1">
          Name: {structuredCv.fullName ? "found" : "not found"} | Email:{" "}
          {structuredCv.email ? "found" : "not found"} | Phone:{" "}
          {structuredCv.phone ? "found" : "not found"}
        </p>
        <p className="mt-1">
          Detected sections:{" "}
          {detectedSectionsPreview.length > 0
            ? detectedSectionsPreview.join(", ")
            : "No clear sections were confidently identified yet."}
        </p>
      </div>
    </div>
  );
}
