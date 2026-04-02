import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "US Resume Converter | ATS-Friendly American Resume Format | CVConverterPro",
  description:
    "Convert your CV into a US resume format with ATS-friendly structure, stronger achievement-focused bullets, and cleaner formatting for American job applications.",
  alternates: { canonical: "/us-resume-converter" }
};

export default function UsResumeConverterPage() {
  return (
    <SeoLandingPage
      eyebrow="US resume converter"
      title="Turn your CV into a stronger US-style resume"
      intro="US employers usually expect a concise, impact-focused resume rather than a long general CV. If your current document feels too broad, too academic, or too descriptive, it may not perform well in the American hiring process."
      summary="CVConverterPro helps job seekers adapt their content into a cleaner, ATS-friendly US resume format with stronger emphasis on clarity, relevance, and achievements."
      primaryCta="Convert my resume for the US"
      audience={[
        "Job seekers applying to US companies",
        "International candidates targeting remote American roles",
        "Students applying for internships and entry-level jobs in the US",
        "Professionals who need a tighter, achievement-driven resume"
      ]}
      rules={[
        {
          title: "Resume, not full CV",
          description:
            "Most US job applications expect a focused resume, not a long general-purpose CV. Brevity and relevance matter a lot."
        },
        {
          title: "Achievement-oriented bullet points",
          description:
            "US resumes often perform better when they show measurable results, ownership, and direct business impact instead of generic task summaries."
        },
        {
          title: "Strong ATS compatibility",
          description:
            "Simple layout, clean section labels, and consistent formatting help both screening software and recruiters understand your profile faster."
        }
      ]}
      mistakes={[
        {
          title: "Using long, dense paragraphs",
          description:
            "A recruiter in the US is often scanning quickly. Paragraph-heavy resumes make it harder to spot value fast."
        },
        {
          title: "Listing responsibilities without results",
          description:
            "If the resume does not show impact, the reader may not understand why your work mattered."
        },
        {
          title: "Keeping the same CV format for every country",
          description:
            "A format that works elsewhere may not feel optimized for American applications. Adaptation matters."
        }
      ]}
      benefits={[
        {
          title: "Refocus your content for US recruiters",
          description:
            "The product helps transform broad CV content into a cleaner, more targeted resume format suited to US applications."
        },
        {
          title: "Make your resume easier to scan",
          description:
            "Cleaner hierarchy and more readable structure improve both ATS parsing and recruiter readability."
        },
        {
          title: "Prepare better English output faster",
          description:
            "This is especially useful for candidates applying internationally who need a more polished US-ready resume version quickly."
        }
      ]}
      faqs={[
        {
          question: "How long should a US resume be?",
          answer:
            "It depends on experience, but many candidates aim for a concise one-page or two-page resume that stays highly relevant to the job."
        },
        {
          question: "Is a US resume different from a CV?",
          answer:
            "Yes. In most US hiring contexts, a resume is shorter and more targeted, while a CV is usually used in academic or research settings."
        },
        {
          question: "Should I include a photo on a US resume?",
          answer:
            "Usually no. US resumes normally focus on experience, results, and fit for the role rather than personal visuals."
        },
        {
          question: "Why do ATS-friendly resumes matter in the US?",
          answer:
            "Because many US employers rely on screening software, and clean formatting can improve readability during the review process."
        },
        {
          question: "Do US resumes need measurable achievements?",
          answer:
            "Usually yes. Strong bullet points that show outcomes often perform better than generic lists of responsibilities."
        }
      ]}
      relatedLinks={[
        {
          href: "/canadian-resume-converter",
          title: "Canadian resume converter",
          description: "See how Canadian resume expectations compare with the US market."
        },
        {
          href: "/german-cv-format",
          title: "German CV format guide",
          description: "Compare the US resume style with Germany’s more formal and structured CV expectations."
        },
        {
          href: "/australian-resume-format",
          title: "Australian resume format guide",
          description: "Compare US resume expectations with Australia’s practical, results-focused style."
        }
      ]}
      hubLink={{
        href: "/resume-formats-by-country",
        title: "Compare all supported country formats",
        description: "Use the country hub to compare US resume expectations with the other supported markets."
      }}
      finalTitle="Get your US resume version now"
      finalBody="Upload your current CV, choose the United States as your target market, and generate a cleaner, more ATS-friendly resume built for US applications."
    />
  );
}
