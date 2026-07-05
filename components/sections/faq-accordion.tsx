import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { FAQS } from "@/lib/data/faq";
import type { Locale } from "@/lib/types";

interface FaqSectionProps {
  locale: Locale;
  title: string;
  limit?: number;
}

export function FaqSection({ locale, title, limit }: FaqSectionProps) {
  const faqs = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <Section>
      <SectionHeader title={title} />
      <div className="mx-auto max-w-2xl space-y-3">
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>
                  {locale === "fr" ? faq.questionFr : faq.questionEn}
                </AccordionTrigger>
                <AccordionContent>
                  {locale === "fr" ? faq.answerFr : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
