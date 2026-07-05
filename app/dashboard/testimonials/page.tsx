import { listTestimonialsAdmin } from "@/lib/actions/testimonials-admin";
import { TestimonialsManager } from "@/components/dashboard/testimonials-manager";

export default async function TestimonialsAdminPage() {
  const testimonials = await listTestimonialsAdmin();
  return <TestimonialsManager initial={testimonials} />;
}
