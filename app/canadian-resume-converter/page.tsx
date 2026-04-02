import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "Canadian Resume Converter | ATS-Friendly Canadian Resume Format | CVConverterPro",
  description:
    "Convert your CV to Canadian resume format with ATS-friendly structure, cleaner wording, and English or French output for jobs in Canada.",
  alternates: { canonical: "/canadian-resume-converter" }
};

export default function CanadianResumeConverterPage() {
  return (
    <SeoLandingPage
      eyebrow="Canadian resume converter"
      title="Convert your CV into a cleaner Canadian resume format"
      intro="Canadian employers usually expect a concise resume, not an overly long CV. If your current document feels too dense, too academic, or too country-specific, it can weaken your application before your experience is properly understood."
      summary="CVConverterPro helps job seekers adapt their resume for Canada with cleaner formatting, ATS-friendly structure, and output that feels more aligned with Canadian hiring expectations."
      primaryCta="Convert my resume for Canada"
      audience={[
        "Job seekers applying to Canadian employers from abroad",
        "Newcomers and immigrants preparing resumes for Canada",
        "Students applying for internships or graduate roles in Canada",
        "Professionals who need a shorter, more ATS-friendly Canadian resume"
      ]}
      rules={[
        {
          title: "Shorter and more focused structure",
          description:
            "A Canadian resume is usually more concise than a traditional CV. Hiring managers often expect a document that highlights relevant impact quickly instead of listing everything in detail."
        },
        {
          title: "Achievements over job descriptions",
          description:
            "Canadian recruiters respond better to measurable results, ownership, and business outcomes. Strong bullet points usually matter more than long generic responsibility lists."
        },
        {
          title: "Clean, ATS-friendly formatting",
          description:
            "Simple sectioning, readable typography, and a consistent layout help your resume perform better in applicant tracking systems and feel more professional to human reviewers."
        }
      ]}
      mistakes={[
        {
          title: "Using an academic or overly detailed CV",
          description:
            "Many applicants send a full CV when the market expects a tighter resume. That often makes the application feel less targeted and harder to scan."
        },
        {
          title: "Keeping local formatting that does not travel well",
          description:
            "What works in one country may look unusual in Canada. Section order, density, and writing style all affect credibility."
        },
        {
          title: "Weak bullet points with no outcomes",
          description:
            "If your experience only lists tasks and tools, the resume may not show enough value. Canadian hiring teams often look for impact, clarity, and relevance."
        }
      ]}
      benefits={[
        {
          title: "Reframe your CV into a stronger resume",
          description:
            "The product helps restructure your existing content so it looks more aligned with Canadian resume expectations instead of feeling copied from another market."
        },
        {
          title: "Improve ATS readability",
          description:
            "A cleaner hierarchy and simpler formatting can help your resume stay easier to parse and easier to review."
        },
        {
          title: "Generate output in English or French",
          description:
            "That makes it easier to prepare applications for different provinces, industries, and bilingual job opportunities."
        }
      ]}
      faqs={[
        {
          question: "Should I include a photo on a Canadian resume?",
          answer:
            "Usually no. Most Canadian resumes avoid photos because the focus is expected to stay on skills, experience, and fit for the role."
        },
        {
          question: "How long should a Canadian resume be?",
          answer:
            "It depends on experience, but many candidates aim for a concise one-page or two-page resume that stays relevant to the role."
        },
        {
          question: "Is a Canadian resume different from a European CV?",
          answer:
            "Yes. Canadian resumes are often shorter, more achievement-focused, and more tailored to the job rather than broad career documentation."
        },
        {
          question: "Can I apply in French in Canada?",
          answer:
            "Yes, in the right context. Some provinces, employers, and roles expect or value French, while others mainly require English."
        },
        {
          question: "Why does ATS formatting matter for Canada?",
          answer:
            "Because many companies use applicant tracking systems, and a clean structure helps your resume stay readable during screening."
        }
      ]}
      relatedLinks={[
        {
          href: "/german-cv-format",
          title: "German CV format guide",
          description: "See how Germany usually expects a more structured and formal CV presentation."
        },
        {
          href: "/us-resume-converter",
          title: "US resume converter",
          description: "Compare Canadian expectations with a more achievement-driven US resume style."
        },
        {
          href: "/uk-cv-format",
          title: "UK CV format guide",
          description: "Explore how UK CV structure differs from Canadian resume expectations."
        }
      ]}
      hubLink={{
        href: "/resume-formats-by-country",
        title: "Compare all supported country formats",
        description: "Use the country hub to compare resume expectations across all supported markets before choosing a format."
      }}
      finalTitle="Get your Canadian resume version now"
      finalBody="Upload your current CV, choose Canada as the target country, and generate a cleaner, more ATS-friendly resume for Canadian applications."
    />
  );
}
