import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import type { Locale } from "@/lib/types";
import Image from "next/image";

interface FooterProps {
  locale: Locale;
}

const CONTENT: Record<
  Locale,
  {
    quickLinks: string;
    hours: string;
    rights: string;
    links: { href: string; label: string }[];
    schedule: string[];
  }
> = {
  fr: {
    quickLinks: "Liens rapides",
    hours: "Horaires",
    rights: "Tous droits réservés.",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/about", label: "À propos" },
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Prendre rendez-vous" },
      { href: "/contact", label: "Contact" },
    ],
    schedule: [
      "Lun – Mer : 09h00 – 18h00",
      "Jeudi : 11h00 – 18h00",
      "Vendredi : 09h00 – 18h00",
      "Samedi : 10h00 – 15h00",
      "Dimanche : Fermé",
    ],
  },
  en: {
    quickLinks: "Quick links",
    hours: "Opening hours",
    rights: "All rights reserved.",
    links: [
      { href: "/en", label: "Home" },
      { href: "/en/about", label: "About" },
      { href: "/en/services", label: "Services" },
      { href: "/en/booking", label: "Book an appointment" },
      { href: "/en/contact", label: "Contact" },
    ],
    schedule: [
      "Mon – Wed: 9:00 AM – 6:00 PM",
      "Thursday: 11:00 AM – 6:00 PM",
      "Friday: 9:00 AM – 6:00 PM",
      "Saturday: 10:00 AM – 3:00 PM",
      "Sunday: Closed",
    ],
  },
};

export function Footer({ locale }: FooterProps) {
  const t = CONTENT[locale];
  const year = new Date().getFullYear();
  const slogan = locale === "fr" ? CLINIC.sloganFr : CLINIC.sloganEn;

  return (
    <footer className="border-t border-border bg-primary-950 text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-display text-lg font-semibold">
              Pool of Bethesa
            </span>
          </div>
          <p className="mt-4 text-sm italic text-white/60">{slogan}</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            {t.quickLinks}
          </h4>
          <ul className="mt-4 space-y-2">
            {t.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white hover:underline"
              >
                {CLINIC.address}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              
                href={`tel:${CLINIC.phoneRaw}`}
                className="transition-colors hover:text-white hover:underline"
              >
                {CLINIC.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              
                href={`mailto:${CLINIC.email}`}
                className="transition-colors hover:text-white hover:underline"
              >
                {CLINIC.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            {t.hours}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {t.schedule.map((line) => (
              <li key={line} className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-white/50">
          © {year} {CLINIC.name}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
