import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/layout/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez le Cabinet Dentaire Pool of Bethesa à Douala, Quartier Non Glacé, lieu-dit ELF.",
};

const SCHEDULE = [
  "Lundi – Mercredi : 09h00 – 18h00",
  "Jeudi : 11h00 – 18h00",
  "Vendredi : 09h00 – 18h00",
  "Samedi : 10h00 – 15h00",
  "Dimanche : Fermé",
];

export default function ContactPage() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white pb-24 pt-40 dark:from-primary-900 dark:to-primary-950">
      <div className="container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
            Nous contacter
          </span>
          <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
            Contactez-nous
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground">
            Une question, une urgence ou simplement envie d'échanger avec
            notre équipe ? Nous vous répondons rapidement.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="left">
            <ContactForm locale="fr" />
          </Reveal>

          <Reveal direction="right" delay={0.1} className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-premium">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                      Adresse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {CLINIC.address}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                      Téléphone
                    </p>
                    <p className="text-sm text-muted-foreground">{CLINIC.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                      Email
                    </p>
                    <p className="text-sm text-muted-foreground">{CLINIC.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                      Horaires d'ouverture
                    </p>
                    <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                      {SCHEDULE.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps — clé API à ajouter en Phase 6 */}
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-secondary/40 shadow-premium">
              <p className="text-sm text-muted-foreground">
                Carte Google Maps — Quartier Non Glacé, ELF, Douala
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
