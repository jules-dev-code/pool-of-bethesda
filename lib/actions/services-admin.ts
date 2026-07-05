"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export interface ServiceInput {
  slug: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  duration: number;
  icon: string;
  price?: number;
  active: boolean;
}

export async function listServicesAdmin() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function createService(input: ServiceInput): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    const count = await prisma.service.count();
    const service = await prisma.service.create({
      data: { ...input, order: count },
    });

    await logActivity({
      userId: session.userId,
      action: "CREATE",
      entity: "Service",
      entityId: service.id,
    });

    revalidatePath("/dashboard/services");
    return { success: true, message: "Service créé avec succès." };
  } catch (error) {
    console.error("createService error:", error);
    return { success: false, message: "Erreur lors de la création (slug déjà utilisé ?)." };
  }
}

export async function updateService(
  id: string,
  input: Partial<ServiceInput>
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.service.update({ where: { id }, data: input });

    await logActivity({
      userId: session.userId,
      action: "UPDATE",
      entity: "Service",
      entityId: id,
    });

    revalidatePath("/dashboard/services");
    return { success: true, message: "Service mis à jour." };
  } catch (error) {
    console.error("updateService error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.service.delete({ where: { id } });

    await logActivity({
      userId: session.userId,
      action: "DELETE",
      entity: "Service",
      entityId: id,
    });

    revalidatePath("/dashboard/services");
    return { success: true, message: "Service supprimé." };
  } catch (error) {
    console.error("deleteService error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}

export async function reorderServices(orderedIds: string[]): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.service.update({ where: { id }, data: { order: index } })
      )
    );
    revalidatePath("/dashboard/services");
    return { success: true, message: "Ordre mis à jour." };
  } catch (error) {
    console.error("reorderServices error:", error);
    return { success: false, message: "Erreur lors de la réorganisation." };
  }
}
