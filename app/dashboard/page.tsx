import { getSession } from "@/lib/auth/session";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function DashboardHomePage() {
  const session = await getSession();
  const stats = await getDashboardStats();

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Bonjour {session?.name ?? "Dr Myriam"} 👋
        </h1>
        <p className="mt-1 text-sm capitalize text-muted-foreground">
          Aujourd'hui nous sommes le {today}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="CalendarDays" label="Rendez-vous aujourd'hui" value={stats.todayCount} />
        <StatCard icon="CalendarClock" label="Cette semaine" value={stats.weekCount} />
        <StatCard icon="CalendarCheck" label="Ce mois-ci" value={stats.monthCount} />
        <StatCard icon="Users" label="Patients reçus" value={stats.totalPatients} accent="gold" />
        <StatCard icon="Hourglass" label="En attente" value={stats.pendingCount} accent="gold" />
        <StatCard icon="CheckCircle2" label="Confirmés" value={stats.confirmedCount} accent="emerald" />
        <StatCard icon="XCircle" label="Annulés" value={stats.cancelledCount} accent="red" />
      </div>
    </div>
  );
}