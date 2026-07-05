"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";
import type { AppointmentStatus } from "@prisma/client";

export async function listAppointments(filters?: {
  search?: string;
  status?: AppointmentStatus | "ALL";
  serviceId?: string;
}) {
  const where: Record<string, unknown> = {};

  if (filters?.status && filters.status !== "ALL") {
    where.status = filters.status;
  }
  if (filters?.serviceId) {
    where.serviceId = filters.serviceId;
  }
  if (filters?.search) {
    where.OR = [
      { patientName: { contains: filters.search, mode: "insensitive" } },
      { phone: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  return prisma.appointment.findMany({
    where,
    include: { service: true },
    orderBy: [{ preferredDate: "desc" }, { preferredTime: "desc" }],
  });
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });

    await logActivity({
      userId: session.userId,
      action: "UPDATE",
      entity: "Appointment",
      entityId: appointmentId,
      details: `Statut changé vers ${status}`,
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, message: "Statut mis à jour." };
  } catch (error) {
    console.error("updateAppointmentStatus error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function updateAppointmentPayment(
  appointmentId: string,
  paymentReceived: boolean
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { paymentReceived },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, message: "Paiement mis à jour." };
  } catch (error) {
    console.error("updateAppointmentPayment error:", error);
    return { success: false, message: "Erreur lors de la mise à jour." };
  }
}

export async function deleteAppointment(appointmentId: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    await prisma.appointment.delete({ where: { id: appointmentId } });

    await logActivity({
      userId: session.userId,
      action: "DELETE",
      entity: "Appointment",
      entityId: appointmentId,
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, message: "Rendez-vous supprimé." };
  } catch (error) {
    console.error("deleteAppointment error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
