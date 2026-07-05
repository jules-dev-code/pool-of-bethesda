"use client";

import { motion } from "framer-motion";
import { Banknote, Smartphone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ORANGE_MONEY } from "@/lib/constants";
import type { Locale, PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface StepPaymentProps {
  locale: Locale;
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    title: "Choisissez votre mode de paiement",
    onsite: "Paiement sur place",
    onsiteDesc: "Réglez directement au cabinet le jour de votre rendez-vous.",
    orangeMoney: "Orange Money",
    orangeMoneyDesc: "Effectuez votre paiement par mobile money.",
    number: "Numéro",
    name: "Nom",
    copied: "Copié !",
    note: "Le paiement n'est pas obligatoire pour confirmer votre rendez-vous.",
  },
  en: {
    title: "Choose your payment method",
    onsite: "Pay on site",
    onsiteDesc: "Pay directly at the clinic on the day of your appointment.",
    orangeMoney: "Orange Money",
    orangeMoneyDesc: "Pay via mobile money.",
    number: "Number",
    name: "Name",
    copied: "Copied!",
    note: "Payment is not required to confirm your appointment.",
  },
};

export function StepPayment({ locale, selected, onSelect }: StepPaymentProps) {
  const t = LABELS[locale];
  const [copied, setCopied] = useState(false);

  function copyNumber() {
    navigator.clipboard.writeText(ORANGE_MONEY.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="mb-5 text-center font-heading text-base font-semibold text-primary-950 dark:text-white">
        {t.title}
      </h3>

      <div className="space-y-4">
        {/* Option : Paiement sur place */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect("ONSITE")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect("ONSITE");
          }}
          className={cn(
            "flex w-full cursor-pointer items-start gap-4 rounded-2xl border-2 bg-card p-5 text-left shadow-premium transition-all",
            selected === "ONSITE"
              ? "border-primary ring-2 ring-primary/20"
              : "border-border hover:border-primary/40"
          )}
        >
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              selected === "ONSITE" ? "bg-primary text-white" : "bg-primary/10 text-primary"
            )}
          >
            <Banknote className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
              {t.onsite}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">{t.onsiteDesc}</p>
          </div>
        </div>

        {/* Option : Orange Money */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect("ORANGE_MONEY")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect("ORANGE_MONEY");
          }}
          className={cn(
            "flex w-full cursor-pointer items-start gap-4 rounded-2xl border-2 bg-card p-5 text-left shadow-premium transition-all",
            selected === "ORANGE_MONEY"
              ? "border-primary ring-2 ring-primary/20"
              : "border-border hover:border-primary/40"
          )}
        >
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              selected === "ORANGE_MONEY" ? "bg-primary text-white" : "bg-primary/10 text-primary"
            )}
          >
            <Smartphone className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h4 className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
              {t.orangeMoney}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">{t.orangeMoneyDesc}</p>

            {selected === "ORANGE_MONEY" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-2 rounded-xl bg-secondary/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.number}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold">
                      {ORANGE_MONEY.number}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyNumber();
                      }}
                      className="rounded-full p-1 hover:bg-primary/10"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.name}</span>
                  <span className="font-heading text-sm font-semibold">
                    {ORANGE_MONEY.name}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">{t.note}</p>
    </div>
  );
}