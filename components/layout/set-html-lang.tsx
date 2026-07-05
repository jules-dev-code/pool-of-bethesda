"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/types";

/**
 * Le <html> unique de l'application est défini dans app/layout.tsx (racine).
 * Ce composant met à jour dynamiquement l'attribut lang selon le segment
 * de langue actif ((fr) ou en), pour l'accessibilité et le SEO.
 */
export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
