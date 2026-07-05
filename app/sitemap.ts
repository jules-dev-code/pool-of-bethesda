import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pool-of-bethesda.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/faq", "/contact", "/booking"];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    entries.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          fr: `${SITE_URL}${route}`,
          en: `${SITE_URL}/en${route}`,
        },
      },
    });
  }

  for (const service of SERVICES) {
    entries.push({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${SITE_URL}/services/${service.slug}`,
          en: `${SITE_URL}/en/services/${service.slug}`,
        },
      },
    });
  }

  return entries;
}
