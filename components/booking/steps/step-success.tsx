"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";

interface StepSuccessProps {
  locale: Locale;
}

const LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    title: "Rendez-vous confirmé !",
    description:
      "Un email de confirmation vous a été envoyé avec tous les détails. Le cabinet vous contactera si nécessaire.",
    backHome: "Retour à l'accueil",
    viewServices: "Découvrir nos services",
  },
  en: {
    title: "Appointment confirmed!",
    description:
      "A confirmation email has been sent to you with all the details. The clinic will contact you if needed.",
    backHome: "Back to home",
    viewServices: "Discover our services",
  },
};

export function StepSuccess({ locale }: StepSuccessProps) {
  const t = LABELS[locale];
  const homeHref = locale === "fr" ? "/" : "/en";
  const servicesHref = locale === "fr" ? "/services" : "/en/services";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-600" strokeWidth={1.5} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 font-display text-2xl font-semibold text-primary-950 dark:text-white"
      >
        {t.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        {t.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Button asChild size="lg">
          <Link href={homeHref}>{t.backHome}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={servicesHref}>{t.viewServices}</Link>
        </Button>
      </motion.div>
    </div>
  );
}
