import Link from "next/link";
import type { Metadata } from "next";
import { HomeSectionHeading } from "@/components/home-section-heading";

const countryCards = [
  {
    name: "Canada",
    href: "/canadian-resume-converter",
    description:
      "Canadian resumes usually need to be concise, ATS-friendly, and focused on relevant achievements rather than long general career history.",
    highlights: [
      "Usually no photo",
      "English or French can matter",
      "Strong ATS-friendly focus",
      "Concise one- to two-page resume"
    ]
  },
  {
    name: "Germany",
    href: "/german-cv-format",
    description:
      "German CVs usually reward structure, consistency, and a more formal professional presentation than many international resume styles.",
    highlights: [
      "More formal structure",
      "Photo may still appear",
      "Clear chronology matters",
      "Precision builds trust"
    ]
  },
  {
    name: "USA",
    href: "/us-resume-converter",
    description:
      "US resumes usually perform better when they are concise, achievement-driven, and easy to scan quickly in an ATS-heavy hiring environment.",
    highlights: [
      "Usually no photo",
      "Strong ATS relevance",
      "Achievement-focused bullets",
      "Resume, not long CV"
    ]
  },
  {
    name: "UK",
    href: "/uk-cv-format",
    description:
      "UK CVs often work best when they open with a clear personal profile and keep the structure focused, professional, and easy to skim.",
    highlights: [
      "Personal profile matters",
      "Usually no photo",
      "Clear tone and structure",
      "Often around two pages"
    ]
  },
  {
    name: "Australia",
    href: "/australian-resume-format",
    description:
      "Australian resumes often feel more practical and job-relevant, with strong emphasis on credible results and local market fit.",
    highlights: [
      "Practical tone",
      "Results-focused writing",
      "Localized relevance matters",
      "Readable with enough detail"
    ]
  },
  {
    name: "France",
    href: "/french-cv-format",
    description:
      "French CVs often require stronger localization, more formal presentation, and in many cases a version that feels natural in French.",
    highlights: [
      "More formal presentation",
      "Photo may be used",
      "French-language relevance matters",
      "Localization affects credibility"
    ]
  }
] as const;

const helpPoints = [
  {
    title: "One CV does not fit every market",
    description:
      "What looks normal in one country can feel too long, too informal, too generic, or poorly localized in another."
  },
  {
    title: "Localization changes trust",
    description:
      "Recruiters read formatting, tone, and structure as signals. A market-aligned resume often feels stronger before anyone evaluates your experience in depth."
  },
  {
    title: "CVConverterPro reduces rewrite work",
    description:
      "Instead of rebuilding your resume manually for every target country, you can generate a cleaner starting point that fits the market better."
  }
] as const;

export const metadata: Metadata = {
  title: "Resume Formats by Country | International CV Format Guides | CVConverterPro",
  description:
    "Browse resume and CV formats by country, compare hiring expectations, and choose the right format for Canada, Germany, the USA, the UK, Australia, and France.",
  alternates: {
    canonical: "/resume-formats-by-country"
  },
  openGraph: {
    title: "Resume Formats by Country | International CV Format Guides | CVConverterPro",
    description:
      "Compare country-specific resume rules and explore CV format guides for major international job markets.",
    url: "/resume-formats-by-country",
    siteName: "CVConverterPro",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Formats by Country | International CV Format Guides | CVConverterPro",
    description: "Compare country-specific resume rules for Canada, Germany, the USA, the UK, Australia, and France."
  }
};

export default function ResumeFormatsByCountryPage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.94))]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-10 lg:pb-28 lg:pt-18">
          <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Resume formats by country
          </span>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Compare international resume formats before you apply
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Resume and CV expectations change by country. This hub helps you compare supported markets, understand the main differences, and choose a format that fits where you are applying.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Instead of sending the same document everywhere, use the right format for Canada, Germany, the USA, the UK, Australia, or France.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#country-guides"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-24px_rgba(52,211,153,0.6)] hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              Browse country guides
            </Link>
            <Link
              href="/convert"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
            >
              Start converting
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10" id="why-rules-change">
        <HomeSectionHeading
          eyebrow="Why resume rules change"
          title="Why one resume format does not work everywhere"
          description="Hiring markets evaluate tone, structure, length, and presentation differently. If your resume feels misaligned for the target country, it can weaken the application before your experience gets proper attention."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {helpPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)]"
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-8" id="country-guides">
        <HomeSectionHeading
          eyebrow="Supported countries"
          title="Explore the 6 country-specific resume guides"
          description="Each guide explains what usually changes in that market and links directly into a more detailed country page."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {countryCards.map((country) => (
            <article
              key={country.href}
              className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)]"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{country.name}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{country.description}</p>
              </div>
              <ul className="mt-6 space-y-3">
                {country.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={country.href}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  View {country.name} guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#ffffff_45%,#ecfeff)] px-6 py-10 shadow-[0_24px_60px_-36px_rgba(8,17,31,0.25)] lg:px-10">
          <HomeSectionHeading
            eyebrow="How to choose the right format"
            title="Pick the format based on where you are applying, not where you wrote your last CV"
            description="If you are targeting one market, start with that country guide. If you are applying across multiple countries, compare the pages first so your resume does not feel accidentally misaligned."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5">
              <p className="text-sm font-semibold text-slate-900">Target the actual market</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Choose the country where the employer is hiring, not the country where your old CV was created.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5">
              <p className="text-sm font-semibold text-slate-900">Match tone and structure</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Length, summary style, chronology, photos, and language relevance can all affect how credible the document feels.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5">
              <p className="text-sm font-semibold text-slate-900">Use CVConverterPro as the shortcut</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                The product gives you a faster, cleaner starting point instead of forcing a full manual rewrite every time you target a new country.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="rounded-[2.8rem] border border-slate-200 bg-[linear-gradient(135deg,#ebfff6,#ffffff_50%,#f0f9ff)] px-6 py-10 text-center shadow-[0_28px_70px_-38px_rgba(8,17,31,0.32)] sm:px-10 lg:px-14 lg:py-14">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Final CTA</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Convert your CV for the right country format
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Upload your current CV, choose the market you are targeting, and generate a cleaner, more locally aligned resume for real applications.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/convert"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(8,17,31,0.85)] hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start converting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
