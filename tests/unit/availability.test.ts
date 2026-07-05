import { describe, it, expect } from "vitest";
import { generateSlotsInRange } from "@/lib/services/availability";

describe("generateSlotsInRange", () => {
  it("génère des créneaux de 30 minutes entre 09h00 et 12h00", () => {
    const slots = generateSlotsInRange("09:00", "12:00", 30);
    expect(slots).toEqual([
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
    ]);
  });

  it("gère correctement le passage à l'heure suivante (durée non ronde)", () => {
    const slots = generateSlotsInRange("09:00", "10:00", 45);
    expect(slots).toEqual(["09:00", "09:45"]);
  });

  it("retourne un tableau vide si l'ouverture est après la fermeture", () => {
    const slots = generateSlotsInRange("18:00", "09:00", 30);
    expect(slots).toEqual([]);
  });

  it("respecte les horaires du samedi (10h00 - 15h00)", () => {
    const slots = generateSlotsInRange("10:00", "15:00", 30);
    expect(slots[0]).toBe("10:00");
    expect(slots[slots.length - 1]).toBe("14:30");
    expect(slots).not.toContain("15:00");
  });
});
