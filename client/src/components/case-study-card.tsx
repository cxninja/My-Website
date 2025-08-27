import React from "react";
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
  delay?: number;
}

export function CaseStudyCard({ 
  title, 
  industry, 
  year, 
  summary, 
  metrics, 
  slug,
  delay = 0 
}: CaseStudyCardProps) {
  const handleClick = () => {
    // Navigate to case study detail page
    if (typeof window !== 'undefined') {
      window.location.href = `/case-studies/${slug}`;
    }
  };

  return (
    <FadeIn delay={delay}>
      <Card 
        className="card-hover bg-card p-6 border border-border cursor-pointer"
        onClick={handleClick}
        data-testid={`case-study-card-${slug}`}
      >
        <CardContent className="p-0">
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
        </CardContent>
      </Card>
    </FadeIn>
  );
}
