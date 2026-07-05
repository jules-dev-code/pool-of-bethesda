import { Section, SectionHeader } from "@/components/layout/section";
import { StaggerContainer, StaggerItem } from "@/components/layout/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { SERVICES } from "@/lib/data/services";
import type { Locale } from "@/lib/types";

interface ServicesGridProps {
  locale: Locale;
  title: string;
  ctaLabel: string;
  limit?: number;
}

export function ServicesGrid({ locale, title, ctaLabel, limit }: ServicesGridProps) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <Section>
      <SectionHeader eyebrow={locale === "fr" ? "Nos soins" : "Our care"} title={title} />
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.slug}>
            <ServiceCard
              locale={locale}
              slug={service.slug}
              icon={service.icon}
              title={locale === "fr" ? service.titleFr : service.titleEn}
              description={locale === "fr" ? service.shortFr : service.shortEn}
              duration={service.duration}
              ctaLabel={ctaLabel}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
