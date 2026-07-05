import { listServicesAdmin } from "@/lib/actions/services-admin";
import { ServicesManager } from "@/components/dashboard/services-manager";

export default async function ServicesAdminPage() {
  const services = await listServicesAdmin();
  return <ServicesManager initialServices={services} />;
}
