import { listOpeningHours, listBlockedSlots } from "@/lib/actions/availability-admin";
import { AvailabilityManager } from "@/components/dashboard/availability-manager";

export default async function AvailabilityPage() {
  const [hours, blocked] = await Promise.all([listOpeningHours(), listBlockedSlots()]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Disponibilités
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez les horaires d'ouverture et les congés du cabinet.
        </p>
      </div>
      <AvailabilityManager initialHours={hours} initialBlocked={blocked} />
    </div>
  );
}
