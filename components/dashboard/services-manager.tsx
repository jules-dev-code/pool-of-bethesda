"use client";

import { useState, useTransition } from "react";
import * as Icons from "lucide-react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ServiceFormDialog } from "@/components/dashboard/service-form-dialog";
import { deleteService, updateService } from "@/lib/actions/services-admin";
import type { Service } from "@prisma/client";

export function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    // Les Server Actions appellent déjà revalidatePath ; ici on force un
    // re-render local optimiste pour l'UX immédiate en attendant le refresh RSC.
    window.location.reload();
  }

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(service: Service) {
    setEditing(service);
    setDialogOpen(true);
  }

  function toggleActive(service: Service) {
    startTransition(async () => {
      const result = await updateService(service.id, { active: !service.active });
      if (result.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, active: !s.active } : s))
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Supprimer définitivement ce service ?")) return;
    startTransition(async () => {
      const result = await deleteService(id);
      if (result.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
            Services
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez les soins proposés sur le site public.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Nouveau service
        </Button>
      </div>

      <div className="space-y-3">
        {services.map((service) => {
          const Icon =
            (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon ?? ""] ??
            Icons.Stethoscope;

          return (
            <div
              key={service.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-premium"
            >
              <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                  {service.titleFr}
                </p>
                <p className="text-xs text-muted-foreground">
                  {service.duration} min {service.price ? `· ${service.price} FCFA` : ""}
                </p>
              </div>
              <Switch
                checked={service.active}
                onCheckedChange={() => toggleActive(service)}
                disabled={isPending}
              />
              <button
                onClick={() => openEdit(service)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                aria-label="Modifier"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      <ServiceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={editing}
        onSuccess={refresh}
      />
    </div>
  );
}
