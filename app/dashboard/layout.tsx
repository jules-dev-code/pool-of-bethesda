import type { Metadata } from "next";
import { requireSession } from "@/lib/actions/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Dashboard | Cabinet Dentaire Pool of Bethesa",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double protection : le middleware bloque déjà les accès non authentifiés,
  // requireSession() récupère les infos de session pour l'affichage.
  const session = await requireSession();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <div className="flex min-h-screen bg-secondary/30">
          <DashboardSidebar userName={session.name} />
          <div className="flex-1">
            <header className="sticky top-0 z-30 flex h-20 items-center justify-end border-b border-border bg-card/80 px-8 backdrop-blur-md">
              <ThemeToggle />
            </header>
            <main className="p-8">{children}</main>
          </div>
        </div>
        <Toaster position="top-center" />
      </TooltipProvider>
    </ThemeProvider>
  );
}
