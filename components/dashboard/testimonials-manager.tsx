"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Star, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createTestimonial,
  toggleTestimonialApproval,
  deleteTestimonial,
} from "@/lib/actions/testimonials-admin";
import type { Testimonial } from "@prisma/client";

interface TestimonialFormValues {
  patient: string;
  commentFr: string;
  commentEn: string;
  rating: number;
}

export function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<TestimonialFormValues>({
    defaultValues: { rating: 5 },
  });

  async function onSubmit(values: TestimonialFormValues) {
    const result = await createTestimonial({
      ...values,
      rating: Number(values.rating),
    });
    if (result.success) {
      toast.success(result.message);
      reset();
      setDialogOpen(false);
      window.location.reload();
    } else {
      toast.error(result.message);
    }
  }

  function handleToggle(id: string, approved: boolean) {
    startTransition(async () => {
      const result = await toggleTestimonialApproval(id, !approved);
      if (result.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, approved: !approved } : t))
        );
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Supprimer ce témoignage ?")) return;
    startTransition(async () => {
      const result = await deleteTestimonial(id);
      if (result.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
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
            Témoignages
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Approuvez ou masquez les avis affichés sur le site.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-premium">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                  {t.patient}
                </p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggle(t.id, t.approved)}
                  disabled={isPending}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  title={t.approved ? "Masquer" : "Approuver"}
                >
                  {t.approved ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">« {t.commentFr} »</p>
            <span
              className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                t.approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {t.approved ? "Publié" : "En attente"}
            </span>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau témoignage</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Nom du patient</Label>
              <Input className="mt-1.5" {...register("patient", { required: true })} />
            </div>
            <div>
              <Label>Commentaire (Français)</Label>
              <Textarea className="mt-1.5" {...register("commentFr", { required: true })} />
            </div>
            <div>
              <Label>Commentaire (Anglais)</Label>
              <Textarea className="mt-1.5" {...register("commentEn", { required: true })} />
            </div>
            <div>
              <Label>Note (1 à 5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                className="mt-1.5"
                {...register("rating", { valueAsNumber: true })}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
