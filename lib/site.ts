import type { Metadata } from "next";
import { countryOptions } from "@/lib/convert";

export const siteConfig = {
  name: "CVConverterPro",
  description:
    "Convert resumes and CVs into country-ready formats for Canada, Germany, Australia, the USA, the UK, and France.",
  url: "http://localhost:3000"
} as const;

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" }
];

export const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" }
];

export const supportedCountries = countryOptions.map((country) => country.label);

export const howItWorksSteps = [
  {
    title: "Upload your CV",
    description: "Bring your existing resume into the app so the conversion flow has a starting point."
  },
  {
    title: "Choose a country",
    description: "Pick the market you are targeting so the formatting can match local expectations."
  },
  {
    title: "Download your converted resume",
    description: "Export a cleaner version of your CV once the conversion experience is implemented."
  }
];

export function buildMetadata(title: string, description: string, pathname: string): Metadata {
  const fullTitle = title === siteConfig.name ? siteConfig.name : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pathname
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.svg"]
    }
  };
}
