"use client";

import type { ReactNode } from "react";
import type { ConvertedCvData, ConvertedCvExperience } from "@/lib/convert";
import { formatExperienceHeading } from "@/lib/format-converted-cv";

interface ConvertedCvPreviewProps {
  convertedCv?: ConvertedCvData | null;
}

function PreviewSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="border-b border-slate-900 pb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function PreviewEntryList({
  entries
}: {
  entries: string[];
}) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const lines = entry.split("\n").map((line) => line.trim()).filter(Boolean);
        const [heading, ...details] = lines;

        return (
          <article key={entry} className="space-y-1.5">
            {heading ? <p className="font-semibold text-slate-950">{heading}</p> : null}
            {details.map((detail) => (
              <p key={`${entry}-${detail}`} className="text-slate-700">
                {detail}
              </p>
            ))}
          </article>
        );
      })}
    </div>
  );
}

function ExperienceList({
  experiences
}: {
  experiences: ConvertedCvExperience[];
}) {
  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => {
        const heading = formatExperienceHeading(experience);

        return (
          <article
            key={`${heading}-${index}`}
            className="space-y-3 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0"
          >
            <p className="font-semibold text-slate-950">{heading}</p>
            <ul className="space-y-2">
              {experience.bullets.map((bullet) => (
                <li key={`${heading}-${bullet}`} className="flex gap-3 text-slate-700">
                  <span className="mt-[1px] text-slate-950">-</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export function ConvertedCvPreview({ convertedCv }: ConvertedCvPreviewProps) {
  if (!convertedCv) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 text-sm leading-7 text-slate-600 shadow-soft sm:px-8 sm:py-9">
        Converted CV preview will appear here after a successful conversion.
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 text-sm leading-7 text-slate-800 shadow-soft sm:px-8 sm:py-9">
      <header className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          {convertedCv.name || "Converted CV"}
        </h2>
        {convertedCv.headline ? (
          <p className="mt-2 text-base font-medium text-slate-700">{convertedCv.headline}</p>
        ) : null}
        {convertedCv.contactLineItems.length > 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            {convertedCv.contactLineItems.join(" | ")}
          </p>
        ) : null}
      </header>

      {convertedCv.summary ? (
        <PreviewSection title="Summary">
          <p>{convertedCv.summary}</p>
        </PreviewSection>
      ) : null}

      {convertedCv.experience.length > 0 ? (
        <PreviewSection title="Experience">
          <ExperienceList experiences={convertedCv.experience} />
        </PreviewSection>
      ) : null}

      {convertedCv.education.length > 0 ? (
        <PreviewSection title="Education">
          <PreviewEntryList entries={convertedCv.education} />
        </PreviewSection>
      ) : null}

      {convertedCv.skills.length > 0 ? (
        <PreviewSection title="Skills">
          <p>{convertedCv.skills.join(", ")}</p>
        </PreviewSection>
      ) : null}

      {convertedCv.extraSections.map((section) => (
        <PreviewSection key={section.title} title={section.title}>
          <PreviewEntryList entries={section.items} />
        </PreviewSection>
      ))}
    </div>
  );
}
