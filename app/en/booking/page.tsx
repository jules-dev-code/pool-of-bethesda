import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/layout/reveal";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Book your appointment online at Pool of Bethesda Dental Clinic in just a few clicks.",
};

export default function BookingPage() {
  return (
    <section className="bg-gradient-to-b from-primary-50 to-white pb-24 pt-40 dark:from-primary-900 dark:to-primary-950">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold-dark">
            Booking
          </span>
          <h1 className="text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
            Book an appointment
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground">
            Choose your care, your time slot, and get instant email
            confirmation.
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
          <BookingWizard locale="en" />
        </Suspense>
      </div>
    </section>
  );
}
