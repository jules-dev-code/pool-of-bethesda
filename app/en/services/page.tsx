import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import { Reveal, StaggerContainer, StaggerItem } from "@/components/layout/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaSection } from "@/components/sections/cta";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Consultation, scaling, extraction, restorative care and dental prosthetics at Pool of Bethesda Dental Clinic in Douala.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container text-center">
          <Reveal>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Our care
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              Dental care for the whole family
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Discover all our services, performed with precision and care
              by an experienced team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-24">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                locale="en"
                slug={service.slug}
                icon={service.icon}
                title={service.titleEn}
                description={service.shortEn}
                duration={service.duration}
                ctaLabel="Book an appointment"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <CtaSection
        locale="en"
        title="Your smile starts today."
        buttonLabel="Book an appointment"
      />
    </>
  );
}
