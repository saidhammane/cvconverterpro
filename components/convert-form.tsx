"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  MAX_FILE_SIZE_MB,
  countryOptions,
  type ConvertApiError,
  type ConvertApiResponse,
  type ConvertApiSuccess,
  type CountryValue,
  validateResumeFile
} from "@/lib/convert";

type SubmissionState = "idle" | "loading" | "success" | "error";

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

export function ConvertForm() {
  const [country, setCountry] = useState<CountryValue | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [apiResult, setApiResult] = useState<ConvertApiSuccess | null>(null);
  const [apiError, setApiError] = useState<ConvertApiError | null>(null);
  const requestAbortRef = useRef<AbortController | null>(null);
  const structuredCv = apiResult?.structuredCv ?? null;
  const detectedSectionsPreview = structuredCv?.detectedSections.slice(0, 6) ?? [];

  const isSubmitDisabled =
    country === "" ||
    selectedFile === null ||
    fileErrors.length > 0 ||
    submissionState === "loading";

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

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    resetSubmissionState();
    setCountry(event.target.value as CountryValue | "");
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

    if (country === "") {
      setSubmissionState("error");
      setApiResult(null);
      setApiError({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Please choose a target country before submitting."
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

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="target-country"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700"
          >
            Target country
          </label>
          <select
            id="target-country"
            name="target-country"
            value={country}
            onChange={handleCountryChange}
            className="mt-3 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none ring-0 transition focus:border-sky-400 focus:bg-white"
          >
            <option value="">Choose a target country</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="resume-file"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700"
          >
            Upload your CV
          </label>
          <label
            htmlFor="resume-file"
            className="mt-3 flex cursor-pointer flex-col rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-5 py-6 transition hover:border-sky-400 hover:bg-white"
          >
            <span className="text-base font-semibold text-slate-950">
              {selectedFile ? "Choose a different file" : "Select a PDF or DOCX file"}
            </span>
            <span className="mt-2 text-sm leading-6 text-slate-600">
              Accepted formats: PDF, DOCX
            </span>
            <span className="text-sm leading-6 text-slate-600">
              Max size: {MAX_FILE_SIZE_MB}MB
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
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-medium text-slate-500">Selected file</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-950">
                {selectedFile.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          ) : null}

          {fileErrors.length > 0 ? (
            <div
              className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3"
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

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          {submissionState === "loading" ? "Preparing conversion..." : "Convert my CV"}
        </button>

        {submissionState === "loading" ? (
          <div
            className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3"
            aria-live="polite"
          >
            <p className="text-sm text-sky-800">
              Validating, extracting, and structuring your CV for the next conversion step.
            </p>
          </div>
        ) : null}

        {submissionState === "success" && apiResult ? (
          <div
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-emerald-800">{apiResult.message}</p>
            <div className="mt-3 grid gap-3 text-sm text-emerald-900 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="font-semibold">Target country</p>
                <p className="mt-1">{apiResult.countryLabel}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="font-semibold">Conversion status</p>
                <p className="mt-1">{apiResult.conversionStatus}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="font-semibold">Extraction status</p>
                <p className="mt-1">{apiResult.extractionStatus}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">
                <p className="font-semibold">Extracted characters</p>
                <p className="mt-1">{apiResult.extractedCharacterCount}</p>
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3 sm:col-span-2">
                <p className="font-semibold">File ready for next step</p>
                <p className="mt-1 break-all">{apiResult.originalFileName}</p>
              </div>
            </div>
            {structuredCv ? (
              <div className="mt-3 rounded-2xl bg-white/70 px-4 py-3 text-sm text-emerald-900">
                <p className="font-semibold">Structured data ready</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <p className="font-semibold">Mapping status</p>
                    <p className="mt-1">{structuredCv.mappingStatus}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <p className="font-semibold">Identity signals</p>
                    <p className="mt-1">
                      Name: {structuredCv.fullName ? "found" : "not found"} | Email:{" "}
                      {structuredCv.email ? "found" : "not found"} | Phone:{" "}
                      {structuredCv.phone ? "found" : "not found"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <p className="font-semibold">Entry counts</p>
                    <p className="mt-1">
                      Experience: {structuredCv.experience.length} | Education:{" "}
                      {structuredCv.education.length} | Skills: {structuredCv.skills.length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <p className="font-semibold">Detected sections</p>
                    <p className="mt-1">
                      {detectedSectionsPreview.length > 0
                        ? detectedSectionsPreview.join(", ")
                        : "No clear sections were confidently identified yet."}
                    </p>
                  </div>
                </div>
                {structuredCv.mappingWarnings.length > 0 ? (
                  <p className="mt-3 text-sm text-emerald-800">
                    Mapper note: {structuredCv.mappingWarnings[0]}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="mt-3 rounded-2xl bg-white/70 px-4 py-3 text-sm text-emerald-900">
              <p className="font-semibold">Extracted text preview</p>
              <p className="mt-1">{apiResult.extractedTextPreview}</p>
            </div>
            <div className="mt-3 rounded-2xl bg-white/70 px-4 py-3 text-sm text-emerald-900">
              <p className="font-semibold">What happens next</p>
              <p className="mt-1">
                The raw text and mapped CV structure are now ready for prompt building and
                country-specific rewriting in the next backend step.
              </p>
            </div>
          </div>
        ) : null}

        {submissionState === "error" && apiError ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3"
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
  );
}
