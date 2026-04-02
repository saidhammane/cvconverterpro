import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "UK CV Format Guide | Convert Your CV for the UK | CVConverterPro",
  description:
    "Adapt your CV for the UK job market with clearer structure, stronger personal profile writing, and more relevant UK CV formatting.",
  alternates: { canonical: "/uk-cv-format" }
};

export default function UkCvFormatPage() {
  return (
    <SeoLandingPage
      eyebrow="UK CV format"
      title="Adapt your CV to a stronger UK CV format"
      intro="Applying in the UK usually means sending a clear, targeted CV that opens strongly and stays easy to scan. If your current CV feels too generic, too academic, or poorly structured, it may not feel aligned with UK hiring expectations."
      summary="CVConverterPro helps you reshape your CV for the UK market with cleaner structure, stronger positioning, and output that feels more credible for British employers."
      primaryCta="Convert my CV for the UK"
      audience={[
        "Job seekers applying for roles in the UK",
        "Students applying for graduate schemes or internships in Britain",
        "Professionals relocating to the UK job market",
        "Applicants who need a clearer personal profile and stronger CV structure"
      ]}
      rules={[
        {
          title: "Strong profile or personal statement",
          description:
            "Many UK CVs open with a short summary that explains who you are, what you do, and what kind of role you are targeting."
        },
        {
          title: "Clear, well-organized structure",
          description:
            "The UK market usually rewards a CV that is easy to skim, logically ordered, and focused on relevant experience rather than excessive detail."
        },
        {
          title: "Balanced tone and professionalism",
          description:
            "The wording should feel professional and direct without becoming too stiff or overly academic. Clear communication matters more than inflated language."
        }
      ]}
      mistakes={[
        {
          title: "No clear opening summary",
          description:
            "If the CV starts too abruptly, the recruiter may not quickly understand your profile or target role."
        },
        {
          title: "Too much irrelevant detail",
          description:
            "A UK CV should feel focused. Long sections that do not support the role can make the application weaker."
        },
        {
          title: "Unclear structure and inconsistent formatting",
          description:
            "A messy CV makes it harder to trust the content, even when the experience itself is strong."
        }
      ]}
      benefits={[
        {
          title: "Improve the opening profile",
          description:
            "The product helps shape your top section into a stronger personal summary that feels more useful for UK applications."
        },
        {
          title: "Make the CV easier to scan",
          description:
            "A clearer hierarchy and cleaner formatting make it easier for recruiters to understand your fit quickly."
        },
        {
          title: "Adapt the document without rewriting from scratch",
          description:
            "You can start from your current CV and convert it into something that feels more aligned with UK expectations."
        }
      ]}
      faqs={[
        {
          question: "How long should a UK CV be?",
          answer:
            "Many UK CVs are around two pages, but the real goal is relevance and clarity rather than hitting an exact length."
        },
        {
          question: "What is a personal profile on a UK CV?",
          answer:
            "It is a short opening summary that introduces your background, strengths, and target role. It helps frame the rest of the CV quickly."
        },
        {
          question: "Should I include a photo on a UK CV?",
          answer:
            "Usually no. UK CVs generally avoid photos unless there is a specific reason related to the role or industry."
        },
        {
          question: "Is a UK CV different from a US resume?",
          answer:
            "Yes. There are overlaps, but UK CVs often use a slightly different tone, structure, and summary style than US resumes."
        },
        {
          question: "Should my UK CV be tailored for each job?",
          answer:
            "Usually yes. A more targeted CV often performs better than one generic version sent everywhere."
        }
      ]}
      relatedLinks={[
        {
          href: "/canadian-resume-converter",
          title: "Canadian resume converter",
          description: "Compare UK CV expectations with the cleaner, shorter Canadian resume style."
        },
        {
          href: "/us-resume-converter",
          title: "US resume converter",
          description: "See how US resumes differ from UK CVs in tone, structure, and emphasis."
        },
        {
          href: "/australian-resume-format",
          title: "Australian resume format guide",
          description: "Explore another English-speaking market with different resume expectations."
        }
      ]}
      hubLink={{
        href: "/resume-formats-by-country",
        title: "Compare all supported country formats",
        description: "Use the central country hub to compare UK CV expectations with the other supported formats."
      }}
      finalTitle="Get your UK-ready CV now"
      finalBody="Upload your current CV, choose the UK as the target market, and generate a clearer, more credible CV for British applications."
    />
  );
}
