import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/layout/reveal";
import { AnimatedCounter } from "@/components/layout/animated-counter";

interface StatsSectionProps {
  title: string;
  labels: {
    patients: string;
    appointments: string;
    services: string;
    days: string;
  };
}

export function StatsSection({ title, labels }: StatsSectionProps) {
  const stats = [
    { value: 1200, suffix: "+", label: labels.patients },
    { value: 3500, suffix: "+", label: labels.appointments },
    { value: 5, suffix: "", label: labels.services },
    { value: 6, suffix: "/7", label: labels.days },
  ];

  return (
    <Section className="bg-primary-950 text-white">
      <SectionHeader title={title} className="[&>h2]:text-white" />
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <div className="font-display text-4xl font-semibold text-gold md:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm text-white/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
