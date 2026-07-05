import { PrismaClient } from "@prisma/client";
import { SERVICES } from "../lib/data/services";
import { OPENING_HOURS, ORANGE_MONEY, CLINIC } from "../lib/constants";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ---------------------------------------------------------
  // Services
  // ---------------------------------------------------------
  for (const [index, service] of SERVICES.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        titleFr: service.titleFr,
        titleEn: service.titleEn,
        descriptionFr: service.descriptionFr,
        descriptionEn: service.descriptionEn,
        duration: service.duration,
        icon: service.icon,
        order: index,
        active: true,
      },
    });
  }
  console.log(`✅ ${SERVICES.length} services créés/synchronisés`);

  // ---------------------------------------------------------
  // Horaires d'ouverture
  // ---------------------------------------------------------
  for (const hour of OPENING_HOURS) {
    await prisma.openingHour.upsert({
      where: { dayOfWeek: hour.dayOfWeek },
      update: {
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        isClosed: hour.isClosed,
      },
      create: {
        dayOfWeek: hour.dayOfWeek,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        isClosed: hour.isClosed,
      },
    });
  }
  console.log(`✅ Horaires d'ouverture synchronisés`);

  // ---------------------------------------------------------
  // Paramètres du cabinet (singleton)
  // ---------------------------------------------------------
  await prisma.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      clinicName: CLINIC.name,
      sloganFr: CLINIC.sloganFr,
      sloganEn: CLINIC.sloganEn,
      address: CLINIC.address,
      phone: CLINIC.phoneRaw,
      email: CLINIC.email,
      orangeMoneyNumber: ORANGE_MONEY.number,
      orangeMoneyName: ORANGE_MONEY.name,
      orangeMoneyActive: true,
    },
  });
  console.log("✅ Paramètres du cabinet initialisés");

  // ---------------------------------------------------------
  // Compte administrateur par défaut (mot de passe à changer !)
  // ---------------------------------------------------------
  const defaultPassword = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.upsert({
    where: { email: "myriamkengne85@gmail.com" },
    update: {},
    create: {
      name: "Dr Myriam Kengne",
      email: "myriamkengne85@gmail.com",
      password: defaultPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Compte administrateur créé (mot de passe temporaire : ChangeMe123!)");

  console.log("🌱 Seed terminé avec succès.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
