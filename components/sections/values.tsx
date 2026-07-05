import { Section, SectionHeader } from "@/components/layout/section";
import { StaggerContainer, StaggerItem } from "@/components/layout/reveal";
import { IconFeatureCard } from "@/components/cards/icon-feature-card";

const ICON_NAMES = ["Award", "ShieldCheck", "Ear", "Lightbulb", "HandHeart", "Star"];

interface ValuesSectionProps {
  title: string;
  items: { title: string; description: string }[];
}

export function ValuesSection({ title, items }: ValuesSectionProps) {
  return (
    <Section className="bg-secondary/40">
      <SectionHeader title={title} />
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <StaggerItem key={item.title}>
            <IconFeatureCard
              icon={ICON_NAMES[i % ICON_NAMES.length]}
              title={item.title}
              description={item.description}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}