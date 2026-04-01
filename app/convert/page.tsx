import type { Metadata } from "next";
import { ConvertForm } from "@/components/convert-form";
import { countryOptions } from "@/lib/convert";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  "Convert Your CV",
  "Upload your resume or CV, choose a target country, and convert it into a country-ready draft for Canada, Germany, Australia, the USA, the UK, and France.",
  "/convert"
);

export default function ConvertPage() {
  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Conversion workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Convert your CV
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Upload a PDF or DOCX resume, choose your target country, and generate a
            cleaner country-ready CV draft built for the format you need.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-start">
          <ConvertForm />

          <aside className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Supported formats
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Start with country-ready resume targets
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The backend now validates uploads, extracts resume text, maps likely CV
              sections, and generates an OpenAI-powered draft tailored to the selected
              country format.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {countryOptions.map((country) => (
                <span
                  key={country.value}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {country.label}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-950">What is ready now</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Client-side validation, API submission, backend input checks, text
                extraction, heuristic section mapping, and AI-assisted draft conversion for
                supported countries.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-950">
              Country-specific formatting rules
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Built to guide each resume toward the local expectations of the destination
              market.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-950">ATS-friendly output</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The conversion experience is being shaped around clean, screening-friendly
              resume structure.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-950">PDF and DOCX support</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The flow is prepared for the two most common resume formats candidates already use.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
