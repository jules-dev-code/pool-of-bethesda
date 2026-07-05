"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export async function getSettings() {
  const settings = await prisma.settings.findUnique({ where: { id: "settings" } });
  return settings;
}

export async function updateSettings(input: Record<string, unknown>): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.settings.upsert({
      where: { id: "settings" },
      update: input,
      create: { id: "settings", ...input },
    });

    await logActivity({ userId: session.userId, action: "UPDATE", entity: "Settings" });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Paramètres mis à jour avec succès." };
  } catch (error) {
    console.error("updateSettings error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}
