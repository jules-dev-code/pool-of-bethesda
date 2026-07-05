"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import { createFaq, updateFaq, deleteFaq, type FaqInput } from "@/lib/actions/faq-admin";
import type { Faq } from "@prisma/client";

export function FaqManager({ initial }: { initial: Faq[] }) {
  const [faqs, setFaqs] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);

  const { register, handleSubmit, reset } = useForm<FaqInput>({
    values: editing
      ? {
          questionFr: editing.questionFr,
          questionEn: editing.questionEn,
          answerFr: editing.answerFr,
          answerEn: editing.answerEn,
          category: editing.category,
        }
      : { questionFr: "", questionEn: "", answerFr: "", answerEn: "", category: "general" },
  });

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(faq: Faq) {
    setEditing(faq);
    setDialogOpen(true);
  }

  async function onSubmit(values: FaqInput) {
    const result = editing ? await updateFaq(editing.id, values) : await createFaq(values);
    if (result.success) {
      toast.success(result.message);
      reset();
      setDialogOpen(false);
      window.location.reload();
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette question ?")) return;
    const result = await deleteFaq(id);
    if (result.success) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
            FAQ
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez les questions fréquentes affichées sur le site.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Nouvelle question
        </Button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-premium"
          >
            <div>
              <p className="font-heading text-sm font-semibold text-primary-950 dark:text-white">
                {faq.questionFr}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{faq.answerFr}</p>
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                {faq.category}
              </span>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => openEdit(faq)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-primary/5 hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier la question" : "Nouvelle question"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Question (Français)</Label>
                <Input className="mt-1.5" {...register("questionFr", { required: true })} />
              </div>
              <div>
                <Label>Question (Anglais)</Label>
                <Input className="mt-1.5" {...register("questionEn", { required: true })} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Réponse (Français)</Label>
                <Textarea className="mt-1.5" {...register("answerFr", { required: true })} />
              </div>
              <div>
                <Label>Réponse (Anglais)</Label>
                <Textarea className="mt-1.5" {...register("answerEn", { required: true })} />
              </div>
            </div>
            <div>
              <Label>Catégorie</Label>
              <Input
                className="mt-1.5"
                placeholder="general, soins, paiement, rendez-vous"
                {...register("category")}
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">{editing ? "Enregistrer" : "Créer"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
