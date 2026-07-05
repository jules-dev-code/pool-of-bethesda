import type { Metadata } from "next";

export const revalidate = 3600; // ISR : régénération toutes les heures
import { notFound } from "next/navigation";
import Link from "next/link";
import * as Icons from "lucide-react";
import { Clock, CheckCircle2, ListChecks, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/seo/schema";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.titleFr,
    description: service.shortFr,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ??
    Icons.Stethoscope;

  return (
    <>
      <JsonLd data={getServiceSchema(service, "fr")} />
      <JsonLd
        data={getBreadcrumbSchema(
          [
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.titleFr, path: `/services/${service.slug}` },
          ],
          "fr"
        )}
      />
      <section className="bg-gradient-to-b from-primary-50 to-white pb-16 pt-40 dark:from-primary-900 dark:to-primary-950">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold text-primary-950 dark:text-white md:text-5xl">
              {service.titleFr}
            </h1>
            <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
              {service.descriptionFr}
            </p>
            <div className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Durée estimée : {service.duration} minutes
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link href={`/booking?service=${service.slug}`}>
                Réserver ce service
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="container grid gap-10 pb-24 md:grid-cols-3">
        <Reveal className="rounded-2xl border border-border bg-card p-7 shadow-premium">
          <CheckCircle2 className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-4 font-heading text-lg font-semibold text-primary-950 dark:text-white">
            Bénéfices
          </h3>
          <ul className="mt-3 space-y-2">
            {service.benefitsFr.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-7 shadow-premium">
          <ListChecks className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-4 font-heading text-lg font-semibold text-primary-950 dark:text-white">
            Déroulement
          </h3>
          <ol className="mt-3 space-y-2">
            {service.processFr.map((p, i) => (
              <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.2} className="rounded-2xl border border-border bg-card p-7 shadow-premium">
          <ShieldAlert className="h-7 w-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-4 font-heading text-lg font-semibold text-primary-950 dark:text-white">
            Conseils après le soin
          </h3>
          <ul className="mt-3 space-y-2">
            {service.aftercareFr.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <CtaSection
        locale="fr"
        title="Prêt à prendre soin de votre sourire ?"
        buttonLabel="Prendre rendez-vous"
      />
    </>
  );
}
