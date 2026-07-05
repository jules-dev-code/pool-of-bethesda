"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-6 text-center dark:from-primary-900 dark:to-primary-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <SmilePlus className="h-12 w-12" strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-8 font-display text-3xl font-semibold text-primary-950 dark:text-white md:text-4xl"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mt-2 text-balance text-base text-muted-foreground"
      >
        Cette page n'existe pas. / This page does not exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Button asChild size="lg">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/en">Back to home (EN)</Link>
        </Button>
      </motion.div>
    </div>
  );
}
