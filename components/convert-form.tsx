"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ConvertedCvResult } from "@/components/converted-cv-result";
import {
  MAX_FILE_SIZE_MB,
  countryOptions,
  outputLanguageOptions,
  type ConvertApiError,
  type ConvertApiResponse,
  type ConvertApiSuccess,
  type CountryValue,
  type OutputLanguageValue,
  validateResumeFile
} from "@/lib/convert";

type SubmissionState = "idle" | "loading" | "success" | "error";

interface SelectionOption {
  value: string;
  label: string;
  description: string;
  badge: string;
}

const countryOptionMeta: Record<CountryValue, Omit<SelectionOption, "value" | "label">> = {
  canada: {
    badge: "CA",
    description: "Clean, impact-focused resume style"
  },
  germany: {
    badge: "DE",
    description: "Structured and detail-conscious format"
  },
  australia: {
    badge: "AU",
    description: "Direct, achievement-led presentation"
  },
  usa: {
    badge: "US",
    description: "ATS-friendly professional resume layout"
  },
  uk: {
    badge: "UK",
    description: "Concise CV structure for UK applications"
  },
  france: {
    badge: "FR",
    description: "Country-aware CV format for French employers"
  }
};

const outputLanguageMeta: Record<
  OutputLanguageValue,
  Omit<SelectionOption, "value" | "label">
> = {
  english: {
    badge: "EN",
    description: "Natural professional English throughout"
  },
  french: {
    badge: "FR",
    description: "Natural professional French throughout"
  }
};

async function readApiResponse(response: Response): Promise<ConvertApiResponse | null> {
  try {
    return (await response.json()) as ConvertApiResponse;
  } catch {
    return null;
  }
}

function formatFileSize(fileSize: number): string {
  return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
}

function getSelectedLabel(
  value: string,
  options: ReadonlyArray<{ value: string; label: string }>
): string {
  return options.find((option) => option.value === value)?.label ?? "";
}

function SelectionList({
  label,
  helper,
  value,
  options,
  onSelect,
  gridClassName
}: {
  label: string;
  helper: string;
  value: string;
  options: SelectionOption[];
  onSelect: (value: string) => void;
  gridClassName: string;
}) {
  return (
    <fieldset>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <legend className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
            {label}
          </legend>
          <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>
        </div>
      </div>

      <div className={`mt-5 grid gap-3 ${gridClassName}`}>
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isSelected}
              className={`group relative overflow-hidden rounded-[1.6rem] border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-slate-950 bg-slate-950 text-white shadow-[0_20px_50px_-28px_rgba(8,17,31,0.8)]"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-[0_18px_45px_-34px_rgba(8,17,31,0.3)]"
              }`}
            >
              {isSelected ? (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,209,165,0.18),transparent_32%)]" />
              ) : null}

              <div className="relative flex items-start justify-between gap-3">
                <div
                  className={`inline-flex h-11 min-w-11 items-center justify-center rounded-2xl px-3 text-sm font-semibold ${
                    isSelected
                      ? "bg-white/10 text-emerald-200"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {option.badge}
                </div>
                <span
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full border ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-300"
                      : "border-slate-300 bg-transparent group-hover:border-emerald-400"
                  }`}
                />
              </div>

              <div className="relative mt-4">
                <p
                  className={`font-display text-lg font-semibold tracking-tight ${
                    isSelected ? "text-white" : "text-slate-950"
                  }`}
                >
                  {option.label}
                </p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isSelected ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ConvertForm() {
  const [country, setCountry] = useState<CountryValue | "">("");
  const [outputLanguage, setOutputLanguage] = useState<OutputLanguageValue | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [apiResult, setApiResult] = useState<ConvertApiSuccess | null>(null);
  const [apiError, setApiError] = useState<ConvertApiError | null>(null);
  const requestAbortRef = useRef<AbortController | null>(null);

  const isSubmitDisabled =
    country === "" ||
    outputLanguage === "" ||
    selectedFile === null ||
    fileErrors.length > 0 ||
    submissionState === "loading";

  const countrySelectionOptions: SelectionOption[] = countryOptions.map((option) => ({
    value: option.value,
    label: option.label,
    badge: countryOptionMeta[option.value].badge,
    description: countryOptionMeta[option.value].description
  }));

  const outputLanguageSelectionOptions: SelectionOption[] = outputLanguageOptions.map(
    (option) => ({
      value: option.value,
      label: option.label,
      badge: outputLanguageMeta[option.value].badge,
      description: outputLanguageMeta[option.value].description
    })
  );

  useEffect(() => {
    return () => {
      if (requestAbortRef.current) {
        requestAbortRef.current.abort();
      }
    };
  }, []);

  const clearActiveRequest = () => {
    if (requestAbortRef.current) {
      requestAbortRef.current.abort();
      requestAbortRef.current = null;
    }
  };

  const resetSubmissionState = () => {
    clearActiveRequest();
    setSubmissionState("idle");
    setApiResult(null);
    setApiError(null);
  };

  const handleCountrySelect = (value: string) => {
    resetSubmissionState();
    setCountry(value as CountryValue);
  };

  const handleOutputLanguageSelect = (value: string) => {
    resetSubmissionState();
    setOutputLanguage(value as OutputLanguageValue);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetSubmissionState();

    const file = event.target.files?.[0] ?? null;
    const nextErrors = validateResumeFile(file);

    setSelectedFile(file);
    setFileErrors(nextErrors);
    event.target.value = "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateResumeFile(selectedFile);
    setFileErrors(nextErrors);

    const isCountryMissing = country === "";
    const isOutputLanguageMissing = outputLanguage === "";

    if (isCountryMissing || isOutputLanguageMissing) {
      const message =
        isCountryMissing && isOutputLanguageMissing
          ? "Please choose a target country and output language before submitting."
          : isCountryMissing
            ? "Please choose a target country before submitting."
            : "Please choose an output language before submitting.";

      setSubmissionState("error");
      setApiResult(null);
      setApiError({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message
        }
      });
      return;
    }

    if (selectedFile === null || nextErrors.length > 0) {
      return;
    }

    clearActiveRequest();
    setSubmissionState("loading");
    setApiResult(null);
    setApiError(null);

    const formData = new FormData();
    formData.append("country", country);
    formData.append("outputLanguage", outputLanguage);
    formData.append("file", selectedFile);

    const abortController = new AbortController();
    requestAbortRef.current = abortController;

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
        signal: abortController.signal
      });
      const payload = await readApiResponse(response);

      if (!response.ok) {
        setSubmissionState("error");
        setApiResult(null);
        setApiError(
          payload && !payload.success
            ? payload
            : {
                success: false,
                error: {
                  code: "SERVER_ERROR",
                  message:
                    "The server could not prepare the conversion flow. Please try again."
                }
              }
        );
        return;
      }

      if (!payload || !payload.success) {
        setSubmissionState("error");
        setApiResult(null);
        setApiError({
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: "The server returned an unexpected response."
          }
        });
        return;
      }

      setSubmissionState("success");
      setApiError(null);
      setApiResult(payload);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setSubmissionState("error");
      setApiResult(null);
      setApiError({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message:
            "We could not reach the conversion service right now. Please try again in a moment."
        }
      });
    } finally {
      if (requestAbortRef.current === abortController) {
        requestAbortRef.current = null;
      }
    }
  };

  const selectedCountryLabel = getSelectedLabel(country, countryOptions);
  const selectedOutputLanguageLabel = getSelectedLabel(
    outputLanguage,
    outputLanguageOptions
  );

  return (
    <div className="rounded-[2.3rem] border border-white/80 bg-[linear-gradient(135deg,rgba(79,209,165,0.12),rgba(255,255,255,0.96),rgba(125,211,252,0.1))] p-[1px] shadow-[0_26px_70px_-38px_rgba(8,17,31,0.35)]">
      <div className="rounded-[2.25rem] bg-white/92 p-6 backdrop-blur-xl sm:p-8">
        <div className="rounded-[1.9rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(79,209,165,0.08),rgba(255,255,255,0.96),rgba(125,211,252,0.08))] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Conversion setup
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Build your converted resume
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Choose the target market, choose the final language, then upload the CV you
                want to rewrite.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["AI conversion", "ATS-friendly output", "PDF export"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Target country
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {selectedCountryLabel || "Not selected yet"}
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Output language
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-950">
                {selectedOutputLanguageLabel || "Not selected yet"}
              </p>
            </div>
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-8">
          <SelectionList
            label="Target country"
            helper="Pick the destination market you want the final resume to fit."
            value={country}
            options={countrySelectionOptions}
            onSelect={handleCountrySelect}
            gridClassName="sm:grid-cols-2 xl:grid-cols-3"
          />

          <SelectionList
            label="Output language"
            helper="Choose the language the final converted CV should be written in."
            value={outputLanguage}
            options={outputLanguageSelectionOptions}
            onSelect={handleOutputLanguageSelect}
            gridClassName="sm:grid-cols-2"
          />

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label
                  htmlFor="resume-file"
                  className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700"
                >
                  Upload your CV
                </label>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add the source resume you want to clean up and convert.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["PDF", "DOCX", `Max ${MAX_FILE_SIZE_MB}MB`].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <label
              htmlFor="resume-file"
              className="mt-5 flex cursor-pointer flex-col rounded-[1.8rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,rgba(79,209,165,0.08),rgba(255,255,255,0.96),rgba(125,211,252,0.08))] px-5 py-6 transition hover:border-emerald-400 hover:bg-white"
            >
              <span className="font-display text-xl font-semibold tracking-tight text-slate-950">
                {selectedFile ? "Choose a different file" : "Select a PDF or DOCX file"}
              </span>
              <span className="mt-2 max-w-lg text-sm leading-7 text-slate-600">
                Upload the resume you want to convert. We will validate the file, extract
                the text, and prepare it for country-aware AI rewriting.
              </span>
            </label>

            <input
              id="resume-file"
              name="resume-file"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="sr-only"
            />

            {selectedFile ? (
              <div className="mt-4 rounded-[1.6rem] border border-slate-200 bg-slate-950 px-5 py-4 text-white shadow-[0_20px_50px_-30px_rgba(8,17,31,0.75)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Selected file
                </p>
                <p className="mt-2 break-all text-sm font-semibold">{selectedFile.name}</p>
                <p className="mt-2 text-xs text-slate-300">{formatFileSize(selectedFile.size)}</p>
              </div>
            ) : null}

            {fileErrors.length > 0 ? (
              <div
                className="mt-4 rounded-[1.6rem] border border-rose-200 bg-rose-50 px-4 py-4"
                aria-live="polite"
              >
                {fileErrors.map((error) => (
                  <p key={error} className="text-sm text-rose-700">
                    {error}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_-28px_rgba(8,17,31,0.8)] hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
            >
              {submissionState === "loading" ? "Converting your CV..." : "Convert my CV"}
            </button>

            <div className="flex flex-wrap gap-2">
              {[
                "Country-aware formatting",
                "Structured experience bullets",
                "Preview + PDF export"
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {submissionState === "loading" ? (
            <div
              className="rounded-[1.6rem] border border-sky-200 bg-sky-50 px-4 py-4"
              aria-live="polite"
            >
              <p className="text-sm text-sky-800">Converting your CV...</p>
            </div>
          ) : null}

          {submissionState === "success" && apiResult ? (
            <ConvertedCvResult result={apiResult} />
          ) : null}

          {submissionState === "error" && apiError ? (
            <div
              className="rounded-[1.6rem] border border-rose-200 bg-rose-50 px-4 py-4"
              aria-live="polite"
            >
              <p className="text-sm font-medium text-rose-800">{apiError.error.message}</p>
              {apiError.error.details && apiError.error.details.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {apiError.error.details.map((detail) => (
                    <p key={detail} className="text-sm text-rose-700">
                      {detail}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </form>

        <p className="mt-6 text-sm leading-6 text-slate-500">
          Your file is processed only for conversion purposes.
        </p>
      </div>
    </div>
  );
}
