"use server";

import { prisma } from "@/lib/prisma";
import type { DashboardStats } from "@/lib/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    todayCount,
    weekCount,
    monthCount,
    pendingCount,
    confirmedCount,
    cancelledCount,
    totalPatients,
  ] = await Promise.all([
    prisma.appointment.count({
      where: { preferredDate: { gte: startOfToday, lte: endOfToday } },
    }),
    prisma.appointment.count({
      where: { preferredDate: { gte: startOfWeek } },
    }),
    prisma.appointment.count({
      where: { preferredDate: { gte: startOfMonth } },
    }),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({ where: { status: "CONFIRMED" } }),
    prisma.appointment.count({ where: { status: "CANCELLED" } }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
  ]);

  return {
    todayCount,
    weekCount,
    monthCount,
    pendingCount,
    confirmedCount,
    cancelledCount,
    totalPatients,
  };
}
