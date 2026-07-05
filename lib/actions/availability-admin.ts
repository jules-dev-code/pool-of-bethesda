"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export async function listOpeningHours() {
  return prisma.openingHour.findMany({ orderBy: { dayOfWeek: "asc" } });
}

export async function updateOpeningHour(
  dayOfWeek: number,
  data: { openTime: string | null; closeTime: string | null; isClosed: boolean }
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.openingHour.upsert({
      where: { dayOfWeek },
      update: data,
      create: { dayOfWeek, ...data },
    });

    await logActivity({
      userId: session.userId,
      action: "UPDATE",
      entity: "OpeningHour",
      details: `Jour ${dayOfWeek}`,
    });

    revalidatePath("/dashboard/availability");
    return { success: true, message: "Horaires mis à jour." };
  } catch (error) {
    console.error("updateOpeningHour error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function listBlockedSlots() {
  return prisma.blockedSlot.findMany({ orderBy: { date: "asc" } });
}

export async function createBlockedSlot(input: {
  date: string;
  fullDay: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
}): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.blockedSlot.create({
      data: {
        date: new Date(input.date),
        fullDay: input.fullDay,
        startTime: input.fullDay ? null : input.startTime,
        endTime: input.fullDay ? null : input.endTime,
        reason: input.reason,
      },
    });

    await logActivity({
      userId: session.userId,
      action: "CREATE",
      entity: "BlockedSlot",
    });

    revalidatePath("/dashboard/availability");
    return { success: true, message: "Blocage ajouté." };
  } catch (error) {
    console.error("createBlockedSlot error:", error);
    return { success: false, message: "Erreur lors de la création du blocage." };
  }
}

export async function deleteBlockedSlot(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.blockedSlot.delete({ where: { id } });
    revalidatePath("/dashboard/availability");
    return { success: true, message: "Blocage supprimé." };
  } catch (error) {
    console.error("deleteBlockedSlot error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
