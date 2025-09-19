import { CardShell } from "@/components/ui/card-shell";
import { MetricChip } from "./metric-chip";

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
  // Create enhanced description with metrics
  const enhancedDescription = (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{summary}</p>
      
      <div className="flex flex-wrap gap-2">
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
    </div>
  );

  return (
    <CardShell
      title={title}
      description={enhancedDescription}
      meta={`${industry} • ${year}`}
      ctaText="View Details →"
      image={image}
      imageAlt={title}
      href={`/edgy-insights/${slug}`}
      delay={delay}
      dataTestId={`edgy-insight-card-${slug}`}
      ariaLabel={`View details for ${title}`}
      variant="default"
    />
  );
}