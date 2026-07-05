"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/types";
import Image from "next/image";

interface NavbarProps {
  locale: Locale;
}

const NAV_LINKS: Record<Locale, { href: string; label: string }[]> = {
  fr: [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/services", label: "Services" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/about", label: "About" },
    { href: "/en/services", label: "Services" },
    { href: "/en/faq", label: "FAQ" },
    { href: "/en/contact", label: "Contact" },
  ],
};

const BOOK_HREF: Record<Locale, string> = {
  fr: "/booking",
  en: "/en/booking",
};

const BOOK_LABEL: Record<Locale, string> = {
  fr: "Prendre rendez-vous",
  en: "Book an appointment",
};

export function Navbar({ locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = NAV_LINKS[locale];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-border shadow-premium"
            : "bg-transparent"
        )}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link
            href={locale === "fr" ? "/" : "/en"}
            className="flex items-center gap-2"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="hidden font-display text-lg font-semibold text-primary-950 dark:text-white sm:block">
              Pool of Bethesa
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-sm font-medium text-primary-900/80 transition-colors hover:text-primary dark:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} />
            </div>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href={BOOK_HREF[locale]}>{BOOK_LABEL[locale]}</Link>
            </Button>
            <button
              className="rounded-full p-2 hover:bg-primary/5 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        bookLabel={BOOK_LABEL[locale]}
        bookHref={BOOK_HREF[locale]}
      />
    </>
  );
}
