"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/layout/reveal";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getFaqSchema } from "@/lib/seo/schema";
import { FAQS } from "@/lib/data/faq";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "general", label: "General" },
  { key: "soins", label: "Care" },
  { key: "rendez-vous", label: "Appointments" },
  { key: "paiement", label: "Payment" },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      const matchesCategory = category === "all" || f.category === category;
      const matchesQuery =
        query.trim() === "" ||
        f.questionEn.toLowerCase().includes(query.toLowerCase()) ||
        f.answerEn.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <JsonLd data={getFaqSchema(FAQS, "en")} />
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container text-center">
          <Reveal>
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Help
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              Frequently asked questions
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground">
              Find answers to the questions our patients ask most.
            </p>

            <div className="relative mx-auto mt-8 max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container pb-24">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`rounded-full px-4 py-2 text-sm font-heading font-medium transition-colors ${
                category === c.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-2xl">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {filtered.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.questionEn}</AccordionTrigger>
                  <AccordionContent>{faq.answerEn}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <CtaSection
        locale="en"
        title="Another question? Contact us."
        buttonLabel="Book an appointment"
      />
    </>
  );
}
