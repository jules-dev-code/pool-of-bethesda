import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@prisma/client";

const CONFIG: Record<AppointmentStatus, { label: string; variant: "warning" | "success" | "default" | "destructive" }> = {
  PENDING: { label: "En attente", variant: "warning" },
  CONFIRMED: { label: "Confirmé", variant: "success" },
  COMPLETED: { label: "Terminé", variant: "default" },
  CANCELLED: { label: "Annulé", variant: "destructive" },
};

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  const config = CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
