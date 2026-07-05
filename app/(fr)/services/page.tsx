import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import { Reveal } from "@/components/layout/reveal";
import { StaggerContainer, StaggerItem } from "@/components/layout/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaSection } from "@/components/sections/cta";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Consultation, détartrage, extraction, soins conservateurs et prothèses dentaires au Cabinet Dentaire Pool of Bethesa à Douala.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container text-center">
          <Reveal>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Nos soins
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              Des soins dentaires pour toute la famille
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Découvrez l'ensemble de nos services, réalisés avec précision et
              bienveillance par une équipe expérimentée.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container pb-24">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard
                locale="fr"
                slug={service.slug}
                icon={service.icon}
                title={service.titleFr}
                description={service.shortFr}
                duration={service.duration}
                ctaLabel="Prendre rendez-vous"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <CtaSection
        locale="fr"
        title="Votre sourire commence aujourd'hui."
        buttonLabel="Prendre rendez-vous"
      />
    </>
  );
}
