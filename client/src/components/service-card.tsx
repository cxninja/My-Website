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
        className="card-hover elevated-card p-8 cursor-pointer group relative overflow-hidden"
        onClick={handleClick}
        data-testid={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <CardContent className="p-0 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-accent/20 group-hover:to-accent/30 transition-all duration-300">
            <Icon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-display font-bold text-xl mb-3 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
          <button className="inline-flex items-center text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200">
            <span>Learn More</span>
            <span className="ml-2 group-hover:ml-3 transition-all duration-200">→</span>
          </button>
        </CardContent>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </FadeIn>
  );
}
