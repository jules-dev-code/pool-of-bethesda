"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { createAppointmentSchema } from "@/lib/validations/booking";
import { rateLimit } from "@/lib/security/rate-limit";
import type { ActionResult } from "@/lib/types";
import AppointmentConfirmationEmail from "@/emails/appointment-confirmation-email";
import ClinicNotificationEmail from "@/emails/clinic-notification-email";

const CLINIC_NOTIFICATION_EMAIL =
  process.env.EMAIL_CLINIC_NOTIFICATIONS ?? "myriamkengne85@gmail.com";
const EMAIL_FROM =
  process.env.EMAIL_FROM ??
  "Cabinet Dentaire Pool of Bethesa <onboarding@resend.dev>";

interface CreateAppointmentResult {
  appointmentId: string;
}

export async function createAppointment(
  rawInput: unknown,
  locale: "fr" | "en" = "fr"
): Promise<ActionResult<CreateAppointmentResult>> {
  // Protection anti-spam : max 5 tentatives de réservation / 10 min / IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  const { success: withinLimit } = rateLimit(`booking:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!withinLimit) {
    return {
      success: false,
      message:
        locale === "fr"
          ? "Trop de tentatives. Merci de réessayer dans quelques minutes."
          : "Too many attempts. Please try again in a few minutes.",
    };
  }

  const parsed = createAppointmentSchema.safeParse(rawInput);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Données invalides.",
    };
  }

  const {
    serviceSlug,
    date,
    time,
    patientName,
    phone,
    email,
    comments,
    paymentMethod,
  } = parsed.data;

  const preferredDate = new Date(date);
  if (Number.isNaN(preferredDate.getTime())) {
    return { success: false, message: "Date invalide." };
  }

  // Empêche les dates passées
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (preferredDate < today) {
    return { success: false, message: "La date sélectionnée est déjà passée." };
  }

  const service = await prisma.service.findUnique({ where: { slug: serviceSlug } });
  if (!service || !service.active) {
    return { success: false, message: "Ce service n'est pas disponible." };
  }

  try {
    // Transaction : vérifie l'absence de conflit puis crée le RDV atomiquement
    const appointment = await prisma.$transaction(async (tx) => {
      const startOfDay = new Date(preferredDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(preferredDate);
      endOfDay.setHours(23, 59, 59, 999);

      const conflict = await tx.appointment.findFirst({
        where: {
          preferredDate: { gte: startOfDay, lte: endOfDay },
          preferredTime: time,
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      });

      if (conflict) {
        throw new Error("SLOT_TAKEN");
      }

      const blocked = await tx.blockedSlot.findFirst({
        where: {
          date: { gte: startOfDay, lte: endOfDay },
          OR: [
            { fullDay: true },
            { startTime: { lte: time }, endTime: { gt: time } },
          ],
        },
      });

      if (blocked) {
        throw new Error("SLOT_BLOCKED");
      }

      return tx.appointment.create({
        data: {
          patientName,
          phone,
          email,
          serviceId: service.id,
          preferredDate,
          preferredTime: time,
          notes: comments || undefined,
          paymentMethod,
          status: "PENDING",
        },
      });
    });

    // Envoi des emails (ne bloque pas la confirmation si l'un échoue)
    const formattedDate = preferredDate.toLocaleDateString(
      locale === "fr" ? "fr-FR" : "en-US",
      { day: "numeric", month: "long", year: "numeric" }
    );
    const serviceName = locale === "fr" ? service.titleFr : service.titleEn;

    await Promise.allSettled([
      resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject:
          locale === "fr"
            ? "Confirmation de votre rendez-vous"
            : "Your appointment confirmation",
        react: AppointmentConfirmationEmail({
          patientName,
          serviceName,
          date: formattedDate,
          time,
          locale,
        }),
      }),
      resend.emails.send({
        from: EMAIL_FROM,
        to: CLINIC_NOTIFICATION_EMAIL,
        subject: `Nouveau rendez-vous : ${patientName}`,
        react: ClinicNotificationEmail({
          patientName,
          phone,
          email,
          serviceName,
          date: formattedDate,
          time,
          comments,
          paymentMethod,
        }),
      }),
    ]);

    return {
      success: true,
      message:
        locale === "fr"
          ? "Votre rendez-vous a été confirmé avec succès."
          : "Your appointment has been successfully confirmed.",
      data: { appointmentId: appointment.id },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_TAKEN") {
      return {
        success: false,
        message:
          locale === "fr"
            ? "Ce créneau vient d'être réservé par quelqu'un d'autre. Merci d'en choisir un autre."
            : "This slot was just booked by someone else. Please choose another one.",
      };
    }
    if (error instanceof Error && error.message === "SLOT_BLOCKED") {
      return {
        success: false,
        message:
          locale === "fr"
            ? "Ce créneau n'est plus disponible."
            : "This slot is no longer available.",
      };
    }

    console.error("createAppointment error:", error);
    return {
      success: false,
      message:
        locale === "fr"
          ? "Une erreur est survenue. Merci de réessayer."
          : "An error occurred. Please try again.",
    };
  }
}
