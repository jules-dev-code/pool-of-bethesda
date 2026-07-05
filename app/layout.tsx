import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cabinet Dentaire Pool of Bethesa",
  description:
    "Des soins dentaires modernes, précis et personnalisés à Douala.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ce layout racine sert de filet de sécurité pour les routes hors segments
  // de langue (ex: page 404 globale, /api). Les pages normales sont enveloppées
  // par app/(fr)/layout.tsx ou app/en/layout.tsx qui définissent <html lang="...">.
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${jakarta.variable} ${inter.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
