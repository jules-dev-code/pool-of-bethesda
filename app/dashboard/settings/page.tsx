import { getSettings } from "@/lib/actions/settings-admin";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Informations du cabinet, SEO et configuration des rendez-vous.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
