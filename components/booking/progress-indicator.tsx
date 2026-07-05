"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl items-center justify-between">
      {steps.map((label, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone || isActive ? "hsl(var(--primary))" : "transparent",
                }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-heading font-semibold transition-colors",
                  isDone || isActive
                    ? "border-primary text-white"
                    : "border-border text-muted-foreground"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
              <span
                className={cn(
                  "hidden text-[11px] font-heading font-medium sm:block",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 bg-border">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
