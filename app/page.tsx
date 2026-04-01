import Link from "next/link";
import type { Metadata } from "next";
import { HomeFeatureCard } from "@/components/home-feature-card";
import { HomeHeroPreview } from "@/components/home-hero-preview";
import { HomeSectionHeading } from "@/components/home-section-heading";
import { supportedCountries } from "@/lib/site";

const heroContent = {
  eyebrow: "AI resume conversion for international applications",
  title: "Convert your CV for any country - instantly",
  description:
    "Generate ATS-friendly resumes for Canada, USA, UK, and more with AI-powered conversion, country-aware formatting, and clean PDF export."
} as const;

const trustItems = [
  {
    badge: "01",
    title: "Built for international job seekers",
    description: "Adapt one CV to multiple markets without rebuilding the entire document by hand."
  },
  {
    badge: "02",
    title: "ATS-friendly resumes",
    description: "Keep the final layout simple, clear, and easy to scan for both recruiters and screening systems."
  },
  {
    badge: "03",
    title: "Country-specific formatting",
    description: "Rewrite your resume around local expectations instead of using one generic format everywhere."
  }
] as const;

const steps = [
  {
    number: "01",
    title: "Upload your CV",
    description: "Start with the PDF or DOCX resume you already have."
  },
  {
    number: "02",
    title: "Choose a country",
    description: "Select the target market so the output follows local resume expectations."
  },
  {
    number: "03",
    title: "Download your optimized resume",
    description: "Review the converted result online, then export a cleaner PDF."
  }
] as const;

const features = [
  {
    badge: "A",
    title: "Country-aware formatting",
    description: "Adjust the resume structure for Canadian, American, British, and other market-specific norms.",
    accent: "mint" as const,
    tone: "dark" as const
  },
  {
    badge: "B",
    title: "AI-powered rewriting",
    description: "Improve clarity and professionalism while keeping the source content truthful.",
    accent: "cyan" as const,
    tone: "light" as const
  },
  {
    badge: "C",
    title: "Clean ATS-friendly layout",
    description: "Keep summary, experience, education, and skills easy to scan and easy to parse.",
    accent: "slate" as const,
    tone: "light" as const
  },
  {
    badge: "D",
    title: "PDF export ready",
    description: "Preview the converted CV in the browser and download a polished black-on-white PDF.",
    accent: "mint" as const,
    tone: "dark" as const
  }
] as const;

export const metadata: Metadata = {
  title: "Convert your CV for any country - instantly | CVConverterPro",
  description:
    "Convert CV to Canadian format, USA format, UK format, and more with AI-powered rewriting, ATS-friendly resume optimization, and clean PDF export.",
  keywords: [
    "convert CV to Canadian format",
    "ATS resume optimizer",
    "AI resume converter",
    "convert resume for USA jobs",
    "UK CV converter",
    "international resume formatting"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Convert your CV for any country - instantly | CVConverterPro",
    description:
      "AI-powered CV conversion with ATS-friendly formatting for Canada, USA, UK, Germany, Australia, and France.",
    url: "/",
    siteName: "CVConverterPro",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CVConverterPro landing page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert your CV for any country - instantly | CVConverterPro",
    description: "ATS-friendly, AI-powered CV conversion for international job seekers.",
    images: ["/og-image.svg"]
  }
};

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,209,165,0.18),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(125,211,252,0.16),transparent_24%),linear-gradient(180deg,rgba(7,17,31,0.98),rgba(7,17,31,0.92))]" />
        <div className="absolute inset-y-0 left-[8%] hidden w-px bg-white/6 lg:block" />
        <div className="absolute inset-y-0 right-[10%] hidden w-px bg-white/6 lg:block" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="grid gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                {heroContent.eyebrow}
              </span>

              <h1 className="font-display mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                {heroContent.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {heroContent.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/convert"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-24px_rgba(79,209,165,0.6)] hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Start converting
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
                >
                  How it works
                </Link>
              </div>

              <div id="supported-countries" className="mt-8 flex flex-wrap gap-3">
                {supportedCountries.map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                  >
                    {country}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Formats
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">Canada / USA / UK</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Output
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">ATS-friendly resume</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Engine
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">AI-powered conversion</p>
                </div>
              </div>
            </div>

            <HomeHeroPreview />
          </div>
        </div>
      </section>

      <section className="-mt-10 relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {trustItems.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[1.9rem] border p-6 shadow-[0_22px_60px_-38px_rgba(8,17,31,0.34)] ${
                index === 1
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-white/88 text-slate-900 backdrop-blur"
              }`}
            >
              <div
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-2xl px-3 text-sm font-semibold ${
                  index === 1
                    ? "bg-white/10 text-emerald-200"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {item.badge}
              </div>
              <h2
                className={`font-display mt-5 text-xl font-semibold tracking-tight ${
                  index === 1 ? "text-white" : "text-slate-950"
                }`}
              >
                {item.title}
              </h2>
              <p className={`mt-3 text-sm leading-7 ${index === 1 ? "text-slate-300" : "text-slate-600"}`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-xl">
            <HomeSectionHeading
              eyebrow="How it works"
              title="A fast three-step flow built to move users into conversion"
              description="Instead of explaining every technical detail, the homepage now focuses on the simplest story: upload, choose the destination, get a better resume."
            />

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Why this matters
              </p>
              <p className="mt-4 text-base leading-8 text-slate-700">
                The page is intentionally pushing users toward one action. Less noise, fewer
                side paths, and clearer proof that the product can output a resume that feels
                ready for real applications.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-slate-200 md:block" />
            <div className="space-y-5">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-[2rem] border border-slate-200 bg-white/88 p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)] backdrop-blur"
                >
                  <div className="flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-8">
        <HomeSectionHeading
          eyebrow="Features"
          title="A bigger visual break with a stronger product-story layout"
          description="The feature section is now a mixed bento layout instead of another flat row of matching cards, so the page reads less like a template and more like a product landing page."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HomeFeatureCard
              badge={features[0].badge}
              title={features[0].title}
              description={features[0].description}
              accent={features[0].accent}
              tone={features[0].tone}
            />
          </div>
          <div className="lg:col-span-5">
            <HomeFeatureCard
              badge={features[1].badge}
              title={features[1].title}
              description={features[1].description}
              accent={features[1].accent}
              tone={features[1].tone}
            />
          </div>
          <div className="lg:col-span-5">
            <HomeFeatureCard
              badge={features[2].badge}
              title={features[2].title}
              description={features[2].description}
              accent={features[2].accent}
              tone={features[2].tone}
            />
          </div>
          <div className="lg:col-span-7">
            <HomeFeatureCard
              badge={features[3].badge}
              title={features[3].title}
              description={features[3].description}
              accent={features[3].accent}
              tone={features[3].tone}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="rounded-[2.8rem] border border-slate-200 bg-[linear-gradient(135deg,#ebfff6,#ffffff_48%,#f1fbff)] px-6 py-10 shadow-[0_28px_70px_-38px_rgba(8,17,31,0.32)] sm:px-10 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Final CTA
            </p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Get your optimized resume now
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Upload your current CV, choose the target country, and generate a cleaner
              version built for real applications - not just prettier formatting.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/convert"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(8,17,31,0.85)] hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Start converting
              </Link>
              <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600">
                PDF and DOCX supported
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
