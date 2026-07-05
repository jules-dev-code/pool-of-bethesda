"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";

interface GalleryItem {
  id: string;
  label: string;
  image?: string; // si absent, affiche un placeholder
  span?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", label: "Salle d'accueil", span: "row-span-2" },
  { id: "2", label: "Fauteuil dentaire", image: "/images/clinic-chair.jpg" },
  { id: "3", label: "Équipements" },
  { id: "4", label: "Salle de soins", image: "/images/clinic-room.jpg", span: "row-span-2" },
  { id: "5", label: "Dr Myriam Kengne", image: "/images/dr-myriam-about.jpg" },
  { id: "6", label: "Le cabinet" },
];

interface GallerySectionProps {
  title: string;
}

export function GallerySection({ title }: GallerySectionProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <Section className="bg-secondary/40">
      <SectionHeader title={title} />

      <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setSelected(item)}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden rounded-2xl shadow-premium ${
              item.image ? "" : "bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-900"
            } ${item.span ?? ""}`}
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <span
                className={`font-heading text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 ${
                  item.image ? "text-white" : "text-primary-700 opacity-80 dark:text-primary-200"
                }`}
              >
                {item.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.image ? (
                <Image src={selected.image} alt={selected.label} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-xl text-primary-500">{selected.label}</span>
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-elevated"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}