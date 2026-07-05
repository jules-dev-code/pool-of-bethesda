import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import { Quote, Award, Heart, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { GallerySection } from "@/components/sections/gallery";
import { CtaSection } from "@/components/sections/cta";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la vision et la philosophie de soins du Cabinet Dentaire Pool of Bethesa.",
};

const TIMELINE = [
  { year: "2018", label: "Ouverture du cabinet à Douala" },
  { year: "2020", label: "Acquisition d'équipements de dernière génération" },
  { year: "2023", label: "Extension de l'équipe et des services proposés" },
  { year: "2026", label: "Lancement de la prise de rendez-vous en ligne" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container text-center">
          <Reveal>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Notre histoire
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              Rencontrez le Dr Myriam Kengne
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Une professionnelle passionnée, attentive et engagée à offrir
              des soins de qualité dans un environnement moderne.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-elevated">
              <Image
                src="/images/dr-myriam-about.jpg"
                alt="Dr Myriam Kengne"
                fill
                className="object-cover"
              />
            </div>

          <Reveal direction="right" delay={0.1}>
            <h2 className="font-display text-3xl font-semibold text-primary-950 dark:text-white">
              Notre philosophie de soins
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Chaque patient mérite une attention particulière. Au Cabinet
              Dentaire Pool of Bethesa, nous croyons qu'un soin dentaire de
              qualité repose autant sur l'expertise technique que sur
              l'écoute et l'empathie. Notre approche combine des équipements
              modernes, des protocoles d'hygiène stricts et une relation de
              confiance construite avec chaque patient.
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-6">
              <Quote className="h-6 w-6 shrink-0 text-gold" />
              <p className="font-display text-lg italic text-primary-900 dark:text-primary-100">
                Chaque sourire est unique. Notre mission est de lui redonner
                confiance et éclat.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeader
          eyebrow="Notre engagement"
          title="Vision & mission"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Award,
              title: "Notre vision",
              text: "Devenir la référence des soins dentaires modernes et humains à Douala.",
            },
            {
              icon: Heart,
              title: "Notre mission",
              text: "Offrir des soins accessibles, précis et bienveillants à chaque patient.",
            },
            {
              icon: Sparkles,
              title: "Notre promesse",
              text: "Un environnement moderne, hygiénique et rassurant à chaque visite.",
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
        <SectionHeader eyebrow="Parcours" title="Les grandes étapes du cabinet" />
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

      <GallerySection title="Notre cabinet en images" />

      <CtaSection
        locale="fr"
        title="Votre sourire commence aujourd'hui."
        buttonLabel="Prendre rendez-vous"
      />
    </>
  );
}
