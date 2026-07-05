"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  locale: Locale;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  badges: string[];
  floatingCards: { trust: string; care: string; equipment: string };
}

export function Hero({
  locale,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  badges,
  floatingCards,
}: HeroProps) {
  const bookHref = locale === "fr" ? "/booking" : "/en/booking";
  const servicesHref = locale === "fr" ? "/services" : "/en/services";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pb-20 pt-40 dark:from-primary-900 dark:via-primary-950 dark:to-primary-950 md:pt-48">
      {/* Formes décoratives */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold/10 blur-3xl" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-2">
        {/* Colonne gauche */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-primary-950 dark:text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Button asChild size="lg">
                <Link href={bookHref}>{ctaPrimary}</Link>
              </Button>
            </motion.div>
            <Button asChild variant="outline" size="lg">
              <Link href={servicesHref}>{ctaSecondary}</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <Badge variant="outline">{badge}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Colonne droite */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-elevated">
            <Image
              src="/images/dr-myriam-hero.jpg"
              alt="Dr Myriam Kengne"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Cartes flottantes */}
          <motion.div
            className="absolute -left-6 top-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-elevated dark:bg-primary-800"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-xs font-heading font-medium">
              {floatingCards.trust}
            </span>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-elevated dark:bg-primary-800"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <HeartHandshake className="h-5 w-5 text-gold-dark" />
            <span className="text-xs font-heading font-medium">
              {floatingCards.care}
            </span>
          </motion.div>

          <motion.div
            className="absolute -left-4 bottom-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-elevated dark:bg-primary-800"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xs font-heading font-medium">
              {floatingCards.equipment}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
