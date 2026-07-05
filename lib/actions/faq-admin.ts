"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

export interface FaqInput {
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
  category: string;
}

export async function listFaqsAdmin() {
  return prisma.faq.findMany({ orderBy: { order: "asc" } });
}

export async function createFaq(input: FaqInput): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    const count = await prisma.faq.count();
    await prisma.faq.create({ data: { ...input, order: count } });
    await logActivity({ userId: session.userId, action: "CREATE", entity: "Faq" });
    revalidatePath("/dashboard/faq");
    return { success: true, message: "Question ajoutée." };
  } catch (error) {
    console.error("createFaq error:", error);
    return { success: false, message: "Erreur lors de la création." };
  }
}

export async function updateFaq(id: string, input: Partial<FaqInput>): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.faq.update({ where: { id }, data: input });
    await logActivity({ userId: session.userId, action: "UPDATE", entity: "Faq", entityId: id });
    revalidatePath("/dashboard/faq");
    return { success: true, message: "Question mise à jour." };
  } catch (error) {
    console.error("updateFaq error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.faq.delete({ where: { id } });
    await logActivity({ userId: session.userId, action: "DELETE", entity: "Faq", entityId: id });
    revalidatePath("/dashboard/faq");
    return { success: true, message: "Question supprimée." };
  } catch (error) {
    console.error("deleteFaq error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
