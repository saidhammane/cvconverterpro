import Link from "next/link";
import type { Metadata } from "next";
import { HomeFeatureCard } from "@/components/home-feature-card";
import { HomeHeroPreview } from "@/components/home-hero-preview";
import { HomeSectionHeading } from "@/components/home-section-heading";

const trustItems = [
  {
    title: "Country-specific resume formats",
    description: "Adapt your CV to local expectations instead of sending the same format everywhere."
  },
  {
    title: "ATS-friendly structure",
    description: "Keep your resume clean, scannable, and easier for recruiters and applicant tracking systems."
  },
  {
    title: "English and French output",
    description: "Generate resume output in the language that matches the jobs you are targeting."
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
    title: "Choose country and language",
    description: "Select the destination market and output language for the right resume style."
  },
  {
    number: "03",
    title: "Download your converted resume",
    description: "Review the improved version, then export a cleaner PDF ready for applications."
  }
] as const;

const features = [
  {
    badge: "01",
    title: "Country-aware formatting",
    description: "Adjust layout and resume structure for Canada, the UK, the USA, France, and other markets.",
    accent: "mint" as const,
    tone: "dark" as const
  },
  {
    badge: "02",
    title: "AI-powered rewriting",
    description: "Improve clarity, wording, and positioning while keeping your real experience intact.",
    accent: "cyan" as const,
    tone: "light" as const
  },
  {
    badge: "03",
    title: "Clean PDF export",
    description: "Preview your converted CV in the browser, then export a polished PDF for real job applications.",
    accent: "slate" as const,
    tone: "light" as const
  },
  {
    badge: "04",
    title: "Built for international job seekers",
    description: "Useful for people applying abroad, changing countries, or adapting their resume to new markets.",
    accent: "mint" as const,
    tone: "dark" as const
  }
] as const;

const audience = [
  "Job seekers applying abroad",
  "Immigrants adapting their resume for a new country",
  "Students applying for international internships or graduate roles",
  "Professionals updating their CV for another market"
] as const;

export const metadata: Metadata = {
  title: "Convert your CV for any country — instantly | CVConverterPro",
  description:
    "Convert CV to Canadian format, generate an ATS-friendly resume, and adapt your CV for international applications with AI-powered formatting in English and French.",
  keywords: [
    "convert CV to Canadian format",
    "ATS-friendly resume converter",
    "international resume formatting",
    "AI resume converter",
    "convert resume for another country",
    "English and French resume output"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Convert your CV for any country — instantly | CVConverterPro",
    description:
      "AI-powered CV conversion for country-specific formatting, ATS-friendly output, and English or French resume generation.",
    url: "/",
    siteName: "CVConverterPro",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CVConverterPro homepage"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert your CV for any country — instantly | CVConverterPro",
    description: "ATS-friendly, AI-powered CV conversion for international job seekers.",
    images: ["/og-image.svg"]
  }
};

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.94))]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-28 lg:pt-16">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                AI-powered CV conversion for international applications
              </span>

              <h1 className="font-display mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Convert your CV for any country — instantly
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Turn your existing CV into a country-specific, ATS-friendly resume with AI-powered conversion.
                Generate cleaner output for international applications, with support for both English and French.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/convert"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-24px_rgba(52,211,153,0.6)] hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Start converting
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
                >
                  See how it works
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {trustItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <HomeHeroPreview />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20" id="how-it-works">
        <div className="max-w-3xl">
          <HomeSectionHeading
            eyebrow="How it works"
            title="A simple 3-step flow from old CV to optimized resume"
            description="The product is built to get users from upload to export quickly, without forcing them to rebuild everything manually."
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {step.number}
              </div>
              <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10 lg:py-8" id="features">
        <HomeSectionHeading
          eyebrow="Features"
          title="Everything users need to adapt their resume for another market"
          description="The homepage now focuses on the product benefits that matter most: country-aware formatting, ATS-friendly output, and fast conversion into a cleaner final resume."
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

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 rounded-[2.4rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#ffffff_45%,#ecfeff)] px-6 py-10 shadow-[0_24px_60px_-36px_rgba(8,17,31,0.25)] lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <HomeSectionHeading
              eyebrow="Who it’s for"
              title="Made for people who need their CV to work in another country"
              description="CVConverterPro is built for international applications, not just cosmetic resume editing."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5">
                <p className="text-sm font-medium leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="rounded-[2.8rem] border border-slate-200 bg-[linear-gradient(135deg,#ebfff6,#ffffff_50%,#f0f9ff)] px-6 py-10 text-center shadow-[0_28px_70px_-38px_rgba(8,17,31,0.32)] sm:px-10 lg:px-14 lg:py-14">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Final CTA
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Get your optimized resume now
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Upload your current CV, choose the destination country, and generate a cleaner, more professional resume built for real applications.
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
      </section>
    </div>
  );
}
