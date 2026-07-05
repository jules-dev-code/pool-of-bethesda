"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/layout/reveal";
import { SERVICES } from "@/lib/data/services";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface StepServiceProps {
  locale: Locale;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function StepService({ locale, selectedSlug, onSelect }: StepServiceProps) {
  return (
    <StaggerContainer className="grid gap-4 sm:grid-cols-2">
      {SERVICES.map((service) => {
        const Icon =
          (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ??
          Icons.Stethoscope;
        const isSelected = selectedSlug === service.slug;

        return (
          <StaggerItem key={service.slug}>
            <motion.button
              type="button"
              onClick={() => onSelect(service.slug)}
              whileHover={{ y: -4 }}
              className={cn(
                "flex w-full items-start gap-4 rounded-2xl border-2 bg-card p-5 text-left shadow-premium transition-all",
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                  isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                  {locale === "fr" ? service.titleFr : service.titleEn}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {locale === "fr" ? service.shortFr : service.shortEn}
                </p>
                <p className="mt-2 text-xs font-medium text-gold-dark">
                  {service.duration} min
                </p>
              </div>
            </motion.button>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
