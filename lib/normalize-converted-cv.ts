import "server-only";

import type {
  ConvertedCvStructuredContact,
  ConvertedCvStructuredExperience,
  ConvertedCvStructuredExtraSection,
  ConvertedCvStructuredOutput
} from "@/lib/converted-cv-schema";
import type { ConvertedCvData, CountryValue, StructuredCvData } from "@/lib/convert";

interface NormalizeConvertedCvInput {
  convertedCv: ConvertedCvStructuredOutput;
  structuredCv: StructuredCvData;
  targetCountry: CountryValue;
}

const PRESENT_PATTERN =
  /\b(current|currently|ongoing|to date|till date|today|now|present)\b/gi;

const MONTH_ABBREVIATIONS: Record<string, string> = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  sept: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec"
};

const TEXT_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\u0000/g, ""],
  [/\u00ad/g, ""],
  [/\u200b|\u200c|\u200d|\ufeff/g, ""],
  [/\u00a0/g, " "],
  [/Â/g, ""],
  [/â€¢/g, "-"],
  [/â€“|â€”|–|—|―|‑|‒/g, "-"],
  [/â€˜|â€™|’|‘/g, "'"],
  [/â€œ|â€|“|”/g, '"'],
  [/â€¦|…/g, "..."],
  [/\uFFFD/g, ""]
];

function collapseWhitespace(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[^\S\n]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function repairTextArtifacts(value: string): string {
  let normalized = value.normalize("NFKC");

  for (const [pattern, replacement] of TEXT_REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement);
  }

  return collapseWhitespace(normalized);
}

function abbreviateMonthNames(value: string): string {
  return value.replace(
    /\b(January|February|March|April|May|June|July|August|September|Sept|October|November|December)\b/gi,
    (match) => MONTH_ABBREVIATIONS[match.toLowerCase()] ?? match
  );
}

function normalizeDateText(value: string, targetCountry: CountryValue): string {
  let normalized = repairTextArtifacts(value)
    .replace(/\s*[-]\s*/g, " - ")
    .replace(PRESENT_PATTERN, "Present")
    .replace(/\b(\d{4})\s*-\s*(\d{4})\b/g, "$1 - $2")
    .replace(/\b(\d{4})\s*-\s*Present\b/g, "$1 - Present");

  if (targetCountry === "canada") {
    normalized = abbreviateMonthNames(normalized);
    normalized = normalized.replace(
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{4})/g,
      "$1 $2"
    );
  }

  return normalized.replace(/\s{2,}/g, " ").trim();
}

function normalizeForComparison(value: string): string {
  return repairTextArtifacts(value)
    .toLowerCase()
    .replace(/https?:\/\/(www\.)?/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const value of values) {
    const cleaned = repairTextArtifacts(value);

    if (!cleaned) {
      continue;
    }

    const key = normalizeForComparison(cleaned);

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(cleaned);
  }

  return unique;
}

function normalizePhone(value: string): string {
  const cleaned = repairTextArtifacts(value);
  const digits = cleaned.replace(/[^\d+]/g, "");

  if (digits.length < 7) {
    return cleaned;
  }

  if (digits.startsWith("+1") && digits.length >= 12) {
    const nationalDigits = digits.slice(2).replace(/\D/g, "").slice(0, 10);

    if (nationalDigits.length === 10) {
      return `+1 ${nationalDigits.slice(0, 3)} ${nationalDigits.slice(3, 6)} ${nationalDigits.slice(6)}`;
    }
  }

  return cleaned.replace(/[^\d+]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function normalizeContactField(value: string, type: "email" | "phone" | "text"): string {
  const cleaned = repairTextArtifacts(value);

  if (!cleaned) {
    return "";
  }

  if (type === "email") {
    return cleaned.toLowerCase();
  }

  if (type === "phone") {
    return normalizePhone(cleaned);
  }

  return cleaned;
}

function dedupeContactParts(parts: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const part of parts) {
    const cleaned = repairTextArtifacts(part);

    if (!cleaned) {
      continue;
    }

    const key = normalizeForComparison(cleaned);

    if (!key || seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(cleaned);
  }

  return unique;
}

function buildContactLineItems(contact: ConvertedCvStructuredContact): string[] {
  const baseParts = [
    normalizeContactField(contact.email, "email"),
    normalizeContactField(contact.phone, "phone"),
    normalizeContactField(contact.location, "text"),
    normalizeContactField(contact.linkedin, "text"),
    normalizeContactField(contact.github, "text")
  ].filter(Boolean);

  const expandedOtherParts = contact.other.flatMap((value) =>
    repairTextArtifacts(value)
      .split(/[|•]/)
      .map((part) => part.trim())
      .filter(Boolean)
  );

  return dedupeContactParts([...baseParts, ...expandedOtherParts]);
}

function inferHeadlineFromExperience(structuredCv: StructuredCvData): string {
  const firstExperienceEntry = structuredCv.experience[0] ?? "";

  if (!firstExperienceEntry) {
    return "";
  }

  const firstLine = firstExperienceEntry.split("\n")[0] ?? "";
  return repairTextArtifacts(firstLine.split("|")[0] ?? "");
}

function normalizeHeadline(value: string, structuredCv: StructuredCvData): string {
  const cleaned = repairTextArtifacts(value || structuredCv.headline || inferHeadlineFromExperience(structuredCv));

  if (!cleaned) {
    return "";
  }

  const prioritizedSegment = cleaned.split("|")[0]?.trim() ?? cleaned;
  const compressedSegments = prioritizedSegment
    .split(/[,/]/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const headline = compressedSegments.length > 0 ? compressedSegments.slice(0, 2).join(" | ") : prioritizedSegment;
  const words = headline.split(/\s+/).filter(Boolean);

  if (words.length <= 10) {
    return headline;
  }

  return words.slice(0, 10).join(" ");
}

function normalizeSummary(value: string): string {
  return repairTextArtifacts(value).replace(/\n+/g, " ").trim();
}

function splitBulletCandidates(values: string[]): string[] {
  return values.flatMap((value) => {
    const cleaned = repairTextArtifacts(value);

    if (!cleaned) {
      return [];
    }

    const newlineSplit = cleaned
      .split(/\n+/)
      .flatMap((line) => line.split(/[•·]/))
      .map((line) => line.trim())
      .filter(Boolean);

    if (newlineSplit.length > 1) {
      return newlineSplit;
    }

    if (cleaned.length > 220) {
      return cleaned
        .split(/\.\s+(?=[A-Z])/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => (line.endsWith(".") ? line : `${line}.`));
    }

    return [cleaned];
  });
}

function normalizeSectionEntry(value: string, targetCountry: CountryValue): string {
  const cleaned = normalizeDateText(value, targetCountry)
    .replace(
      /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4} - (?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4}|Present)|\d{4} - (?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4}|Present)) - (?=[A-Z])/g,
      "$1\n- "
    )
    .replace(
      /\b([A-Za-z]+)\n-\s*([A-Za-z]+)\b/g,
      (_match, firstPart: string, secondPart: string) => `${firstPart}-${secondPart}`
    )
    .replace(/\b([A-Za-z]+)\s+-\s+([a-z]{2,})\b/g, "$1-$2")
    .replace(
      /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4})\n-\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4}|Present)\b/g,
      "$1 - $2"
    )
    .replace(/(^|\n)[•]\s+/g, "$1- ")
    .replace(/(^|\n)-\s+/g, "$1- ");

  return cleaned;
}

function normalizeSectionEntries(values: string[], targetCountry: CountryValue): string[] {
  return dedupeStrings(values.map((value) => normalizeSectionEntry(value, targetCountry)));
}

function normalizeExperienceBullet(value: string, targetCountry: CountryValue): string {
  return normalizeSectionEntry(value, targetCountry)
    .replace(/^[•-]\s*/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeExperienceBullets(values: string[], targetCountry: CountryValue): string[] {
  return dedupeStrings(
    splitBulletCandidates(values).map((value) => normalizeExperienceBullet(value, targetCountry))
  )
    .filter(Boolean)
    .slice(0, 6);
}

function extractDateParts(
  value: string,
  targetCountry: CountryValue
): { startDate: string; endDate: string; textWithoutDates: string } {
  const normalized = normalizeDateText(value, targetCountry);
  const datePattern =
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4}) - ((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}|\d{4}|Present)/;
  const match = normalized.match(datePattern);

  if (!match || match.index === undefined) {
    return {
      startDate: "",
      endDate: "",
      textWithoutDates: normalized
    };
  }

  const textWithoutDates = `${normalized.slice(0, match.index)} ${normalized.slice(
    match.index + match[0].length
  )}`.replace(/\s{2,}/g, " ").trim();

  return {
    startDate: match[1] ?? "",
    endDate: match[2] ?? "",
    textWithoutDates
  };
}

function parseExperienceHeader(
  value: string
): Pick<ConvertedCvStructuredExperience, "title" | "company" | "location"> {
  const normalized = repairTextArtifacts(value);
  const pipeSegments = normalized
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (pipeSegments.length >= 2) {
    return {
      title: pipeSegments[0] ?? "",
      company: pipeSegments[1] ?? "",
      location: pipeSegments[2] ?? ""
    };
  }

  if (normalized.includes(" at ")) {
    const [title, company] = normalized.split(/\sat\s/i);

    return {
      title: title?.trim() ?? "",
      company: company?.trim() ?? "",
      location: ""
    };
  }

  return {
    title: normalized,
    company: "",
    location: ""
  };
}

function normalizeExperienceItem(
  experience: ConvertedCvStructuredExperience,
  targetCountry: CountryValue
): ConvertedCvStructuredExperience | null {
  const title = repairTextArtifacts(experience.title);
  const company = repairTextArtifacts(experience.company);
  const location = repairTextArtifacts(experience.location);
  const startDate = normalizeDateText(experience.startDate, targetCountry);
  const endDate = normalizeDateText(experience.endDate, targetCountry);
  const bullets = normalizeExperienceBullets(experience.bullets, targetCountry);

  if (!title && !company && bullets.length === 0) {
    return null;
  }

  return {
    title,
    company,
    location,
    startDate,
    endDate,
    bullets
  };
}

function buildFallbackExperience(
  structuredCv: StructuredCvData,
  targetCountry: CountryValue
): ConvertedCvStructuredExperience[] {
  return structuredCv.experience
    .map((entry) => {
      const { startDate, endDate, textWithoutDates } = extractDateParts(entry, targetCountry);
      const parsedHeader = parseExperienceHeader(textWithoutDates);
      const bulletSource = textWithoutDates
        .replace(parsedHeader.title, "")
        .replace(parsedHeader.company, "")
        .replace(parsedHeader.location, "")
        .replace(/\|/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
      const normalizedEntry = normalizeExperienceItem(
        {
          title: parsedHeader.title,
          company: parsedHeader.company,
          location: parsedHeader.location,
          startDate,
          endDate,
          bullets: bulletSource ? [bulletSource] : []
        },
        targetCountry
      );

      return normalizedEntry;
    })
    .filter((entry): entry is ConvertedCvStructuredExperience => entry !== null);
}

function normalizeExperience(
  experiences: ConvertedCvStructuredExperience[],
  structuredCv: StructuredCvData,
  targetCountry: CountryValue
): ConvertedCvStructuredExperience[] {
  const normalized = experiences
    .map((experience) => normalizeExperienceItem(experience, targetCountry))
    .filter((experience): experience is ConvertedCvStructuredExperience => experience !== null);

  return normalized.length > 0 ? normalized : buildFallbackExperience(structuredCv, targetCountry);
}

function normalizeSkills(values: string[]): string[] {
  return dedupeStrings(values.map((value) => repairTextArtifacts(value))).slice(0, 24);
}

function buildFallbackExtraSections(
  structuredCv: StructuredCvData,
  targetCountry: CountryValue
): ConvertedCvStructuredExtraSection[] {
  const sections: ConvertedCvStructuredExtraSection[] = [];

  if (structuredCv.certifications.length > 0) {
    sections.push({
      title: "Certifications",
      items: normalizeSectionEntries(structuredCv.certifications, targetCountry)
    });
  }

  if (structuredCv.languages.length > 0) {
    sections.push({
      title: "Languages",
      items: normalizeSectionEntries(structuredCv.languages, targetCountry)
    });
  }

  if (structuredCv.projects.length > 0) {
    sections.push({
      title: "Projects",
      items: normalizeSectionEntries(structuredCv.projects, targetCountry)
    });
  }

  sections.push(
    ...structuredCv.otherSections
      .filter((section) => section.entries.length > 0)
      .map((section) => ({
        title: repairTextArtifacts(section.title),
        items: normalizeSectionEntries(section.entries, targetCountry)
      }))
  );

  return sections.filter((section) => section.items.length > 0);
}

function normalizeExtraSections(
  sections: ConvertedCvStructuredExtraSection[],
  structuredCv: StructuredCvData,
  targetCountry: CountryValue
): ConvertedCvStructuredExtraSection[] {
  const normalizedSections = sections
    .map((section) => ({
      title: repairTextArtifacts(section.title),
      items: normalizeSectionEntries(section.items, targetCountry)
    }))
    .filter((section) => section.title.length > 0 && section.items.length > 0);

  return normalizedSections.length > 0
    ? normalizedSections
    : buildFallbackExtraSections(structuredCv, targetCountry);
}

function normalizeContact(contact: ConvertedCvStructuredContact): ConvertedCvStructuredContact {
  return {
    email: normalizeContactField(contact.email, "email"),
    phone: normalizeContactField(contact.phone, "phone"),
    location: normalizeContactField(contact.location, "text"),
    linkedin: normalizeContactField(contact.linkedin, "text"),
    github: normalizeContactField(contact.github, "text"),
    other: dedupeStrings(contact.other.map((value) => repairTextArtifacts(value)))
  };
}

export function normalizeConvertedCv({
  convertedCv,
  structuredCv,
  targetCountry
}: NormalizeConvertedCvInput): ConvertedCvData {
  const contact = normalizeContact(convertedCv.contact);
  const contactLineItems = buildContactLineItems(contact);

  return {
    name: repairTextArtifacts(convertedCv.name || structuredCv.fullName || ""),
    headline: normalizeHeadline(convertedCv.headline, structuredCv),
    contact,
    contactLineItems,
    summary: normalizeSummary(convertedCv.summary || structuredCv.summary || ""),
    experience: normalizeExperience(convertedCv.experience, structuredCv, targetCountry),
    education: normalizeSectionEntries(convertedCv.education, targetCountry).length > 0
      ? normalizeSectionEntries(convertedCv.education, targetCountry)
      : normalizeSectionEntries(structuredCv.education, targetCountry),
    skills: normalizeSkills(convertedCv.skills).length > 0
      ? normalizeSkills(convertedCv.skills)
      : normalizeSkills(structuredCv.skills),
    extraSections: normalizeExtraSections(convertedCv.extraSections, structuredCv, targetCountry)
  };
}
