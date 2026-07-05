"use server";

import { prisma } from "@/lib/prisma";

export async function getAnalyticsData() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const appointments = await prisma.appointment.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    include: { service: { select: { titleFr: true } } },
  });

  // Évolution mensuelle
  const monthlyMap = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("fr-FR", { month: "short" });
    monthlyMap.set(key, 0);
  }
  appointments.forEach((a) => {
    const key = a.createdAt.toLocaleDateString("fr-FR", { month: "short" });
    if (monthlyMap.has(key)) monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + 1);
  });
  const monthlyEvolution = Array.from(monthlyMap.entries()).map(([month, count]) => ({
    month,
    count,
  }));

  // Services les plus demandés
  const serviceCounts = new Map<string, number>();
  appointments.forEach((a) => {
    const name = a.service.titleFr;
    serviceCounts.set(name, (serviceCounts.get(name) ?? 0) + 1);
  });
  const topServices = Array.from(serviceCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Créneaux les plus réservés
  const timeCounts = new Map<string, number>();
  appointments.forEach((a) => {
    timeCounts.set(a.preferredTime, (timeCounts.get(a.preferredTime) ?? 0) + 1);
  });
  const topTimes = Array.from(timeCounts.entries())
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Taux d'annulation
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;
  const cancellationRate =
    appointments.length > 0 ? Math.round((cancelledCount / appointments.length) * 100) : 0;

  return { monthlyEvolution, topServices, topTimes, cancellationRate, total: appointments.length };
}
