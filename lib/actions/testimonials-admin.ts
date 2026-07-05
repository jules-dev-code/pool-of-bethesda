"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export async function listTestimonialsAdmin() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createTestimonial(input: {
  patient: string;
  commentFr: string;
  commentEn: string;
  rating: number;
}): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.testimonial.create({ data: { ...input, approved: true } });
    await logActivity({ userId: session.userId, action: "CREATE", entity: "Testimonial" });
    revalidatePath("/dashboard/testimonials");
    return { success: true, message: "Témoignage ajouté." };
  } catch (error) {
    console.error("createTestimonial error:", error);
    return { success: false, message: "Erreur lors de la création." };
  }
}

export async function toggleTestimonialApproval(
  id: string,
  approved: boolean
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.testimonial.update({ where: { id }, data: { approved } });
    revalidatePath("/dashboard/testimonials");
    return { success: true, message: approved ? "Témoignage approuvé." : "Témoignage masqué." };
  } catch (error) {
    console.error("toggleTestimonialApproval error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.testimonial.delete({ where: { id } });
    await logActivity({
      userId: session.userId,
      action: "DELETE",
      entity: "Testimonial",
      entityId: id,
    });
    revalidatePath("/dashboard/testimonials");
    return { success: true, message: "Témoignage supprimé." };
  } catch (error) {
    console.error("deleteTestimonial error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
