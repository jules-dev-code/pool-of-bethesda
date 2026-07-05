"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";
import type { Locale } from "@/lib/types";

interface CtaSectionProps {
  locale: Locale;
  title: string;
  buttonLabel: string;
}

export function CtaSection({ locale, title, buttonLabel }: CtaSectionProps) {
  const bookHref = locale === "fr" ? "/booking" : "/en/booking";

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-center text-white md:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />

      <div className="container relative">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <motion.div
            className="mt-8 inline-block"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Button asChild size="lg" variant="gold">
              <Link href={bookHref}>{buttonLabel}</Link>
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
