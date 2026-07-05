import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import messages from "@/messages/en.json";
import { Hero } from "@/components/sections/hero";
import { ValuesSection } from "@/components/sections/values";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { GallerySection } from "@/components/sections/gallery";
import { FaqSection } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: messages.metadata.title,
  description: messages.metadata.description,
};

export default function HomePage() {
  const t = messages;

  return (
    <>
      <Hero
        locale="en"
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        ctaPrimary={t.hero.ctaPrimary}
        ctaSecondary={t.hero.ctaSecondary}
        badges={t.hero.badges}
        floatingCards={t.hero.floatingCards}
      />
      <ValuesSection title={t.values.title} items={t.values.items} />
      <AboutPreview
        title={t.about.title}
        description={t.about.description}
        quote={t.about.quote}
      />
      <ServicesGrid locale="en" title={t.services.title} ctaLabel={t.services.cta} />
      <HowItWorks title={t.howItWorks.title} steps={t.howItWorks.steps} />
      <StatsSection
        title={t.stats.title}
        labels={{
          patients: t.stats.patients,
          appointments: t.stats.appointments,
          services: t.stats.services,
          days: t.stats.days,
        }}
      />
      <TestimonialsSection locale="en" title={t.testimonials.title} />
      <GallerySection title={t.gallery.title} />
      <FaqSection locale="en" title={t.faq.title} limit={5} />
      <CtaSection locale="en" title={t.cta.title} buttonLabel={t.cta.button} />
    </>
  );
}
