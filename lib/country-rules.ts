import { countryLabels, type CountryRule, type CountryValue } from "@/lib/convert";

export const countryRules: Record<CountryValue, CountryRule> = {
  canada: {
    label: countryLabels.canada,
    documentStyle: {
      preferredDocumentName: "Resume",
      formattingPriorities: [
        "Keep the layout clean, professional, and easy to scan quickly.",
        "Lead with measurable impact and practical achievements.",
        "Favor ATS-friendly headings and straightforward formatting over visual complexity."
      ],
      layoutNotes: [
        "Use a reverse-chronological structure for most professional roles.",
        "Avoid dense text blocks and keep bullets concise.",
        "Keep contact details prominent without adding unnecessary personal information."
      ]
    },
    pageGuidance: {
      idealPageRange: "1 to 2 pages",
      earlyCareer: "Aim for 1 page unless internships or co-op experience strongly justify more.",
      experienced: "2 pages is common when it helps show relevant accomplishments clearly."
    },
    photoPolicy: {
      recommendation: "Discouraged",
      guidance: "Do not include a photo unless an employer explicitly asks for one."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional summary",
      "Work experience",
      "Education",
      "Skills"
    ],
    forbiddenOrDiscouragedItems: [
      "Photo",
      "Date of birth",
      "Marital status",
      "Nationality when not required",
      "Long objective statements without role relevance"
    ],
    toneGuidance: [
      "Clear and confident",
      "Achievement-driven",
      "Professional without sounding overly formal"
    ],
    specialNotes: [
      "Volunteer work can be valuable when it demonstrates leadership or local experience.",
      "Tailoring keywords to the job posting matters for ATS screening."
    ]
  },
  germany: {
    label: countryLabels.germany,
    documentStyle: {
      preferredDocumentName: "Lebenslauf / CV",
      formattingPriorities: [
        "Present a structured, formal, and complete career overview.",
        "Keep chronology consistent and clearly labeled.",
        "Prioritize clarity, precision, and professional polish."
      ],
      layoutNotes: [
        "A tidy one- or two-page CV is common, depending on experience.",
        "Month and year ranges should be consistent across all entries.",
        "Section titles should be direct and easy to interpret."
      ]
    },
    pageGuidance: {
      idealPageRange: "1 to 2 pages",
      earlyCareer: "1 page is often enough for graduates or junior applicants.",
      experienced: "2 pages is acceptable when it improves completeness and readability."
    },
    photoPolicy: {
      recommendation: "Optional but still common in some cases",
      guidance: "A professional headshot may still appear in Germany, but it should be omitted if the employer or platform discourages it."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional profile or summary",
      "Work experience",
      "Education",
      "Skills",
      "Languages",
      "Certifications when relevant"
    ],
    forbiddenOrDiscouragedItems: [
      "Informal language",
      "Unexplained employment gaps",
      "Highly decorative layouts that reduce readability"
    ],
    toneGuidance: [
      "Formal and precise",
      "Fact-based",
      "Structured and trustworthy"
    ],
    specialNotes: [
      "Role titles and responsibilities should be translated or localized clearly when helpful.",
      "Applications may also expect supporting documents outside the CV, but those are separate from the conversion flow."
    ]
  },
  australia: {
    label: countryLabels.australia,
    documentStyle: {
      preferredDocumentName: "Resume",
      formattingPriorities: [
        "Show relevant accomplishments and practical outcomes.",
        "Balance professionalism with plain-language readability.",
        "Use scannable sections that work well for recruiters and ATS tools."
      ],
      layoutNotes: [
        "Australian resumes can run longer than US resumes when relevant detail adds value.",
        "Highlight core competencies and role-specific achievements.",
        "Keep formatting modern but simple."
      ]
    },
    pageGuidance: {
      idealPageRange: "2 to 3 pages",
      earlyCareer: "1 to 2 pages is usually enough for junior candidates.",
      experienced: "2 to 3 pages can be acceptable if the detail remains relevant."
    },
    photoPolicy: {
      recommendation: "Discouraged",
      guidance: "Do not include a photo unless a role or region explicitly requests it."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional summary",
      "Key skills",
      "Work experience",
      "Education",
      "Certifications or licenses when relevant"
    ],
    forbiddenOrDiscouragedItems: [
      "Photo",
      "Date of birth",
      "Marital status",
      "Irrelevant personal details"
    ],
    toneGuidance: [
      "Direct and practical",
      "Results-oriented",
      "Professional but accessible"
    ],
    specialNotes: [
      "Selection criteria may matter for public-sector or specific roles, but they are usually handled separately from the resume itself.",
      "Recruiters often value concise evidence of impact over long task lists."
    ]
  },
  usa: {
    label: countryLabels.usa,
    documentStyle: {
      preferredDocumentName: "Resume",
      formattingPriorities: [
        "Optimize for speed of review and ATS readability.",
        "Emphasize measurable achievements over broad job descriptions.",
        "Keep formatting minimal, modern, and easy to parse."
      ],
      layoutNotes: [
        "One page is common for early-career candidates, but two pages is acceptable for experienced professionals.",
        "Use strong action verbs and quantified outcomes when possible.",
        "Avoid visual elements that may break ATS parsing."
      ]
    },
    pageGuidance: {
      idealPageRange: "1 to 2 pages",
      earlyCareer: "1 page is the standard target for students and early-career applicants.",
      experienced: "2 pages is common once experience and accomplishments justify it."
    },
    photoPolicy: {
      recommendation: "Strongly discouraged",
      guidance: "Do not include a photo because US resumes generally avoid personal identifiers that could create bias concerns."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional summary",
      "Experience",
      "Education",
      "Skills"
    ],
    forbiddenOrDiscouragedItems: [
      "Photo",
      "Date of birth",
      "Full street address when unnecessary",
      "Marital status",
      "References available upon request"
    ],
    toneGuidance: [
      "Concise and achievement-focused",
      "Commercially relevant",
      "Confident without exaggeration"
    ],
    specialNotes: [
      "Tailored keywords and role alignment are especially important for ATS-driven screening.",
      "A federal resume follows different rules and should be treated separately later if supported."
    ]
  },
  uk: {
    label: countryLabels.uk,
    documentStyle: {
      preferredDocumentName: "CV",
      formattingPriorities: [
        "Keep the presentation polished, concise, and professional.",
        "Balance readability with enough context to show suitability for the role.",
        "Use clear sectioning and reverse chronology."
      ],
      layoutNotes: [
        "Two pages is a common target for many professional UK CVs.",
        "A short profile at the top is common when it adds role-specific value.",
        "Use consistent headings and dates throughout."
      ]
    },
    pageGuidance: {
      idealPageRange: "2 pages",
      earlyCareer: "1 page can work for students or graduates with limited experience.",
      experienced: "2 pages is common when it improves role relevance and clarity."
    },
    photoPolicy: {
      recommendation: "Discouraged",
      guidance: "Avoid including a photo unless a specific industry or employer explicitly asks for it."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional profile",
      "Work experience",
      "Education",
      "Skills",
      "Certifications when relevant"
    ],
    forbiddenOrDiscouragedItems: [
      "Photo",
      "Date of birth",
      "Marital status",
      "Nationality unless needed for work authorization context"
    ],
    toneGuidance: [
      "Professional and concise",
      "Competence-focused",
      "Measured rather than overly promotional"
    ],
    specialNotes: [
      "The term CV is standard in the UK, but ATS-friendly formatting still matters.",
      "Work authorization context may be relevant in some applications, but it should be handled carefully and only when useful."
    ]
  },
  france: {
    label: countryLabels.france,
    documentStyle: {
      preferredDocumentName: "CV",
      formattingPriorities: [
        "Present a polished and coherent professional narrative.",
        "Keep the structure easy to scan with strong visual order.",
        "Maintain professionalism while allowing modest personal branding when appropriate."
      ],
      layoutNotes: [
        "A one-page CV is often preferred, especially for standard corporate applications.",
        "Chronology should be clear and easy to follow.",
        "Layout can be more styled than in the US, but readability must come first."
      ]
    },
    pageGuidance: {
      idealPageRange: "1 page, sometimes 2 for senior profiles",
      earlyCareer: "Aim for 1 page whenever possible.",
      experienced: "A second page may be acceptable for senior or highly technical profiles."
    },
    photoPolicy: {
      recommendation: "Optional and still relatively common in some contexts",
      guidance: "A professional photo may appear on French CVs, but it should remain optional and should be omitted when applying through systems or employers that discourage it."
    },
    requiredOrCommonSections: [
      "Contact information",
      "Professional summary or profile",
      "Work experience",
      "Education",
      "Skills",
      "Languages when relevant"
    ],
    forbiddenOrDiscouragedItems: [
      "Overly informal tone",
      "Large blocks of text",
      "Irrelevant personal details beyond what is professionally useful"
    ],
    toneGuidance: [
      "Professional and polished",
      "Clear and structured",
      "Confident without sounding aggressive"
    ],
    specialNotes: [
      "French CV conventions can be slightly more open to design and optional personal detail than US resumes.",
      "Language proficiency can be important to surface clearly for cross-border roles."
    ]
  }
};
