import { describe, it, expect } from "vitest";
import { createAppointmentSchema } from "@/lib/validations/booking";

const validInput = {
  serviceSlug: "detartrage",
  date: "2026-08-15",
  time: "09:30",
  patientName: "Jean Dupont",
  phone: "+237659123456",
  email: "jean.dupont@example.com",
  comments: "",
  paymentMethod: "ONSITE" as const,
};

describe("createAppointmentSchema", () => {
  it("accepte une réservation valide", () => {
    const result = createAppointmentSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = createAppointmentSchema.safeParse({
      ...validInput,
      email: "pas-un-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un nom trop court", () => {
    const result = createAppointmentSchema.safeParse({
      ...validInput,
      patientName: "J",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un numéro de téléphone contenant des lettres", () => {
    const result = createAppointmentSchema.safeParse({
      ...validInput,
      phone: "abcdefgh",
    });
    expect(result.success).toBe(false);
  });

  it("rejette un mode de paiement invalide", () => {
    const result = createAppointmentSchema.safeParse({
      ...validInput,
      paymentMethod: "BITCOIN",
    });
    expect(result.success).toBe(false);
  });

  it("rejette si le service n'est pas renseigné", () => {
    const result = createAppointmentSchema.safeParse({
      ...validInput,
      serviceSlug: "",
    });
    expect(result.success).toBe(false);
  });
});
