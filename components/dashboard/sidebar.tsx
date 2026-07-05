"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Images,
  Star,
  HelpCircle,
  Settings,
  User,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  BarChart3,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { logoutAction } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/appointments", label: "Rendez-vous", icon: CalendarDays },
  { href: "/dashboard/availability", label: "Disponibilités", icon: Clock },
  { href: "/dashboard/services", label: "Services", icon: Stethoscope },
  { href: "/dashboard/gallery", label: "Galerie", icon: Images },
  { href: "/dashboard/testimonials", label: "Témoignages", icon: Star },
  { href: "/dashboard/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/logs", label: "Journal", icon: ScrollText },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

export function DashboardSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 264 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 flex h-screen shrink-0 flex-col border-r border-border bg-card"
    >
      <div className="flex h-20 items-center gap-3 px-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white">
          PB
        </div>
        {!collapsed && (
          <span className="truncate font-display text-sm font-semibold text-primary-950 dark:text-white">
            Pool of Bethesa
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-heading font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-premium"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-border p-3">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-heading font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
        >
          <User className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span className="truncate">{userName}</span>}
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-heading font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </form>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-primary/5"
        >
          {collapsed ? (
            <ChevronsRight className="h-4.5 w-4.5" />
          ) : (
            <>
              <ChevronsLeft className="h-4.5 w-4.5" />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
