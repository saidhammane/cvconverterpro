import { z } from "zod";

export const convertedCvSchemaName = "country_converted_cv";

export const convertedCvContactSchema = z
  .object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
    github: z.string(),
    other: z.array(z.string())
  })
  .strict();

export const convertedCvExtraSectionSchema = z
  .object({
    title: z.string(),
    items: z.array(z.string())
  })
  .strict();

export const convertedCvExperienceSchema = z
  .object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    bullets: z.array(z.string())
  })
  .strict();

export const convertedCvSchema = z
  .object({
    name: z.string(),
    headline: z.string(),
    contact: convertedCvContactSchema,
    summary: z.string(),
    experience: z.array(convertedCvExperienceSchema),
    education: z.array(z.string()),
    skills: z.array(z.string()),
    extraSections: z.array(convertedCvExtraSectionSchema),
    atsScore: z.number().min(0).max(100),
    atsFeedback: z.array(z.string()),
    atsStrengths: z.array(z.string()),
    atsWeaknesses: z.array(z.string())
  })
  .strict();

export type ConvertedCvStructuredContact = z.infer<typeof convertedCvContactSchema>;
export type ConvertedCvStructuredExtraSection = z.infer<typeof convertedCvExtraSectionSchema>;
export type ConvertedCvStructuredExperience = z.infer<typeof convertedCvExperienceSchema>;
export type ConvertedCvStructuredOutput = z.infer<typeof convertedCvSchema>;
