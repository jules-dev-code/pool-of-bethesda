"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/lib/actions/profile-admin";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { register, handleSubmit, reset, formState } = useForm<ChangePasswordValues>();

  async function onSubmit(values: ChangePasswordValues) {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    const result = await changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    if (result.success) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Mon profil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez votre compte et votre sécurité.
        </p>
      </div>

      <div className="max-w-lg rounded-2xl border border-border bg-card p-6 shadow-premium">
        <div className="mb-5 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-base font-semibold text-primary-950 dark:text-white">
            Changer le mot de passe
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Mot de passe actuel</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("currentPassword", { required: true })}
            />
          </div>
          <div>
            <Label>Nouveau mot de passe</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("newPassword", { required: true, minLength: 8 })}
            />
          </div>
          <div>
            <Label>Confirmer le nouveau mot de passe</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("confirmPassword", { required: true })}
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Mise à jour..." : "Mettre à jour le mot de passe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
