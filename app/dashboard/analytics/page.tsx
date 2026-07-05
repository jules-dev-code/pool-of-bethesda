import { getAnalyticsData } from "@/lib/actions/analytics-admin";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { StatCard } from "@/components/dashboard/stat-card";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vue d'ensemble des performances du cabinet sur les 6 derniers mois.
        </p>
      </div>

      <div className="mb-6 grid gap-5 sm:grid-cols-2">
        <StatCard
          icon="TrendingDown"
          label="Taux d'annulation"
          value={data.cancellationRate}
          accent="red"
        />
        <StatCard icon="TrendingDown" label="Total rendez-vous (6 mois)" value={data.total} />
      </div>

      <AnalyticsCharts
        monthlyEvolution={data.monthlyEvolution}
        topServices={data.topServices}
        topTimes={data.topTimes}
      />
    </div>
  );
}
