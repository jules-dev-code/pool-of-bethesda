"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/types";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Retire un éventuel préfixe /en existant pour reconstruire les deux liens
  const basePath = pathname.startsWith("/en")
    ? pathname.replace(/^\/en/, "") || "/"
    : pathname;

  const frHref = basePath;
  const enHref = basePath === "/" ? "/en" : `/en${basePath}`;

  return (
    <div className="flex items-center rounded-full border border-border p-0.5 text-xs font-heading font-semibold">
      <Link
        href={frHref}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "fr"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        )}
      >
        FR
      </Link>
      <Link
        href={enHref}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        )}
      >
        EN
      </Link>
    </div>
  );
}
