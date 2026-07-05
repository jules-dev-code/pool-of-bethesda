"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

interface ServiceCardProps {
  locale: Locale;
  slug: string;
  icon: string;
  title: string;
  description: string;
  duration: number;
  ctaLabel: string;
}

export function ServiceCard({
  locale,
  slug,
  icon,
  title,
  description,
  duration,
  ctaLabel,
}: ServiceCardProps) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] ?? Icons.Stethoscope;
  const detailHref = locale === "fr" ? `/services/${slug}` : `/en/services/${slug}`;
  const bookHref = locale === "fr" ? `/booking?service=${slug}` : `/en/booking?service=${slug}`;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-premium transition-shadow duration-300 hover:shadow-elevated"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>

      <h3 className="mt-5 font-heading text-xl font-semibold text-primary-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {duration} min
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={detailHref}
          className="flex items-center gap-1 text-sm font-heading font-medium text-primary transition-transform group-hover:translate-x-1"
        >
          {locale === "fr" ? "En savoir plus" : "Learn more"}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Button asChild size="sm">
          <Link href={bookHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </motion.div>
  );
}
