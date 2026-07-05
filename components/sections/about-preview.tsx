import { Reveal } from "@/components/layout/reveal";
import { Section } from "@/components/layout/section";
import { Quote } from "lucide-react";
import Image from "next/image";

interface AboutPreviewProps {
  title: string;
  description: string;
  quote: string;
}

export function AboutPreview({ title, description, quote }: AboutPreviewProps) {
  return (
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
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
            Chirurgien-dentiste
          </span>
          <h2 className="text-balance font-display text-3xl font-semibold text-primary-950 dark:text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-6">
            <Quote className="h-6 w-6 shrink-0 text-gold" />
            <p className="font-display text-lg italic text-primary-900 dark:text-primary-100">
              {quote}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
