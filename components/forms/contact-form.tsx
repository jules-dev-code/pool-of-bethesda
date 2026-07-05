"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendContactMessage } from "@/lib/actions/contact";
import type { Locale } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().min(8, "Numéro de téléphone invalide."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const LABELS: Record<
  Locale,
  {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successText: string;
  }
> = {
  fr: {
    name: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    message: "Votre message",
    submit: "Envoyer le message",
    submitting: "Envoi en cours...",
    successTitle: "Message envoyé !",
    successText: "Nous vous répondrons dans les plus brefs délais.",
  },
  en: {
    name: "Full name",
    email: "Email",
    phone: "Phone",
    message: "Your message",
    submit: "Send message",
    submitting: "Sending...",
    successTitle: "Message sent!",
    successText: "We'll get back to you as soon as possible.",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const t = LABELS[locale];
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    const result = await sendContactMessage(data, locale);
    if (result.success) {
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    } else {
      toast.error(result.message);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center shadow-premium"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="mt-4 font-heading text-lg font-semibold text-primary-950 dark:text-white">
          {t.successTitle}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.successText}</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-border bg-card p-7 shadow-premium md:p-8"
    >
      <div>
        <Label htmlFor="name">{t.name}</Label>
        <Input
          id="name"
          className="mt-1.5"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      <div>
        <Label htmlFor="message">{t.message}</Label>
        <Textarea
          id="message"
          className="mt-1.5"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          t.submit
        )}
      </Button>
    </form>
  );
}
