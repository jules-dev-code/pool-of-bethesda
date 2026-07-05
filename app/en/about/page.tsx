import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import { Quote, Award, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { GallerySection } from "@/components/sections/gallery";
import { CtaSection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story, vision and care philosophy of Pool of Bethesda Dental Clinic.",
};

const TIMELINE = [
  { year: "2018", label: "Clinic opened in Douala" },
  { year: "2020", label: "Acquisition of state-of-the-art equipment" },
  { year: "2023", label: "Team and services expansion" },
  { year: "2026", label: "Launch of online appointment booking" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container text-center">
          <Reveal>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Our story
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              Meet Dr. Myriam Kengne
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              A passionate, attentive professional committed to providing
              quality care in a modern environment.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-elevated">
              <Image
                src="/images/dr-myriam-about.jpg"
                alt="Dr Myriam Kengne"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <h2 className="font-display text-3xl font-semibold text-primary-950 dark:text-white">
              Our care philosophy
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Every patient deserves special attention. At Pool of Bethesda
              Dental Clinic, we believe quality dental care relies as much on
              technical expertise as on listening and empathy. Our approach
              combines modern equipment, strict hygiene protocols and a
              relationship of trust built with every patient.
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-6">
              <Quote className="h-6 w-6 shrink-0 text-gold" />
              <p className="font-display text-lg italic text-primary-900 dark:text-primary-100">
                Every smile is unique. Our mission is to restore its
                confidence and brightness.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader eyebrow="Our commitment" title="Vision & mission" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Award,
              title: "Our vision",
              text: "To become the reference for modern, human dental care in Douala.",
            },
            {
              icon: Heart,
              title: "Our mission",
              text: "Provide accessible, precise and caring treatment to every patient.",
            },
            {
              icon: Sparkles,
              title: "Our promise",
              text: "A modern, hygienic and reassuring environment on every visit.",
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <div className="rounded-2xl border border-border bg-card p-7 text-center shadow-premium">
                <item.icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 font-heading text-lg font-semibold text-primary-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Journey" title="Key milestones" />
        <div className="mx-auto max-w-2xl space-y-6">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.08}>
              <div className="flex items-center gap-6">
                <span className="w-20 shrink-0 font-display text-2xl font-semibold text-gold-dark">
                  {item.year}
                </span>
                <div className="h-px flex-1 bg-border" />
                <p className="flex-[2] text-sm text-muted-foreground">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <GallerySection title="Our clinic in pictures" />

      <CtaSection
        locale="en"
        title="Your smile starts today."
        buttonLabel="Book an appointment"
      />
    </>
  );
}
