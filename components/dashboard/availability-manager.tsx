"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, CalendarOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  updateOpeningHour,
  createBlockedSlot,
  deleteBlockedSlot,
} from "@/lib/actions/availability-admin";
import type { OpeningHour, BlockedSlot } from "@prisma/client";

const DAY_LABELS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface AvailabilityManagerProps {
  initialHours: OpeningHour[];
  initialBlocked: BlockedSlot[];
}

export function AvailabilityManager({
  initialHours,
  initialBlocked,
}: AvailabilityManagerProps) {
  const [hours, setHours] = useState(initialHours);
  const [blocked, setBlocked] = useState(initialBlocked);
  const [isPending, startTransition] = useTransition();
  const [newBlock, setNewBlock] = useState({ date: "", reason: "" });

  function handleHourChange(
    dayOfWeek: number,
    field: "openTime" | "closeTime" | "isClosed",
    value: string | boolean
  ) {
    const updated = hours.map((h) =>
      h.dayOfWeek === dayOfWeek ? { ...h, [field]: value } : h
    );
    setHours(updated);

    const target = updated.find((h) => h.dayOfWeek === dayOfWeek)!;
    startTransition(async () => {
      const result = await updateOpeningHour(dayOfWeek, {
        openTime: target.openTime,
        closeTime: target.closeTime,
        isClosed: target.isClosed,
      });
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  function handleAddBlock() {
    if (!newBlock.date) {
      toast.error("Merci de sélectionner une date.");
      return;
    }
    startTransition(async () => {
      const result = await createBlockedSlot({
        date: newBlock.date,
        fullDay: true,
        reason: newBlock.reason,
      });
      if (result.success) {
        toast.success(result.message);
        setNewBlock({ date: "", reason: "" });
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDeleteBlock(id: string) {
    startTransition(async () => {
      const result = await deleteBlockedSlot(id);
      if (result.success) {
        setBlocked((prev) => prev.filter((b) => b.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium">
        <h2 className="mb-4 font-heading text-base font-semibold text-primary-950 dark:text-white">
          Horaires hebdomadaires
        </h2>
        <div className="space-y-3">
          {hours.map((hour) => (
            <div
              key={hour.dayOfWeek}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3"
            >
              <span className="w-24 text-sm font-heading font-medium">
                {DAY_LABELS[hour.dayOfWeek]}
              </span>
              <Switch
                checked={!hour.isClosed}
                onCheckedChange={(v) => handleHourChange(hour.dayOfWeek, "isClosed", !v)}
                disabled={isPending}
              />
              {!hour.isClosed ? (
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    type="time"
                    value={hour.openTime ?? ""}
                    onChange={(e) =>
                      handleHourChange(hour.dayOfWeek, "openTime", e.target.value)
                    }
                    className="h-9 w-28"
                  />
                  <span className="text-muted-foreground">–</span>
                  <Input
                    type="time"
                    value={hour.closeTime ?? ""}
                    onChange={(e) =>
                      handleHourChange(hour.dayOfWeek, "closeTime", e.target.value)
                    }
                    className="h-9 w-28"
                  />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Fermé</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-premium">
        <h2 className="mb-4 font-heading text-base font-semibold text-primary-950 dark:text-white">
          Congés & indisponibilités
        </h2>

        <div className="mb-5 flex flex-wrap items-end gap-3">
          <div>
            <Label className="text-xs">Date</Label>
            <Input
              type="date"
              value={newBlock.date}
              onChange={(e) => setNewBlock((b) => ({ ...b, date: e.target.value }))}
              className="mt-1 h-9"
            />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Raison (optionnel)</Label>
            <Input
              value={newBlock.reason}
              onChange={(e) => setNewBlock((b) => ({ ...b, reason: e.target.value }))}
              placeholder="Congés, formation..."
              className="mt-1 h-9"
            />
          </div>
          <Button size="sm" onClick={handleAddBlock} disabled={isPending}>
            <Plus className="h-4 w-4" />
            Bloquer
          </Button>
        </div>

        <div className="space-y-2">
          {blocked.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune indisponibilité programmée.</p>
          ) : (
            blocked.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-border p-3"
              >
                <div className="flex items-center gap-2">
                  <CalendarOff className="h-4 w-4 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(b.date).toLocaleDateString("fr-FR")}
                    </p>
                    {b.reason && <p className="text-xs text-muted-foreground">{b.reason}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteBlock(b.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
