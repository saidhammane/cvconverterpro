"use client";

import type { ConvertedCvData } from "@/lib/convert";
import { ConvertedCvPreview } from "@/components/converted-cv-preview";

interface BeforeAfterComparisonProps {
  extractedTextPreview: string;
  convertedCv: ConvertedCvData;
  countryLabel: string;
  outputLanguageLabel: string;
}

const improvements = [
  "Country-specific formatting applied",
  "Structure cleaned and standardized",
  "Experience bullets improved",
  "ATS-friendly readability improved"
];

function cleanExtractedText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

export function BeforeAfterComparison({
  extractedTextPreview,
  convertedCv,
  countryLabel,
  outputLanguageLabel
}: BeforeAfterComparisonProps) {
  const cleanedBefore = truncateText(cleanExtractedText(extractedTextPreview || ""), 900);

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white px-5 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Before vs After</h3>
          <p className="mt-1 text-sm text-slate-600">
            Original CV content cleaned, localized, and rewritten for {countryLabel} in{" "}
            {outputLanguageLabel}.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          What improved
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {improvements.map((item) => (
            <li
              key={item}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Original CV content</p>
          <p className="mt-1 text-xs text-slate-500">Preview of extracted source content</p>
          <div className="mt-4 max-h-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-6 text-slate-700 whitespace-pre-wrap">
            {cleanedBefore || "No extracted content was available to preview."}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-semibold text-slate-900">Converted CV draft</p>
          <p className="mt-1 text-xs text-slate-500">Updated structure and language-ready draft</p>
          <div className="mt-4">
            <ConvertedCvPreview convertedCv={convertedCv} />
          </div>
        </div>
      </div>
    </section>
  );
}
