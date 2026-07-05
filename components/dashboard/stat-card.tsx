"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { AnimatedCounter } from "@/components/layout/animated-counter";
import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  accent?: "primary" | "gold" | "emerald" | "red";
}

const ACCENTS = {
  primary: "bg-primary/10 text-primary",
  gold: "bg-gold/10 text-gold-dark",
  emerald: "bg-emerald-100 text-emerald-600",
  red: "bg-red-100 text-red-600",
};

export function StatCard({ icon, label, value, accent = "primary" }: StatCardProps) {
  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] ?? Icons.Circle;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-premium transition-shadow hover:shadow-elevated"
    >
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", ACCENTS[accent])}>
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <p className="mt-4 font-display text-3xl font-semibold text-primary-950 dark:text-white">
        <AnimatedCounter value={value} duration={1.2} />
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}