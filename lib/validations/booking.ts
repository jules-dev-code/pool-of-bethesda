import { z } from "zod";

export const bookingInfoSchema = z.object({
  patientName: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  phone: z
    .string()
    .min(8, "Numéro de téléphone invalide.")
    .regex(/^[0-9+\s]+$/, "Le numéro ne doit contenir que des chiffres."),
  email: z.string().email("Adresse email invalide."),
  comments: z.string().max(500).optional().or(z.literal("")),
});

export const bookingPaymentSchema = z.object({
  paymentMethod: z.enum(["ONSITE", "ORANGE_MONEY"]),
});

export const createAppointmentSchema = z.object({
  serviceSlug: z.string().min(1, "Veuillez sélectionner un service."),
  date: z.string().min(1, "Veuillez sélectionner une date."), // ISO yyyy-MM-dd
  time: z.string().min(1, "Veuillez sélectionner un horaire."), // "09:30"
  patientName: bookingInfoSchema.shape.patientName,
  phone: bookingInfoSchema.shape.phone,
  email: bookingInfoSchema.shape.email,
  comments: bookingInfoSchema.shape.comments,
  paymentMethod: bookingPaymentSchema.shape.paymentMethod,
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type BookingInfoValues = z.infer<typeof bookingInfoSchema>;
