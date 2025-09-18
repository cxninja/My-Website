import { Card, CardContent } from "@/components/ui/card";
import { MetricChip } from "./metric-chip";
import { FadeIn } from "./motion/fade-in";

interface Metric {
  label: string;
  delta: number;
  unit: string;
}

interface CaseStudyCardProps {
  title: string;
  industry: string;
  year: number;
  summary: string;
  metrics: Metric[];
  slug: string;
  image?: string;
  delay?: number;
}

export function CaseStudyCard({ 
  title, 
  industry, 
  year, 
  summary, 
  metrics, 
  slug,
  image,
  delay = 0 
}: CaseStudyCardProps) {
  const handleClick = () => {
    // Navigate to edgy insight detail page
    window.location.href = `/edgy-insights/${slug}`;
  };

  return (
    <FadeIn delay={delay}>
      <Card 
        className="standard-card overflow-hidden cursor-pointer h-full group"
        onClick={handleClick}
        data-testid={`edgy-insight-card-${slug}`}
      >
        <CardContent className="p-0">
          {image && (
            <div className="relative overflow-hidden mb-4">
              <img 
                src={image}
                alt={title}
                className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}
          <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground">
              {industry}
            </span>
            <span className="text-xs text-muted-foreground">{year}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{summary}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {metrics.map((metric, index) => (
              <MetricChip
                key={metric.label}
                label={metric.label}
                delta={metric.delta}
                unit={metric.unit}
                delay={delay + index * 0.1}
              />
            ))}
          </div>
          
            <button className="text-accent text-sm font-medium hover:underline">
              View Details →
            </button>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
