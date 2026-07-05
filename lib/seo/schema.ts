import { CLINIC } from "@/lib/constants";
import { OPENING_HOURS } from "@/lib/constants";
import type { FaqData } from "@/lib/data/faq";
import type { ServiceData } from "@/lib/data/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pool-of-bethesda.com";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Schema.org Dentist / MedicalBusiness / LocalBusiness combiné.
 * À injecter une fois dans le layout racine (fr) et en.
 */
export function getDentistSchema() {
  const openingHoursSpecification = OPENING_HOURS.filter((h) => !h.isClosed).map(
    (h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAMES[h.dayOfWeek],
      opens: h.openTime,
      closes: h.closeTime,
    })
  );

  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    name: CLINIC.name,
    image: `${SITE_URL}/images/clinic-cover.jpg`,
    url: SITE_URL,
    telephone: CLINIC.phoneRaw,
    email: CLINIC.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quartier Non Glacé, lieu-dit ELF",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
    priceRange: "$$",
    openingHoursSpecification,
    sameAs: [],
  };
}

/**
 * Schema.org Organization - identité de la marque.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CLINIC.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CLINIC.phoneRaw,
      contactType: "customer service",
      email: CLINIC.email,
    },
  };
}

/**
 * Schema.org FAQPage - à injecter sur la page FAQ.
 */
export function getFaqSchema(faqs: FaqData[], locale: "fr" | "en" = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: locale === "fr" ? faq.questionFr : faq.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: locale === "fr" ? faq.answerFr : faq.answerEn,
      },
    })),
  };
}

/**
 * Schema.org BreadcrumbList - fil d'ariane pour une page donnée.
 */
export function getBreadcrumbSchema(
  items: { name: string; path: string }[],
  locale: "fr" | "en" = "fr"
) {
  const prefix = locale === "en" ? "/en" : "";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${prefix}${item.path}`,
    })),
  };
}

/**
 * Schema.org Service - pour une page de détail de service.
 */
export function getServiceSchema(service: ServiceData, locale: "fr" | "en" = "fr") {
  const prefix = locale === "en" ? "/en" : "";
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: locale === "fr" ? service.titleFr : service.titleEn,
    description: locale === "fr" ? service.descriptionFr : service.descriptionEn,
    url: `${SITE_URL}${prefix}/services/${service.slug}`,
    provider: {
      "@type": "Dentist",
      name: CLINIC.name,
    },
  };
}
