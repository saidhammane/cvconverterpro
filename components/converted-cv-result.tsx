"use client";

import { useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";

import type { ConversionResult } from "@/lib/cv-converter/types";
import { ConvertedCvPdfDocument } from "@/components/converted-cv-pdf-document";
import { ConvertedCvPreview } from "@/components/converted-cv-preview";

interface ConvertedCvResultProps {
  result: ConversionResult;
}

export function ConvertedCvResult({ result }: ConvertedCvResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const structuredCv = result.structuredCv;
  const normalizedEmail = email.trim();
  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail), [normalizedEmail]);

  const handleDownloadPdf = async () => {
    if (!isValidEmail) {
      setDownloadError("Please enter a valid email before downloading.");
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadError(null);

      const blob = await pdf(
        <ConvertedCvPdfDocument
          convertedCv={structuredCv.convertedCv}
          countryLabel={result.countryLabel}
          outputLanguageLabel={result.outputLanguageLabel}
          watermarkText="Converted by CVConverterPro"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cvconverterpro-${structuredCv.targetCountry.toLowerCase()}-${structuredCv.outputLanguage.toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      setDownloadError("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Converted CV ready
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Review the optimized version below, then enter your email to download the free watermarked PDF.
          </p>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          {result.countryLabel} · {result.outputLanguageLabel}
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-2">
          <label htmlFor="download-email" className="block text-sm font-medium text-slate-700">
            Enter your email before downloading
          </label>
          <input
            id="download-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (downloadError) setDownloadError(null);
            }}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-400"
          />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>{isValidEmail ? "Valid email" : "Email required to unlock PDF download"}</span>
            <span>Free PDF includes watermark: Converted by CVConverterPro</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isDownloading || !isValidEmail}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isDownloading ? "Preparing PDF..." : "Download PDF"}
        </button>
      </div>

      {downloadError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {downloadError}
        </div>
      ) : null}

      <ConvertedCvPreview
        convertedCv={structuredCv.convertedCv}
        countryLabel={result.countryLabel}
        outputLanguageLabel={result.outputLanguageLabel}
      />
    </section>
  );
}
