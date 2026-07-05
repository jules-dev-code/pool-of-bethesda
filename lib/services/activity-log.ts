import { prisma } from "@/lib/prisma";
import type { LogAction } from "@prisma/client";

interface LogActivityParams {
  userId: string;
  action: LogAction;
  entity: string;
  entityId?: string;
  details?: string;
}

export async function logActivity({
  userId,
  action,
  entity,
  entityId,
  details,
}: LogActivityParams) {
  try {
    await prisma.activityLog.create({
      data: { userId, action, entity, entityId, details },
    });
  } catch (error) {
    // Le logging ne doit jamais faire échouer l'action principale
    console.error("logActivity error:", error);
  }
}
