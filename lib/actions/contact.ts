"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { rateLimit } from "@/lib/security/rate-limit";
import type { ActionResult } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10).max(2000),
});

const EMAIL_FROM =
  process.env.EMAIL_FROM ??
  "Cabinet Dentaire Pool of Bethesa <onboarding@resend.dev>";
const CLINIC_NOTIFICATION_EMAIL =
  process.env.EMAIL_CLINIC_NOTIFICATIONS ?? "myriamkengne85@gmail.com";

export async function sendContactMessage(
  rawInput: unknown,
  locale: "fr" | "en" = "fr"
): Promise<ActionResult> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  const { success: withinLimit } = rateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!withinLimit) {
    return {
      success: false,
      message:
        locale === "fr"
          ? "Trop de messages envoyés. Merci de réessayer plus tard."
          : "Too many messages sent. Please try again later.",
    };
  }

  const parsed = contactSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      message:
        locale === "fr" ? "Merci de vérifier les champs du formulaire." : "Please check the form fields.",
    };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: CLINIC_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Nouveau message de contact : ${name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color:#0b2f70;">Nouveau message depuis le site</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Message :</strong></p>
          <p style="background:#eef5ff; padding:16px; border-radius:12px;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return {
      success: true,
      message:
        locale === "fr"
          ? "Votre message a été envoyé avec succès."
          : "Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("sendContactMessage error:", error);
    return {
      success: false,
      message:
        locale === "fr"
          ? "Une erreur est survenue. Merci de réessayer."
          : "An error occurred. Please try again.",
    };
  }
}

/** Échappe le HTML pour éviter toute injection dans l'email envoyé */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
