import { User, Phone, Mail, Calendar, Clock, Wallet, MessageSquare } from "lucide-react";
import type { Locale, PaymentMethod } from "@/lib/types";
import type { ServiceData } from "@/lib/data/services";

interface StepSummaryProps {
  locale: Locale;
  service: ServiceData;
  date: Date;
  time: string;
  patientName: string;
  phone: string;
  email: string;
  comments?: string;
  paymentMethod: PaymentMethod;
}

const LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    title: "Résumé de votre rendez-vous",
    service: "Service",
    date: "Date",
    time: "Heure",
    name: "Nom",
    phone: "Téléphone",
    email: "Email",
    payment: "Paiement",
    comments: "Commentaires",
    onsite: "Sur place",
    orangeMoney: "Orange Money",
  },
  en: {
    title: "Appointment summary",
    service: "Service",
    date: "Date",
    time: "Time",
    name: "Name",
    phone: "Phone",
    email: "Email",
    payment: "Payment",
    comments: "Comments",
    onsite: "On site",
    orangeMoney: "Orange Money",
  },
};

export function StepSummary({
  locale,
  service,
  date,
  time,
  patientName,
  phone,
  email,
  comments,
  paymentMethod,
}: StepSummaryProps) {
  const t = LABELS[locale];
  const formattedDate = date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = [
    { icon: User, label: t.service, value: locale === "fr" ? service.titleFr : service.titleEn },
    { icon: Calendar, label: t.date, value: formattedDate },
    { icon: Clock, label: t.time, value: time },
    { icon: User, label: t.name, value: patientName },
    { icon: Phone, label: t.phone, value: phone },
    { icon: Mail, label: t.email, value: email },
    {
      icon: Wallet,
      label: t.payment,
      value: paymentMethod === "ORANGE_MONEY" ? t.orangeMoney : t.onsite,
    },
    ...(comments ? [{ icon: MessageSquare, label: t.comments, value: comments }] : []),
  ];

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-7 shadow-premium">
      <h3 className="mb-5 font-heading text-base font-semibold text-primary-950 dark:text-white">
        {t.title}
      </h3>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-muted-foreground">{row.label}</span>
              <span className="font-heading text-sm font-medium text-primary-950 dark:text-white">
                {row.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
