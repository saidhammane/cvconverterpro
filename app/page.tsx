import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, howItWorksSteps, siteConfig, supportedCountries } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  siteConfig.name,
  "Convert your CV for any country with clean, country-aware resume formatting for Canada, Germany, Australia, the USA, the UK, and France.",
  "/"
);

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-16 pt-12 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              Free SaaS landing page starter
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Convert your CV for any country
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              CVConverterPro helps job seekers adapt their resumes to the expectations of
              different countries so they can apply with more confidence and less manual
              reformatting.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/convert"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-slate-800"
              >
                Start converting
              </Link>
              <Link
                href="#supported-countries"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
              >
                View supported countries
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Preview workflow</p>
                  <p className="mt-1 text-xl font-semibold text-slate-950">Country-ready CV</p>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Initial setup
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                      0{index + 1}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-950">{step.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="supported-countries" className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Supported countries
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Start with the most requested resume markets
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The first release is designed around six high-demand destinations, each with
              different formatting expectations and hiring norms.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportedCountries.map((country) => (
              <div
                key={country}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base font-medium text-slate-700"
              >
                {country}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            A simple path from upload to a country-ready resume
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Step {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
