import { prisma } from "@/lib/prisma";
import {
  OPENING_HOURS,
  DEFAULT_SLOT_DURATION_MIN,
} from "@/lib/constants";
import type { TimeSlot } from "@/lib/types";

/**
 * Génère la liste des créneaux horaires possibles pour une date donnée,
 * en fonction des horaires d'ouverture, des rendez-vous déjà pris et des
 * plages bloquées par l'administrateur.
 */
export async function getAvailableSlots(
  date: Date,
  slotDurationMin: number = DEFAULT_SLOT_DURATION_MIN
): Promise<TimeSlot[]> {
  const dayOfWeek = date.getDay(); // 0 = Dimanche ... 6 = Samedi

  const dbHours = await prisma.openingHour
    .findUnique({ where: { dayOfWeek } })
    .catch(() => null);

  const hours = dbHours ?? OPENING_HOURS.find((h) => h.dayOfWeek === dayOfWeek);

  if (!hours || hours.isClosed || !hours.openTime || !hours.closeTime) {
    return [];
  }

  const allSlots = generateSlotsInRange(
    hours.openTime,
    hours.closeTime,
    slotDurationMin
  );

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Rendez-vous déjà confirmés/en attente ce jour-là
  const existingAppointments = await prisma.appointment.findMany({
    where: {
      preferredDate: { gte: startOfDay, lte: endOfDay },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { preferredTime: true },
  });
  const bookedTimes = new Set(existingAppointments.map((a) => a.preferredTime));

  // Plages bloquées par l'admin (congés, indisponibilités)
  const blockedSlots = await prisma.blockedSlot.findMany({
    where: { date: { gte: startOfDay, lte: endOfDay } },
  });
  const isFullyBlocked = blockedSlots.some((b) => b.fullDay);
  const blockedRanges = blockedSlots.filter((b) => !b.fullDay);

  if (isFullyBlocked) {
    return allSlots.map((time) => ({ time, available: false }));
  }

  const now = new Date();
  const isToday = isSameDay(date, now);

  return allSlots.map((time) => {
    let available = !bookedTimes.has(time);

    // Ne jamais proposer un horaire déjà passé pour aujourd'hui
    if (available && isToday && isPast(time, now)) {
      available = false;
    }

    // Vérifie les blocages partiels (ex: 12h-13h bloqué)
    if (available) {
      for (const range of blockedRanges) {
        if (
          range.startTime &&
          range.endTime &&
          time >= range.startTime &&
          time < range.endTime
        ) {
          available = false;
          break;
        }
      }
    }

    return { time, available };
  });
}

export function generateSlotsInRange(
  openTime: string,
  closeTime: string,
  durationMin: number
): string[] {
  const slots: string[] = [];
  let [h, m] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  while (h < closeH || (h === closeH && m < closeM)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += durationMin;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    }
  }

  return slots;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isPast(time: string, now: Date) {
  const [h, m] = time.split(":").map(Number);
  const slotDate = new Date(now);
  slotDate.setHours(h, m, 0, 0);
  return slotDate.getTime() <= now.getTime();
}
