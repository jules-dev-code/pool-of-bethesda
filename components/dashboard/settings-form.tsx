"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Building2, Search, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { updateSettings } from "@/lib/actions/settings-admin";
import type { Settings } from "@prisma/client";

export function SettingsForm({ settings }: { settings: Settings | null }) {
  const { register, handleSubmit, watch, setValue, formState } = useForm({
    defaultValues: {
      clinicName: settings?.clinicName ?? "",
      sloganFr: settings?.sloganFr ?? "",
      sloganEn: settings?.sloganEn ?? "",
      address: settings?.address ?? "",
      phone: settings?.phone ?? "",
      email: settings?.email ?? "",
      googleMapsUrl: settings?.googleMapsUrl ?? "",
      metaTitle: settings?.metaTitle ?? "",
      metaDescription: settings?.metaDescription ?? "",
      googleAnalyticsId: settings?.googleAnalyticsId ?? "",
      orangeMoneyNumber: settings?.orangeMoneyNumber ?? "",
      orangeMoneyName: settings?.orangeMoneyName ?? "",
      orangeMoneyActive: settings?.orangeMoneyActive ?? true,
      slotDurationMin: settings?.slotDurationMin ?? 30,
      maxPerDay: settings?.maxPerDay ?? 20,
    },
  });

  const orangeMoneyActive = watch("orangeMoneyActive");

  async function onSubmit(values: Record<string, unknown>) {
    const result = await updateSettings(values);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <Building2 className="mr-1.5 h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="mr-1.5 h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="payment">
            <Wallet className="mr-1.5 h-4 w-4" />
            Paiement & RDV
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div>
              <Label>Nom du cabinet</Label>
              <Input className="mt-1.5" {...register("clinicName")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Slogan (Français)</Label>
                <Input className="mt-1.5" {...register("sloganFr")} />
              </div>
              <div>
                <Label>Slogan (Anglais)</Label>
                <Input className="mt-1.5" {...register("sloganEn")} />
              </div>
            </div>
            <div>
              <Label>Adresse</Label>
              <Input className="mt-1.5" {...register("address")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Téléphone</Label>
                <Input className="mt-1.5" {...register("phone")} />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" {...register("email")} />
              </div>
            </div>
            <div>
              <Label>Lien Google Maps</Label>
              <Input className="mt-1.5" {...register("googleMapsUrl")} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div>
              <Label>Meta Title</Label>
              <Input className="mt-1.5" {...register("metaTitle")} />
            </div>
            <div>
              <Label>Meta Description</Label>
              <Textarea className="mt-1.5" {...register("metaDescription")} />
            </div>
            <div>
              <Label>Google Analytics ID</Label>
              <Input className="mt-1.5" placeholder="G-XXXXXXXXXX" {...register("googleAnalyticsId")} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-premium">
            <div className="flex items-center gap-3">
              <Switch
                checked={orangeMoneyActive}
                onCheckedChange={(v) => setValue("orangeMoneyActive", v)}
              />
              <Label>Activer Orange Money comme mode de paiement</Label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Numéro Orange Money</Label>
                <Input className="mt-1.5" {...register("orangeMoneyNumber")} />
              </div>
              <div>
                <Label>Nom du bénéficiaire</Label>
                <Input className="mt-1.5" {...register("orangeMoneyName")} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Durée entre deux RDV (minutes)</Label>
                <Input
                  type="number"
                  className="mt-1.5"
                  {...register("slotDurationMin", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>Nombre maximum de RDV par jour</Label>
                <Input
                  type="number"
                  className="mt-1.5"
                  {...register("maxPerDay", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button type="submit" size="lg" className="mt-6" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Enregistrement..." : "Enregistrer les paramètres"}
      </Button>
    </form>
  );
}
