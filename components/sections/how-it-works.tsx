import { ClipboardList, CalendarCheck, MailCheck, Smile } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
import { StaggerContainer, StaggerItem } from "@/components/layout/reveal";

const ICONS = [ClipboardList, CalendarCheck, MailCheck, Smile];

interface HowItWorksProps {
  title: string;
  steps: { title: string; description: string }[];
}

export function HowItWorks({ title, steps }: HowItWorksProps) {
  return (
    <Section className="bg-secondary/40">
      <SectionHeader title={title} />
      <StaggerContainer className="relative grid gap-10 md:grid-cols-4">
        {/* Ligne de connexion (desktop) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />

        {steps.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-elevated">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="mt-4 font-heading text-xs font-semibold uppercase tracking-widest text-gold-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-base font-semibold text-primary-950 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
