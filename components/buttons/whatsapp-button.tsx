"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Bonjour, je souhaite prendre rendez-vous au Cabinet Dentaire Pool of Bethesa."
  );

  return (
    <motion.a
      href={`https://wa.me/${CLINIC.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-elevated"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <MessageCircle className="relative h-7 w-7 text-white" fill="white" />
    </motion.a>
  );
}
