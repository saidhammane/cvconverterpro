"use client";

import { useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";

import type { ConvertApiSuccess } from "@/lib/convert";
import { ConvertedCvPdfDocument } from "@/components/converted-cv-pdf-document";
import { BeforeAfterComparison } from "@/components/before-after-comparison";

interface ConvertedCvResultProps {
  result: ConvertApiSuccess;
}

export function ConvertedCvResult({ result }: ConvertedCvResultProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const convertedCv = result.convertedCv;
  const normalizedEmail = email.trim();
  const isValidEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail), [normalizedEmail]);
  const atsScore = convertedCv.atsScore ?? 0;

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
          convertedCv={convertedCv}
          countryLabel={result.countryLabel}
          outputLanguageLabel={result.outputLanguageLabel}
          watermarkText="Converted by CVConverterPro"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cvconverterpro-${result.country.toLowerCase()}-${result.outputLanguage.toLowerCase()}.pdf`;
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
          {result.countryLabel} - {result.outputLanguageLabel}
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

      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">ATS Feedback</h3>
            <p className="mt-1 text-sm text-slate-600">
              Lightweight ATS-style feedback to highlight what is strong and what to improve.
            </p>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Score: {atsScore}/100
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
            <p className="text-sm font-semibold text-emerald-800">Strengths</p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900">
              {convertedCv.atsStrengths.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p className="text-sm font-semibold text-amber-800">Weaknesses</p>
            <ul className="mt-3 space-y-2 text-sm text-amber-900">
              {convertedCv.atsWeaknesses.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-2 w-2 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-slate-900">Suggestions</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {convertedCv.atsFeedback.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[5px] h-2 w-2 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BeforeAfterComparison
        extractedTextPreview={result.extractedTextPreview}
        convertedCv={convertedCv}
        countryLabel={result.countryLabel}
        outputLanguageLabel={result.outputLanguageLabel}
      />
    </section>
  );
}
