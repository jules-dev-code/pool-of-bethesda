"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsChartsProps {
  monthlyEvolution: { month: string; count: number }[];
  topServices: { name: string; count: number }[];
  topTimes: { time: string; count: number }[];
}

const CHART_COLOR = "#134fbf";

export function AnalyticsCharts({
  monthlyEvolution,
  topServices,
  topTimes,
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium">
        <h3 className="mb-4 font-heading text-sm font-semibold text-primary-950 dark:text-white">
          Évolution mensuelle des rendez-vous
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyEvolution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke={CHART_COLOR}
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium">
        <h3 className="mb-4 font-heading text-sm font-semibold text-primary-950 dark:text-white">
          Services les plus demandés
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topServices} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" fontSize={12} allowDecimals={false} />
            <YAxis type="category" dataKey="name" fontSize={11} width={110} />
            <Tooltip />
            <Bar dataKey="count" fill={CHART_COLOR} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium lg:col-span-2">
        <h3 className="mb-4 font-heading text-sm font-semibold text-primary-950 dark:text-white">
          Créneaux les plus réservés
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topTimes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#c9a24b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
