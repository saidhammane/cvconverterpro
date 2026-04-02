import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "German CV Format Guide and Converter | Lebenslauf Help | CVConverterPro",
  description:
    "Adapt your resume to German CV format expectations with clearer structure, stronger professional presentation, and ATS-friendly output for Germany.",
  alternates: { canonical: "/german-cv-format" }
};

export default function GermanCvFormatPage() {
  return (
    <SeoLandingPage
      eyebrow="German CV format"
      title="Adapt your resume to a clearer German CV format"
      intro="Applying in Germany often requires a more structured and formal CV style than many applicants expect. If your document feels too casual, too narrative, or too loosely organized, it may look out of place."
      summary="CVConverterPro helps you reshape your resume into a more professional German-style CV structure while keeping the process faster and easier than rewriting everything manually."
      primaryCta="Convert my CV for Germany"
      audience={[
        "Professionals applying for jobs in Germany",
        "International students preparing German internship applications",
        "Candidates moving from another market into the German hiring system",
        "Applicants who want a cleaner Lebenslauf-style presentation"
      ]}
      rules={[
        {
          title: "Structured and orderly layout",
          description:
            "German CV expectations usually favor a clear, formal structure. A document that feels organized and predictable often creates more trust."
        },
        {
          title: "Direct professional presentation",
          description:
            "The CV should quickly communicate role, experience, timeline, and skills without unnecessary noise. Strong clarity matters more than decorative formatting."
        },
        {
          title: "Consistency and completeness",
          description:
            "When dates, sections, and role descriptions feel inconsistent, the application can look weaker. German hiring processes often reward precision and coherence."
        }
      ]}
      mistakes={[
        {
          title: "Using a resume style that feels too informal",
          description:
            "A CV that works in a more casual market may not feel strong in Germany, where structure and presentation often carry more weight."
        },
        {
          title: "Disorganized timelines or inconsistent formatting",
          description:
            "If sections or dates feel messy, recruiters may question the professionalism of the application even before reading deeply."
        },
        {
          title: "Sending generic international formatting everywhere",
          description:
            "A one-size-fits-all resume can reduce credibility. Germany often rewards a more adapted, orderly CV style."
        }
      ]}
      benefits={[
        {
          title: "Make the CV feel more aligned with German expectations",
          description:
            "The product helps present your experience in a cleaner format that feels more credible for applications in Germany."
        },
        {
          title: "Improve readability and structure",
          description:
            "A stronger hierarchy and clearer grouping help your CV feel more professional and easier to review."
        },
        {
          title: "Reduce the friction of adapting manually",
          description:
            "Instead of rebuilding the document from scratch, you can convert and refine a version that already fits the target market better."
        }
      ]}
      faqs={[
        {
          question: "What is a Lebenslauf?",
          answer:
            "A Lebenslauf is the standard German term for a CV or resume. In practice, it usually refers to a structured, professional document used in German job applications."
        },
        {
          question: "Should I include a photo on a German CV?",
          answer:
            "Practices vary, but photos are still more common in German-speaking markets than in countries like Canada or the US. It depends on the role and your comfort level."
        },
        {
          question: "How formal should a German CV be?",
          answer:
            "Usually more formal and structured than many international resume styles. Clear organization and professional presentation matter a lot."
        },
        {
          question: "Is chronology important in Germany?",
          answer:
            "Yes. A clear timeline is often expected, and inconsistent dates or unclear sequencing can weaken trust in the application."
        },
        {
          question: "Can I use an English CV to apply in Germany?",
          answer:
            "Sometimes yes, especially for international companies, but the structure still often needs to feel aligned with German expectations."
        }
      ]}
      relatedLinks={[
        {
          href: "/canadian-resume-converter",
          title: "Canadian resume converter",
          description: "Compare Germany’s formal CV expectations with the shorter Canadian resume style."
        },
        {
          href: "/us-resume-converter",
          title: "US resume converter",
          description: "See how the US market differs with more concise, achievement-focused resume writing."
        },
        {
          href: "/french-cv-format",
          title: "French CV format guide",
          description: "Compare Germany’s structure with France’s more formal CV presentation style."
        }
      ]}
      hubLink={{
        href: "/resume-formats-by-country",
        title: "Compare all supported country formats",
        description: "Browse the country hub to compare Germany with other major resume and CV markets."
      }}
      finalTitle="Get your German-format CV now"
      finalBody="Choose Germany as the target market and generate a more structured, professional CV version that feels closer to local expectations."
    />
  );
}
