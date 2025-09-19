import { LucideIcon } from "lucide-react";
import { CardShell } from "@/components/ui/card-shell";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
  delay = 0,
}: ServiceCardProps) {
  
  return (
    <CardShell
      title={title}
      description={description}
      ctaText="Learn More →"
      icon={icon}
      href={href}
      delay={delay}
      dataTestId={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      ariaLabel={`Learn more about ${title}`}
      variant="default"
    />
  );
}