import { listAppointments } from "@/lib/actions/appointments-admin";
import { AppointmentsTable } from "@/components/dashboard/appointments-table";

export default async function AppointmentsPage() {
  const appointments = await listAppointments();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
          Rendez-vous
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez, filtrez et exportez l'ensemble des rendez-vous du cabinet.
        </p>
      </div>

      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
