"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingInfoSchema, type BookingInfoValues } from "@/lib/validations/booking";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/lib/types";

interface StepInfoProps {
  locale: Locale;
  formId: string;
  defaultValues?: Partial<BookingInfoValues>;
  onSubmit: (values: BookingInfoValues) => void;
}

const LABELS: Record<Locale, Record<string, string>> = {
  fr: {
    name: "Nom complet",
    phone: "Téléphone",
    email: "Email",
    comments: "Commentaires (optionnel)",
    commentsPlaceholder: "Précisez toute information utile pour votre rendez-vous...",
  },
  en: {
    name: "Full name",
    phone: "Phone",
    email: "Email",
    comments: "Comments (optional)",
    commentsPlaceholder: "Add any useful information for your appointment...",
  },
};

export function StepInfo({ locale, formId, defaultValues, onSubmit }: StepInfoProps) {
  const t = LABELS[locale];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInfoValues>({
    resolver: zodResolver(bookingInfoSchema),
    defaultValues,
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-5"
    >
      <div>
        <Label htmlFor="patientName">{t.name}</Label>
        <Input
          id="patientName"
          className="mt-1.5"
          error={errors.patientName?.message}
          {...register("patientName")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            id="phone"
            type="tel"
            className="mt-1.5"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            className="mt-1.5"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="comments">{t.comments}</Label>
        <Textarea
          id="comments"
          placeholder={t.commentsPlaceholder}
          className="mt-1.5"
          error={errors.comments?.message}
          {...register("comments")}
        />
      </div>
    </form>
  );
}
