import type { ConvertedCvExperience } from "@/lib/convert";

function normalizeRenderText(value: string): string {
  return value.trim();
}

export function formatExperienceDateRange(
  startDate: string,
  endDate: string
): string {
  const start = normalizeRenderText(startDate);
  const end = normalizeRenderText(endDate);

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end;
}

export function formatExperienceHeading(experience: ConvertedCvExperience): string {
  const title = normalizeRenderText(experience.title);
  const company = normalizeRenderText(experience.company);
  const location = normalizeRenderText(experience.location);
  const dateRange = formatExperienceDateRange(experience.startDate, experience.endDate);
  const organizationLine = [company, location].filter(Boolean).join(", ");

  if (title && organizationLine && dateRange) {
    return `${title} — ${organizationLine} (${dateRange})`;
  }

  if (title && organizationLine) {
    return `${title} — ${organizationLine}`;
  }

  if (title && dateRange) {
    return `${title} (${dateRange})`;
  }

  if (organizationLine && dateRange) {
    return `${organizationLine} (${dateRange})`;
  }

  return title || organizationLine || dateRange;
}
