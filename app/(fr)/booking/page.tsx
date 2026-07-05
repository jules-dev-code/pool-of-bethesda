import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/layout/reveal";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Réservez votre rendez-vous en ligne au Cabinet Dentaire Pool of Bethesa en quelques clics.",
};

export default function BookingPage() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white pb-24 pt-40 dark:from-primary-900 dark:to-primary-950">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
            Réservation
          </span>
          <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
            Prendre rendez-vous
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground">
            Choisissez votre soin, votre créneau, et recevez une confirmation
            instantanée par email.
          </p>
        </Reveal>

        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl space-y-4">
              <Skeleton className="h-10 w-full rounded-full" />
              <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
          }
        >
          <BookingWizard locale="fr" />
        </Suspense>
      </div>
    </section>
  );
}
