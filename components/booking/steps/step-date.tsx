"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/types";

interface StepDateProps {
  locale: Locale;
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const WEEKDAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const WEEKDAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function StepDate({ locale, selectedDate, onSelect }: StepDateProps) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const weekdays = locale === "fr" ? WEEKDAYS_FR : WEEKDAYS_EN;
  const monthLabel = viewDate.toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { month: "long", year: "numeric" }
  );

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  // Lundi = 0 ... Dimanche = 6
  const firstDayOffset = (viewDate.getDay() + 6) % 7;

  const days: (Date | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      i + 1
    )),
  ];

  function goToPrevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function goToNextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-premium">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          type="button"
          aria-label="Mois précédent"
          className="rounded-full p-2 hover:bg-primary/5"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-heading text-sm font-semibold capitalize text-primary-950 dark:text-white">
          {monthLabel}
        </span>
        <button
          onClick={goToNextMonth}
          type="button"
          aria-label="Mois suivant"
          className="rounded-full p-2 hover:bg-primary/5"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((wd) => (
          <span key={wd} className="py-1 text-[11px] font-medium text-muted-foreground">
            {wd}
          </span>
        ))}

        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const isPast = day < today;
          const isSunday = day.getDay() === 0;
          const isDisabled = isPast || isSunday;
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, today);

          return (
            <motion.button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(day)}
              whileHover={!isDisabled ? { scale: 1.08 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                isDisabled && "cursor-not-allowed text-muted-foreground/30",
                !isDisabled && !isSelected && "hover:bg-primary/10",
                isToday && !isSelected && "border border-primary/40 font-semibold text-primary",
                isSelected && "bg-primary font-semibold text-white shadow-premium"
              )}
            >
              {day.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
