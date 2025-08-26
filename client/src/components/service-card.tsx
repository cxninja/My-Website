import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "./motion/fade-in";

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
  icon: Icon, 
  href,
  delay = 0 
}: ServiceCardProps) {
  const handleClick = () => {
    // Scroll to services section on same page, or navigate if different page
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <FadeIn delay={delay}>
      <Card 
        className="card-hover bg-card p-6 border border-border cursor-pointer group"
        onClick={handleClick}
        data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <CardContent className="p-0">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <button className="text-accent text-sm font-medium hover:underline">
            Learn More →
          </button>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
