import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = ["/", "/about", "/contact", "/convert", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
