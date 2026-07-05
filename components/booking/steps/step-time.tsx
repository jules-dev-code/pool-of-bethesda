"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Locale, TimeSlot } from "@/lib/types";

interface StepTimeProps {
  locale: Locale;
  date: Date;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export function StepTime({ locale, date, selectedTime, onSelect }: StepTimeProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    const isoDate = date.toISOString().split("T")[0];

    fetch(`/api/appointments/availability?date=${isoDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch slots");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setSlots(data.slots ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">
          {locale === "fr" ? "Chargement des créneaux..." : "Loading slots..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-16 text-center text-sm text-destructive">
        {locale === "fr"
          ? "Impossible de charger les créneaux disponibles."
          : "Unable to load available slots."}
      </p>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        {locale === "fr"
          ? "Le cabinet est fermé ce jour-là. Merci de choisir une autre date."
          : "The clinic is closed this day. Please choose another date."}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {slots.map((slot) => (
          <motion.button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            whileHover={slot.available ? { scale: 1.05 } : undefined}
            whileTap={slot.available ? { scale: 0.95 } : undefined}
            className={cn(
              "rounded-xl border py-3 text-sm font-heading font-medium transition-colors",
              !slot.available &&
                "cursor-not-allowed border-border bg-muted text-muted-foreground/40 line-through",
              slot.available &&
                selectedTime !== slot.time &&
                "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
              selectedTime === slot.time &&
                "border-primary bg-primary text-white shadow-premium"
            )}
          >
            {slot.time}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
