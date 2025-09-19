import { useState, useMemo } from "react";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { CaseStudyCard } from "@/components/case-study-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link } from "wouter";
import edgyInsights from "@/data/edgy-insights.json";

type EdgyInsight = typeof edgyInsights[0];

const industries = ["All", ...Array.from(new Set(edgyInsights.map(ei => ei.industry)))];
const capabilities = ["All", ...Array.from(new Set(edgyInsights.flatMap(ei => ei.capabilities)))];
const years = Array.from(new Set(edgyInsights.map(ei => ei.year))).sort((a, b) => b - a);

// Calculate global max delta for proper filter range
const globalMaxDelta = Math.max(...edgyInsights.flatMap(ei => ei.metrics.map(m => Math.abs(m.delta))));

export default function CaseStudies() {
  const [industryFilter, setIndustryFilter] = useState("All");
  const [capabilityFilter, setCapabilityFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [impactRange, setImpactRange] = useState([0, globalMaxDelta]);

  const filteredEdgyInsights = useMemo(() => {
    return edgyInsights.filter((insight) => {
      // Industry filter
      if (industryFilter !== "All" && insight.industry !== industryFilter) {
        return false;
      }

      // Capability filter
      if (capabilityFilter !== "All" && !insight.capabilities.includes(capabilityFilter)) {
        return false;
      }

      // Year filter
      if (yearFilter !== "All" && insight.year.toString() !== yearFilter) {
        return false;
      }

      // Impact range filter (based on max delta in metrics)
      const maxDelta = Math.max(...insight.metrics.map(m => Math.abs(m.delta)));
      if (maxDelta < impactRange[0] || maxDelta > impactRange[1]) {
        return false;
      }

      return true;
    });
  }, [industryFilter, capabilityFilter, yearFilter, impactRange]);

  const handleResetFilters = () => {
    setIndustryFilter("All");
    setCapabilityFilter("All");
    setYearFilter("All");
    setImpactRange([0, globalMaxDelta]);
  };

  return (
    <>
      <SEO 
        title="Edgy Insights: 6 Transformation Narratives | Varun Goel"
        description="Explore 6 story-driven insights showcasing real transformation bursts across industries. From retention revolutions to stakeholder sync - bursts of real impact."
      />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Edgy Insights: <span className="text-accent">Bursts of Real Impact</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Story-driven transformation narratives with visuals and takeaways. 
              Each insight reveals lessons from explosive business transformations—your edge awaits.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <label htmlFor="industry-filter" className="block text-sm font-medium mb-2">
                    Industry
                  </label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-48" data-testid="select-industry-filter">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="capability-filter" className="block text-sm font-medium mb-2">
                    Capability
                  </label>
                  <Select value={capabilityFilter} onValueChange={setCapabilityFilter}>
                    <SelectTrigger className="w-48" data-testid="select-capability-filter">
                      <SelectValue placeholder="Select capability" />
                    </SelectTrigger>
                    <SelectContent>
                      {capabilities.map((capability) => (
                        <SelectItem key={capability} value={capability}>
                          {capability}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="year-filter" className="block text-sm font-medium mb-2">
                    Year
                  </label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="w-32" data-testid="select-year-filter">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="ml-auto"
                data-testid="button-reset-filters"
              >
                Reset Filters
              </Button>
            </div>

            <div className="max-w-md">
              <label htmlFor="impact-range" className="block text-sm font-medium mb-2">
                Impact Range: {impactRange[0].toLocaleString()} - {impactRange[1].toLocaleString()}
              </label>
              <Slider
                value={impactRange}
                onValueChange={setImpactRange}
                max={globalMaxDelta}
                min={0}
                step={Math.max(1, Math.floor(globalMaxDelta / 100))}
                className="w-full"
                data-testid="slider-impact-range"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredEdgyInsights.length} of {edgyInsights.length} edgy insights
            </p>
          </FadeIn>

          {filteredEdgyInsights.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEdgyInsights.map((insight, index) => (
                <CaseStudyCard
                  key={insight.slug}
                  title={insight.title}
                  industry={insight.industry}
                  year={insight.year}
                  summary={insight.summary}
                  metrics={insight.metrics}
                  slug={insight.slug}
                  image={insight.image}
                  delay={index * 0.1}
                />
              ))}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <h3 className="font-semibold text-xl mb-2">No edgy insights found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more transformation stories.
                </p>
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  data-testid="button-no-results-reset"
                >
                  Reset All Filters
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Create Your NovaTransform?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Every edgy insight started with bold action. Let's discuss how to unleash 
              similar explosive results in your transformation journey.
            </p>
            <Link href="/connect">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-connect-edgy-insights-cta"
              >
                Ignite Your Edge
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
