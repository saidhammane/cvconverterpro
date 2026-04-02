import Link from "next/link";
import { HomeSectionHeading } from "@/components/home-section-heading";
import { SeoFaqSection, type FaqItem } from "@/components/seo-faq-section";

type SectionItem = {
  title: string;
  description: string;
};

type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

type LandingPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  primaryCta: string;
  audience: readonly string[];
  rules: readonly SectionItem[];
  mistakes: readonly SectionItem[];
  benefits: readonly SectionItem[];
  finalTitle: string;
  finalBody: string;
  faqs: readonly FaqItem[];
  relatedLinks: readonly RelatedLink[];
  hubLink?: {
    href: string;
    title: string;
    description: string;
  };
};

export function SeoLandingPage({
  eyebrow,
  title,
  intro,
  summary,
  primaryCta,
  audience,
  rules,
  mistakes,
  benefits,
  finalTitle,
  finalBody,
  faqs,
  relatedLinks,
  hubLink
}: LandingPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(52,211,153,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.94))]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-8 lg:px-10 lg:pb-24 lg:pt-18">
          <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            {eyebrow}
          </span>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">{intro}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">{summary}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/convert"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_-24px_rgba(52,211,153,0.6)] hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              {primaryCta}
            </Link>
            <Link
              href="#country-rules"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
            >
              See the formatting rules
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10" id="who-this-is-for">
        <HomeSectionHeading
          eyebrow="Who this is for"
          title="Built for people targeting a specific hiring market"
          description="These pages are meant to help real users understand what changes in each market before they convert their CV."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {audience.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_50px_-36px_rgba(8,17,31,0.2)]">
              <p className="text-sm font-medium leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-10" id="country-rules">
        <HomeSectionHeading
          eyebrow="Country-specific rules"
          title="What usually changes in this market"
          description="A useful landing page should explain the real formatting expectations, not just repeat keywords."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {rules.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)]">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50/60 p-6">
            <HomeSectionHeading
              eyebrow="Common mistakes"
              title="Where applicants often lose credibility"
              description="These are the formatting and content choices that often make a resume feel misaligned for the target country."
            />
            <div className="mt-6 space-y-4">
              {mistakes.map((item) => (
                <div key={item.title} className="rounded-[1.3rem] border border-rose-200 bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50/60 p-6">
            <HomeSectionHeading
              eyebrow="How CVConverterPro helps"
              title="How the product makes this easier"
              description="The goal is not just to rewrite text, but to help users submit something that feels more aligned with the market they are targeting."
            />
            <div className="mt-6 space-y-4">
              {benefits.map((item) => (
                <div key={item.title} className="rounded-[1.3rem] border border-emerald-200 bg-white px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SeoFaqSection
        items={faqs}
        title="Questions people often ask before converting"
        description="These answers are specific to this resume market and meant to help users avoid common mistakes."
      />

      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-10 lg:py-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.22)]">
          <HomeSectionHeading
            eyebrow="Explore other country formats"
            title="Related resume format guides"
            description="If you are still deciding where to apply, compare the expectations of other major hiring markets."
          />
          {hubLink ? (
            <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-5">
              <p className="text-sm font-semibold text-slate-900">{hubLink.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{hubLink.description}</p>
              <div className="mt-4">
                <Link
                  href={hubLink.href}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  View all country formats
                </Link>
              </div>
            </div>
          ) : null}
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="rounded-[2.8rem] border border-slate-200 bg-[linear-gradient(135deg,#ebfff6,#ffffff_50%,#f0f9ff)] px-6 py-10 text-center shadow-[0_28px_70px_-38px_rgba(8,17,31,0.32)] sm:px-10 lg:px-14 lg:py-14">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Final CTA</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{finalTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{finalBody}</p>
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
