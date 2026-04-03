"use client";

import type { ReactNode } from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import type { ConvertedCvData, ConvertedCvExperience } from "@/lib/convert";
import { formatExperienceHeading } from "@/lib/format-converted-cv";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 10.5,
    lineHeight: 1.45,
    paddingHorizontal: 42,
    paddingVertical: 40
  },
  header: {
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 1,
    marginBottom: 18,
    paddingBottom: 16
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 6
  },
  headline: {
    fontSize: 11.5,
    color: "#374151",
    marginBottom: 8
  },
  contactLine: {
    fontSize: 10,
    color: "#1f2937"
  },
  section: {
    marginTop: 14
  },
  sectionTitle: {
    borderBottomColor: "#111827",
    borderBottomWidth: 1,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.6,
    marginBottom: 8,
    paddingBottom: 4,
    textTransform: "uppercase"
  },
  paragraph: {
    marginBottom: 8
  },
  listItem: {
    marginBottom: 7
  },
  experienceItem: {
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 8
  },
  entryHeading: {
    fontSize: 10.5,
    fontWeight: 700,
    marginBottom: 2
  },
  entryDetail: {
    marginBottom: 2
  },
  bulletRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 3
  },
  bulletMarker: {
    width: 10
  },
  bulletText: {
    flex: 1
  },
  skillLine: {
    marginBottom: 4
  },
  watermark: {
    bottom: 18,
    color: "#94a3b8",
    fontSize: 8.5,
    left: 42,
    position: "absolute",
    right: 42,
    textAlign: "center"
  }
});

interface ConvertedCvPdfDocumentProps {
  convertedCv: ConvertedCvData;
  countryLabel: string;
  outputLanguageLabel: string;
  watermarkText?: string;
}

function PdfSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function PdfEntryList({
  items
}: {
  items: string[];
}) {
  return (
    <View>
      {items.map((item, index) => {
        const lines = item.split("\n").map((line) => line.trim()).filter(Boolean);
        const [heading, ...details] = lines;

        return (
          <View key={`${index}-${item.slice(0, 24)}`} style={styles.listItem}>
            {heading ? <Text style={styles.entryHeading}>{heading}</Text> : null}
            {details.map((detail, detailIndex) => (
              <Text key={`${index}-${detailIndex}`} style={styles.entryDetail}>
                {detail}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
  );
}

function PdfExperienceList({
  items
}: {
  items: ConvertedCvExperience[];
}) {
  return (
    <View>
      {items.map((experience, index) => {
        const heading = formatExperienceHeading(experience);

        return (
          <View
            key={`${heading}-${index}`}
            style={index === items.length - 1 ? undefined : styles.experienceItem}
          >
            <Text style={styles.entryHeading}>{heading}</Text>
            {experience.bullets.map((bullet, bulletIndex) => (
              <View key={`${heading}-${bulletIndex}`} style={styles.bulletRow}>
                <Text style={styles.bulletMarker}>-</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

function PdfListSection({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <PdfSection title={title}>
      <PdfEntryList items={items} />
    </PdfSection>
  );
}

function PdfExperienceSection({
  items
}: {
  items: ConvertedCvExperience[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <PdfSection title="Experience">
      <PdfExperienceList items={items} />
    </PdfSection>
  );
}

export function ConvertedCvPdfDocument({
  convertedCv,
  countryLabel,
  outputLanguageLabel,
  watermarkText
}: ConvertedCvPdfDocumentProps) {
  const contactItems = convertedCv.contactLineItems;

  return (
    <Document
      author="CVConverterPro"
      creator="CVConverterPro"
      title={`${convertedCv.name || "Converted CV"} - ${countryLabel} - ${outputLanguageLabel}`}
      subject={`Country-adapted CV for ${countryLabel} in ${outputLanguageLabel}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{convertedCv.name || "Converted CV"}</Text>
          {convertedCv.headline ? <Text style={styles.headline}>{convertedCv.headline}</Text> : null}
          {contactItems.length > 0 ? (
            <Text style={styles.contactLine}>{contactItems.join(" | ")}</Text>
          ) : null}
        </View>

        {convertedCv.summary ? (
          <PdfSection title="Summary">
            <Text style={styles.paragraph}>{convertedCv.summary}</Text>
          </PdfSection>
        ) : null}

        <PdfExperienceSection items={convertedCv.experience} />
        <PdfListSection title="Education" items={convertedCv.education} />

        {convertedCv.skills.length > 0 ? (
          <PdfSection title="Skills">
            <Text style={styles.skillLine}>{convertedCv.skills.join(", ")}</Text>
          </PdfSection>
        ) : null}

        {convertedCv.extraSections.map((section, index) =>
          section.items.length > 0 ? (
            <PdfListSection
              key={`${section.title}-${index}`}
              title={section.title}
              items={section.items}
            />
          ) : null
        )}

        {watermarkText ? <Text style={styles.watermark}>{watermarkText}</Text> : null}
      </Page>
    </Document>
  );
}
