"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface TestimonialsSectionProps {
  locale: Locale;
  title: string;
}

export function TestimonialsSection({ locale, title }: TestimonialsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi]);

  return (
    <Section>
      <SectionHeader title={title} />

      <div className="relative mx-auto max-w-3xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="min-w-0 flex-[0_0_100%] px-4">
                <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-premium md:p-12">
                  <Quote className="mx-auto h-8 w-8 text-gold" />
                  <p className="mt-5 text-balance font-display text-lg italic leading-relaxed text-primary-900 dark:text-primary-100 md:text-xl">
                    « {locale === "fr" ? t.commentFr : t.commentEn} »
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-3 font-heading text-sm font-semibold text-primary-950 dark:text-white">
                    {t.patient}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          aria-label="Précédent"
          className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 rounded-full border border-border bg-card p-2.5 shadow-premium transition-transform hover:scale-110 md:-translate-x-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Suivant"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 rounded-full border border-border bg-card p-2.5 shadow-premium transition-transform hover:scale-110 md:translate-x-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
