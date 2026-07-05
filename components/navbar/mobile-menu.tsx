"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  bookLabel: string;
  bookHref: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  links,
  bookLabel,
  bookHref,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-white dark:bg-primary-950 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-display text-lg font-semibold text-primary">
              Pool of Bethesa
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="rounded-full p-2 hover:bg-primary/5"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-heading text-2xl font-medium text-primary-950 dark:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <Button asChild size="lg" className="w-full">
              <Link href={bookHref} onClick={onClose}>
                {bookLabel}
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
