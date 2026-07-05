"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface IconFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function IconFeatureCard({
  icon,
  title,
  description,
  className,
}: IconFeatureCardProps) {
  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[icon] ??
    Icons.Sparkles;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group rounded-2xl border border-border bg-card p-7 shadow-premium transition-shadow duration-300 hover:shadow-elevated",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-primary-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}