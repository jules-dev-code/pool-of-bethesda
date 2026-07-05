import { listFaqsAdmin } from "@/lib/actions/faq-admin";
import { FaqManager } from "@/components/dashboard/faq-manager";

export default async function FaqAdminPage() {
  const faqs = await listFaqsAdmin();
  return <FaqManager initial={faqs} />;
}
