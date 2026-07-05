"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";
import type { GalleryCategory } from "@prisma/client";

export async function listGalleryImages() {
  return prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
}

/**
 * Reçoit une image encodée en base64 (data URL) depuis le client, l'upload
 * vers Cloudinary avec compression/optimisation automatique, puis enregistre
 * la référence en base de données.
 */
export async function uploadGalleryImage(input: {
  base64: string;
  title: string;
  category: GalleryCategory;
}): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    const uploadResult = await cloudinary.uploader.upload(input.base64, {
      folder: "pool-of-bethesda/gallery",
      transformation: [
        { quality: "auto", fetch_format: "auto" },
        { width: 1600, crop: "limit" },
      ],
    });

    const count = await prisma.galleryImage.count();
    await prisma.galleryImage.create({
      data: {
        title: input.title,
        image: uploadResult.secure_url,
        category: input.category,
        order: count,
      },
    });

    await logActivity({
      userId: session.userId,
      action: "CREATE",
      entity: "GalleryImage",
    });

    revalidatePath("/dashboard/gallery");
    return { success: true, message: "Image ajoutée à la galerie." };
  } catch (error) {
    console.error("uploadGalleryImage error:", error);
    return { success: false, message: "Erreur lors de l'upload de l'image." };
  }
}

export async function deleteGalleryImage(id: string, imageUrl: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "Non autorisé." };

  try {
    // Extrait le public_id Cloudinary depuis l'URL pour suppression propre
    const publicIdMatch = imageUrl.match(/pool-of-bethesda\/gallery\/[^./]+/);
    if (publicIdMatch) {
      await cloudinary.uploader.destroy(publicIdMatch[0]).catch(() => null);
    }

    await prisma.galleryImage.delete({ where: { id } });

    await logActivity({
      userId: session.userId,
      action: "DELETE",
      entity: "GalleryImage",
      entityId: id,
    });

    revalidatePath("/dashboard/gallery");
    return { success: true, message: "Image supprimée." };
  } catch (error) {
    console.error("deleteGalleryImage error:", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
