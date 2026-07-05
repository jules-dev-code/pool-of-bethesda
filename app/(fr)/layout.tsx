import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { WhatsAppButton } from "@/components/buttons/whatsapp-button";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageLoader } from "@/components/layout/page-loader";
import { SetHtmlLang } from "@/components/layout/set-html-lang";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd } from "@/components/seo/json-ld";
import { getDentistSchema, getOrganizationSchema } from "@/lib/seo/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pool-of-bethesda.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: messages.metadata.title,
    template: `%s | ${messages.metadata.title}`,
  },
  description: messages.metadata.description,
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/en" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: messages.metadata.title,
    title: messages.metadata.title,
    description: messages.metadata.description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: messages.metadata.title,
    description: messages.metadata.description,
    images: ["/images/og-cover.jpg"],
  },
};

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale="fr" messages={messages}>
        <TooltipProvider>
          <JsonLd data={getDentistSchema()} />
          <JsonLd data={getOrganizationSchema()} />
          <SetHtmlLang locale="fr" />
          <PageLoader
            clinicName="Pool of Bethesa"
            sloganText="Votre sourire, notre signature."
          />
          <Navbar locale="fr" />
          <main>{children}</main>
          <Footer locale="fr" />
          <WhatsAppButton />
          <Toaster position="top-center" />
        </TooltipProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
