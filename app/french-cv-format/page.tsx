import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "French CV Format Guide | Convert Your CV for France | CVConverterPro",
  description:
    "Adapt your CV for France with more formal presentation, French-language relevance, and structure that feels more aligned with French hiring expectations.",
  alternates: { canonical: "/french-cv-format" }
};

export default function FrenchCvFormatPage() {
  return (
    <SeoLandingPage
      eyebrow="French CV format"
      title="Adapt your CV to a stronger French CV format"
      intro="Applying in France often means presenting your CV in a way that feels more formal, more localized, and more aligned with French hiring habits. If your current CV feels too generic or too foreign in structure, it can reduce trust."
      summary="CVConverterPro helps job seekers reshape their CV for France with cleaner presentation, stronger French-language relevance, and formatting that feels more aligned with local expectations."
      primaryCta="Convert my CV for France"
      audience={[
        "Professionals applying for jobs in France",
        "Students preparing French internship or graduate applications",
        "International candidates adapting their CV for the French market",
        "Applicants who need stronger French-language output and presentation"
      ]}
      rules={[
        {
          title: "More formal presentation",
          description:
            "French CVs often feel more formal in structure and presentation than resumes used in some other markets."
        },
        {
          title: "Localization matters",
          description:
            "Language choice, formatting style, and how information is introduced can all affect whether the CV feels credible in France."
        },
        {
          title: "Clarity with professional polish",
          description:
            "The document should remain easy to scan, but also feel polished and intentionally presented for a French hiring audience."
        }
      ]}
      mistakes={[
        {
          title: "Using a resume that still feels foreign",
          description:
            "Even if the content is strong, a CV that feels poorly localized can create distance between the candidate and the recruiter."
        },
        {
          title: "Weak French-language adaptation",
          description:
            "If the wording feels too literal or unnatural, the CV may lose credibility quickly."
        },
        {
          title: "Ignoring presentation norms",
          description:
            "Tone, order, and presentation all matter. A document that feels misaligned can reduce the impact of your actual experience."
        }
      ]}
      benefits={[
        {
          title: "Improve French-market alignment",
          description:
            "The product helps convert your CV into a version that feels more natural for applications in France."
        },
        {
          title: "Support French-language output",
          description:
            "That makes it easier to prepare a CV that feels more credible for French-speaking recruiters and employers."
        },
        {
          title: "Keep structure clear while improving presentation",
          description:
            "You can keep the document readable and ATS-friendly without losing the more polished feel expected in the market."
        }
      ]}
      faqs={[
        {
          question: "Should I include a photo on a French CV?",
          answer:
            "Photos are more common in France than in some other markets, but it still depends on your preference, the role, and the company context."
        },
        {
          question: "Should my CV be in French for jobs in France?",
          answer:
            "In many cases yes, especially when the role and company operate mainly in French. A French-language CV often feels more locally aligned."
        },
        {
          question: "Is a French CV more formal than a US resume?",
          answer:
            "Usually yes. Presentation style, tone, and localization often matter more in France than in a standard US resume context."
        },
        {
          question: "Can I use the same CV for France and Canada?",
          answer:
            "Not ideally. Even if both markets may accept French-language output, formatting expectations and presentation style are not identical."
        },
        {
          question: "What is a common mistake when adapting a CV for France?",
          answer:
            "Leaving the content in a structure or tone that still feels foreign instead of making the document feel properly localized."
        }
      ]}
      relatedLinks={[
        {
          href: "/canadian-resume-converter",
          title: "Canadian resume converter",
          description: "Compare France’s more formal CV style with Canada’s shorter ATS-friendly resume expectations."
        },
        {
          href: "/german-cv-format",
          title: "German CV format guide",
          description: "See how France and Germany differ in structure, tone, and presentation."
        },
        {
          href: "/uk-cv-format",
          title: "UK CV format guide",
          description: "Compare French CV expectations with the UK’s more profile-driven CV style."
        }
      ]}
      hubLink={{
        href: "/resume-formats-by-country",
        title: "Compare all supported country formats",
        description: "Use the country hub to compare French CV expectations with the other supported markets."
      }}
      finalTitle="Get your French-format CV now"
      finalBody="Upload your current CV, choose France as the target market, and generate a cleaner, more locally aligned CV for French applications."
    />
  );
}
