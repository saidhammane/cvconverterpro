import "server-only";

import type {
  MappingStatus,
  StructuredCvData,
  StructuredCvOtherSection
} from "@/lib/convert";

type KnownSectionKey =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "languages"
  | "projects";

interface SectionBlock {
  key: KnownSectionKey | "other";
  title: string;
  lines: string[];
}

const SECTION_LABELS: Record<KnownSectionKey, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  languages: "Languages",
  projects: "Projects"
};

const CORE_SECTION_LABELS = ["Summary", "Experience", "Education", "Skills"];

const SECTION_PATTERNS: Record<KnownSectionKey, RegExp[]> = {
  summary: [
    /^(professional )?(summary|profile)$/i,
    /^(career )?objective$/i,
    /^personal statement$/i,
    /^about me$/i
  ],
  experience: [
    /^(professional )?(work )?experience$/i,
    /^(employment|work|career) history$/i
  ],
  education: [/^(education|academic background|education background)$/i],
  skills: [
    /^(technical |core )?skills$/i,
    /^core competencies$/i,
    /^competencies$/i,
    /^(skills|tools|technologies)( and (tools|technologies))?$/i
  ],
  certifications: [
    /^(certifications|certification|certificates|licenses)$/i,
    /^licenses and certifications$/i
  ],
  languages: [/^(languages|language skills|language proficiency)$/i],
  projects: [/^(projects|project experience|selected projects|personal projects)$/i]
};

const INLINE_SECTION_PATTERNS: Array<{ key: KnownSectionKey; pattern: RegExp }> = [
  {
    key: "summary",
    pattern:
      /^(professional summary|summary|profile|career objective|objective|personal statement)\s*[:\-]\s*(.+)$/i
  },
  {
    key: "skills",
    pattern: /^(technical skills|core skills|skills|core competencies)\s*[:\-]\s*(.+)$/i
  },
  {
    key: "languages",
    pattern: /^(languages|language skills|language proficiency)\s*[:\-]\s*(.+)$/i
  },
  {
    key: "certifications",
    pattern: /^(certifications|certification|certificates|licenses)\s*[:\-]\s*(.+)$/i
  },
  {
    key: "projects",
    pattern: /^(projects|selected projects|project experience)\s*[:\-]\s*(.+)$/i
  }
];

function normalizeHeadingCandidate(line: string): string {
  return line
    .replace(/\u2013|\u2014/g, "-")
    .replace(/[:|]/g, " ")
    .replace(/[^A-Za-z0-9À-ÿ&/+ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripBulletPrefix(line: string): string {
  return line.replace(/^[\s>*\-•]+/, "").replace(/^\d+[\).]\s+/, "").trim();
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function isBlank(line: string): boolean {
  return line.trim().length === 0;
}

function isLikelyContactLine(line: string): boolean {
  return (
    /@/.test(line) ||
    /linkedin\.com/i.test(line) ||
    /github\.com/i.test(line) ||
    /\+?\d[\d\s().-]{7,}\d/.test(line) ||
    line.includes("|")
  );
}

function isAllCaps(line: string): boolean {
  const alphaOnly = line.replace(/[^A-Za-z]/g, "");
  return alphaOnly.length > 1 && alphaOnly === alphaOnly.toUpperCase();
}

function isTitleCaseHeading(line: string): boolean {
  const words = line.split(/\s+/).filter(Boolean);

  if (words.length === 0 || words.length > 5) {
    return false;
  }

  return words.every((word) => /^[A-Z][A-Za-z&/-]*$/.test(word));
}

function detectKnownSection(line: string): KnownSectionKey | null {
  const normalizedLine = normalizeHeadingCandidate(line);

  for (const [section, patterns] of Object.entries(SECTION_PATTERNS) as Array<
    [KnownSectionKey, RegExp[]]
  >) {
    if (patterns.some((pattern) => pattern.test(normalizedLine))) {
      return section;
    }
  }

  return null;
}

function detectInlineSection(
  line: string
): { key: KnownSectionKey; title: string; content: string } | null {
  for (const definition of INLINE_SECTION_PATTERNS) {
    const match = line.match(definition.pattern);

    if (match && match[2]) {
      return {
        key: definition.key,
        title: match[1].trim(),
        content: match[2].trim()
      };
    }
  }

  return null;
}

function isGenericOtherHeading(lines: string[], index: number, hasSeenKnownSection: boolean): boolean {
  const line = lines[index];
  const previousLine = index > 0 ? lines[index - 1] : "";
  const nextNonEmptyLine = lines.slice(index + 1).find((candidate) => !isBlank(candidate));

  if (!hasSeenKnownSection || !line || !nextNonEmptyLine) {
    return false;
  }

  if (!isBlank(previousLine)) {
    return false;
  }

  if (isLikelyContactLine(line) || /\d/.test(line) || line.length > 40) {
    return false;
  }

  return line.endsWith(":") || isAllCaps(line) || isTitleCaseHeading(line);
}

function parseSectionBlocks(text: string): { preambleLines: string[]; blocks: SectionBlock[] } {
  const lines = text.replace(/\r\n?/g, "\n").split("\n").map((line) => line.trim());
  const preambleLines: string[] = [];
  const blocks: SectionBlock[] = [];
  let currentBlock: SectionBlock | null = null;
  let hasSeenKnownSection = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (isBlank(line)) {
      if (currentBlock) {
        currentBlock.lines.push("");
      } else {
        preambleLines.push("");
      }

      continue;
    }

    const inlineSection = detectInlineSection(line);
    const knownSection = inlineSection ? inlineSection.key : detectKnownSection(line);
    const genericOtherHeading = !inlineSection && !knownSection
      ? isGenericOtherHeading(lines, index, hasSeenKnownSection)
      : false;

    if (inlineSection || knownSection || genericOtherHeading) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }

      if (knownSection) {
        hasSeenKnownSection = true;
      }

      currentBlock = inlineSection
        ? {
            key: inlineSection.key,
            title: inlineSection.title,
            lines: inlineSection.content ? [inlineSection.content] : []
          }
        : {
            key: knownSection ?? "other",
            title: line.replace(/[:\s-]+$/, "").trim(),
            lines: []
          };

      continue;
    }

    if (currentBlock) {
      currentBlock.lines.push(line);
    } else {
      preambleLines.push(line);
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return { preambleLines, blocks };
}

function groupNonEmptyParagraphs(lines: string[]): string[][] {
  const groups: string[][] = [];
  let currentGroup: string[] = [];

  for (const line of lines) {
    if (isBlank(line)) {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
      }

      continue;
    }

    currentGroup.push(stripBulletPrefix(line));
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function joinParagraph(paragraph: string[]): string {
  return paragraph.join(" ").replace(/\s+/g, " ").trim();
}

function parseSectionEntries(lines: string[]): string[] {
  const paragraphs = groupNonEmptyParagraphs(lines);

  if (paragraphs.length > 1) {
    return uniqueStrings(
      paragraphs.map((paragraph) => joinParagraph(paragraph)).filter((paragraph) => paragraph.length > 0)
    );
  }

  const nonEmptyLines = lines.map(stripBulletPrefix).filter(Boolean);

  if (nonEmptyLines.length === 0) {
    return [];
  }

  if (nonEmptyLines.some((line) => /^[•\-*]/.test(line))) {
    return uniqueStrings(nonEmptyLines.map((line) => stripBulletPrefix(line)));
  }

  const groupedEntries: string[] = [];
  let currentEntry: string[] = [];

  for (const line of nonEmptyLines) {
    const isBoundary =
      currentEntry.length > 0 &&
      (/(\b(19|20)\d{2}\b|present|current)/i.test(line) || /^[A-Z][A-Za-z,&/()' -]{2,}$/.test(line));

    if (isBoundary) {
      groupedEntries.push(joinParagraph(currentEntry));
      currentEntry = [line];
      continue;
    }

    currentEntry.push(line);
  }

  if (currentEntry.length > 0) {
    groupedEntries.push(joinParagraph(currentEntry));
  }

  return uniqueStrings(groupedEntries.filter((entry) => entry.length > 0));
}

function parseTokenList(lines: string[]): string[] {
  const tokens: string[] = [];

  for (const line of lines) {
    const cleanedLine = stripBulletPrefix(line);

    if (!cleanedLine) {
      continue;
    }

    const splitValues = cleanedLine
      .split(/[|,;•]+/)
      .map((value) => value.trim())
      .filter(Boolean);

    if (splitValues.length > 1) {
      tokens.push(...splitValues);
      continue;
    }

    tokens.push(cleanedLine);
  }

  return uniqueStrings(tokens);
}

function extractFirstMatch(regex: RegExp, text: string): string | null {
  const match = text.match(regex);
  return match ? match[0].trim() : null;
}

function extractLocation(headerLines: string[], excludedLines: Set<string>): string | null {
  for (const line of headerLines) {
    if (excludedLines.has(line)) {
      continue;
    }

    if (isLikelyContactLine(line) || line.length > 80) {
      continue;
    }

    const wordCount = line.split(/\s+/).filter(Boolean).length;

    if (line.includes(",") || (wordCount >= 1 && wordCount <= 4)) {
      return line;
    }
  }

  return null;
}

function isLikelyNameLine(line: string): boolean {
  const words = line.split(/\s+/).filter(Boolean);

  if (
    words.length < 2 ||
    words.length > 5 ||
    /[\d@|:/]/.test(line) ||
    detectKnownSection(line) !== null ||
    isLikelyContactLine(line)
  ) {
    return false;
  }

  return words.every((word) => /^[A-Za-z][A-Za-z'’.-]*$/.test(word));
}

function extractHeaderParagraph(preambleLines: string[]): string[] {
  const paragraphs = groupNonEmptyParagraphs(preambleLines);
  return paragraphs[0] ?? [];
}

function inferHeadline(
  headerLines: string[],
  fullName: string | null,
  excludedLines: Set<string>
): string | null {
  const startIndex =
    fullName !== null ? headerLines.findIndex((line) => line === fullName) + 1 : 0;

  for (let index = startIndex; index < headerLines.length; index += 1) {
    const line = headerLines[index];

    if (excludedLines.has(line) || isLikelyContactLine(line) || detectKnownSection(line) !== null) {
      continue;
    }

    if (line.length >= 5 && line.length <= 100) {
      return line;
    }
  }

  return null;
}

function inferSummary(
  preambleLines: string[],
  detectedSummary: string | null,
  excludedLines: Set<string>
): string | null {
  if (detectedSummary) {
    return detectedSummary;
  }

  const paragraphs = groupNonEmptyParagraphs(preambleLines).slice(1);

  for (const paragraph of paragraphs) {
    const cleanedParagraph = paragraph.filter((line) => !excludedLines.has(line));
    const text = joinParagraph(cleanedParagraph);

    if (text.length >= 80 && !isLikelyContactLine(text)) {
      return text;
    }
  }

  return null;
}

function getSectionLines(blocks: SectionBlock[], key: KnownSectionKey): string[] {
  return blocks
    .filter((block) => block.key === key)
    .flatMap((block) => block.lines);
}

function buildOtherSections(blocks: SectionBlock[]): StructuredCvOtherSection[] {
  return blocks
    .filter((block) => block.key === "other")
    .map((block) => ({
      title: block.title,
      entries: parseSectionEntries(block.lines)
    }))
    .filter((section) => section.entries.length > 0);
}

function collectDetectedSections(data: StructuredCvData): string[] {
  const sections: string[] = [];

  if (data.summary) {
    sections.push("Summary");
  }

  if (data.experience.length > 0) {
    sections.push("Experience");
  }

  if (data.education.length > 0) {
    sections.push("Education");
  }

  if (data.skills.length > 0) {
    sections.push("Skills");
  }

  if (data.certifications.length > 0) {
    sections.push("Certifications");
  }

  if (data.languages.length > 0) {
    sections.push("Languages");
  }

  if (data.projects.length > 0) {
    sections.push("Projects");
  }

  sections.push(...data.otherSections.map((section) => section.title));

  return uniqueStrings(sections);
}

function calculateMappingStatus(data: StructuredCvData): MappingStatus {
  let signalCount = 0;

  if (data.fullName) {
    signalCount += 1;
  }

  if (data.email || data.phone) {
    signalCount += 1;
  }

  if (data.summary) {
    signalCount += 1;
  }

  if (data.experience.length > 0) {
    signalCount += 1;
  }

  if (data.education.length > 0) {
    signalCount += 1;
  }

  if (data.skills.length > 0) {
    signalCount += 1;
  }

  if (data.detectedSections.length >= 4) {
    signalCount += 1;
  }

  if (signalCount >= 6) {
    return "completed";
  }

  if (signalCount >= 3) {
    return "partial";
  }

  return "minimal";
}

function createEmptyStructuredCv(): StructuredCvData {
  return {
    fullName: null,
    headline: null,
    contact: [],
    email: null,
    phone: null,
    location: null,
    linkedin: null,
    github: null,
    summary: null,
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    projects: [],
    otherSections: [],
    mappingStatus: "minimal",
    detectedSections: [],
    missingLikelySections: [...CORE_SECTION_LABELS],
    mappingWarnings: []
  };
}

export function mapCvSections(extractedText: string): StructuredCvData {
  try {
    const { preambleLines, blocks } = parseSectionBlocks(extractedText);
    const headerLines = extractHeaderParagraph(preambleLines);
    const topBlockText = headerLines.join(" | ");
    const fullName = headerLines.find((line) => isLikelyNameLine(line)) ?? null;
    const excludedHeaderLines = new Set<string>();

    if (fullName) {
      excludedHeaderLines.add(fullName);
    }

    const email = extractFirstMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, topBlockText);
    const phone = extractFirstMatch(/\+?\d[\d\s().-]{7,}\d/g, topBlockText);
    const linkedin =
      extractFirstMatch(
        /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s|]+/gi,
        topBlockText
      ) ?? null;
    const github =
      extractFirstMatch(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s|]+/gi, topBlockText) ??
      null;
    const headline = inferHeadline(headerLines, fullName, excludedHeaderLines);

    if (headline) {
      excludedHeaderLines.add(headline);
    }

    const location = extractLocation(headerLines, excludedHeaderLines);

    if (location) {
      excludedHeaderLines.add(location);
    }

    const contact = headerLines.filter(
      (line) =>
        !excludedHeaderLines.has(line) &&
        (isLikelyContactLine(line) || line.includes(",") || line.includes("Remote"))
    );

    const summary = inferSummary(
      preambleLines,
      joinParagraph(getSectionLines(blocks, "summary").map(stripBulletPrefix).filter(Boolean)) || null,
      excludedHeaderLines
    );
    const experience = parseSectionEntries(getSectionLines(blocks, "experience"));
    const education = parseSectionEntries(getSectionLines(blocks, "education"));
    const skills = parseTokenList(getSectionLines(blocks, "skills"));
    const certifications = parseSectionEntries(getSectionLines(blocks, "certifications"));
    const languages = parseTokenList(getSectionLines(blocks, "languages"));
    const projects = parseSectionEntries(getSectionLines(blocks, "projects"));
    const otherSections = buildOtherSections(blocks);
    const structuredCv: StructuredCvData = {
      fullName,
      headline,
      contact,
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      experience,
      education,
      skills,
      certifications,
      languages,
      projects,
      otherSections,
      mappingStatus: "minimal",
      detectedSections: [],
      missingLikelySections: [],
      mappingWarnings: []
    };

    structuredCv.detectedSections = collectDetectedSections(structuredCv);
    structuredCv.missingLikelySections = CORE_SECTION_LABELS.filter(
      (sectionLabel) => !structuredCv.detectedSections.includes(sectionLabel)
    );
    structuredCv.mappingStatus = calculateMappingStatus(structuredCv);

    if (!structuredCv.fullName) {
      structuredCv.mappingWarnings.push("Full name was not confidently identified.");
    }

    if (!structuredCv.email && !structuredCv.phone) {
      structuredCv.mappingWarnings.push("Primary contact details were only partially detected.");
    }

    if (structuredCv.experience.length === 0) {
      structuredCv.mappingWarnings.push("Experience entries were not confidently segmented.");
    }

    if (structuredCv.education.length === 0) {
      structuredCv.mappingWarnings.push("Education entries were not confidently segmented.");
    }

    if (structuredCv.skills.length === 0) {
      structuredCv.mappingWarnings.push("Skills were not confidently identified.");
    }

    return structuredCv;
  } catch (error) {
    const fallback = createEmptyStructuredCv();
    fallback.mappingWarnings.push(
      "Section mapping fell back to a minimal structure because the extracted text could not be parsed confidently."
    );

    if (error instanceof Error && error.message) {
      fallback.mappingWarnings.push(`Mapper note: ${error.message}`);
    }

    return fallback;
  }
}
