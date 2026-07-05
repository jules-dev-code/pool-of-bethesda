"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createService, updateService, type ServiceInput } from "@/lib/actions/services-admin";
import type { Service } from "@prisma/client";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
  onSuccess: () => void;
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
  onSuccess,
}: ServiceFormDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!service;

  const { register, handleSubmit, watch, setValue, reset } = useForm<ServiceInput>({
    defaultValues: service
      ? {
          slug: service.slug,
          titleFr: service.titleFr,
          titleEn: service.titleEn,
          descriptionFr: service.descriptionFr,
          descriptionEn: service.descriptionEn,
          duration: service.duration,
          icon: service.icon ?? "Stethoscope",
          price: service.price ?? undefined,
          active: service.active,
        }
      : {
          slug: "",
          titleFr: "",
          titleEn: "",
          descriptionFr: "",
          descriptionEn: "",
          duration: 30,
          icon: "Stethoscope",
          active: true,
        },
  });

  const active = watch("active");

  async function onSubmit(values: ServiceInput) {
    setSubmitting(true);
    const result = isEdit
      ? await updateService(service!.id, values)
      : await createService(values);
    setSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      reset();
      onOpenChange(false);
      onSuccess();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier le service" : "Nouveau service"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Slug (URL)</Label>
              <Input className="mt-1.5" placeholder="detartrage" {...register("slug")} />
            </div>
            <div>
              <Label>Icône (Lucide)</Label>
              <Input className="mt-1.5" placeholder="Sparkles" {...register("icon")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Titre (Français)</Label>
              <Input className="mt-1.5" {...register("titleFr")} />
            </div>
            <div>
              <Label>Titre (Anglais)</Label>
              <Input className="mt-1.5" {...register("titleEn")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Description (Français)</Label>
              <Textarea className="mt-1.5" rows={3} {...register("descriptionFr")} />
            </div>
            <div>
              <Label>Description (Anglais)</Label>
              <Textarea className="mt-1.5" rows={3} {...register("descriptionEn")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Durée (minutes)</Label>
              <Input
                type="number"
                className="mt-1.5"
                {...register("duration", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label>Prix (FCFA, optionnel)</Label>
              <Input
                type="number"
                className="mt-1.5"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={active} onCheckedChange={(v) => setValue("active", v)} />
            <Label>Service visible sur le site</Label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enregistrement..." : isEdit ? "Enregistrer" : "Créer le service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
