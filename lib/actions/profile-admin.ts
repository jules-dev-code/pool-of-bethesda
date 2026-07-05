"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) return { success: false, message: "Utilisateur introuvable." };

  const isValid = await bcrypt.compare(input.currentPassword, user.password);
  if (!isValid) {
    return { success: false, message: "Mot de passe actuel incorrect." };
  }

  if (input.newPassword.length < 8) {
    return {
      success: false,
      message: "Le nouveau mot de passe doit contenir au moins 8 caractères.",
    };
  }

  const hashed = await bcrypt.hash(input.newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

  await logActivity({
    userId: user.id,
    action: "UPDATE",
    entity: "User",
    entityId: user.id,
    details: "Changement de mot de passe",
  });

  return { success: true, message: "Mot de passe mis à jour avec succès." };
}
