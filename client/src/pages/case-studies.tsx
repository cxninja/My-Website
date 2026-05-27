import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { CaseStudyCard } from "@/components/case-study-card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FilterGroup, FilterSection } from "@/components/filter-group";
import { Link } from "wouter";
import { Layers, Network, Calendar, TrendingUp, X } from "lucide-react";
import { SITE_ORIGIN } from "@/config/site";
import {
  sanityClient,
  ALL_EDGY_INSIGHTS_QUERY,
  resolveFlexibleImage,
  type EdgyInsightListItem,
} from "@/lib/sanity";

function toggleSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export default function CaseStudies() {
  const [insights, setInsights] = useState<EdgyInsightListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selIndustries, setSelIndustries] = useState<Set<string>>(new Set());
  const [selCapabilities, setSelCapabilities] = useState<Set<string>>(new Set());
  const [selYears, setSelYears] = useState<Set<string>>(new Set());
  const [impactRange, setImpactRange] = useState<[number, number]>([0, 0]);
  const [maxDelta, setMaxDelta] = useState(0);

  useEffect(() => {
    sanityClient
      .fetch<EdgyInsightListItem[]>(ALL_EDGY_INSIGHTS_QUERY)
      .then((data) => {
        setInsights(data);
        const globalMax = Math.max(
          0,
          ...data.flatMap((i) => (i.metrics ?? []).map((m) => Math.abs(m.delta)))
        );
        setMaxDelta(globalMax);
        setImpactRange([0, globalMax]);
      })
      .catch((e) => setError(e.message ?? "Failed to load insights"));
  }, []);

  const { industries, capabilities, years, counts } = useMemo(() => {
    if (!insights)
      return {
        industries: [] as string[],
        capabilities: [] as string[],
        years: [] as string[],
        counts: { ind: {}, cap: {}, yr: {} } as {
          ind: Record<string, number>;
          cap: Record<string, number>;
          yr: Record<string, number>;
        },
      };
    const ind: Record<string, number> = {};
    const cap: Record<string, number> = {};
    const yr: Record<string, number> = {};
    for (const i of insights) {
      ind[i.industry] = (ind[i.industry] ?? 0) + 1;
      for (const c of i.capabilities ?? []) cap[c] = (cap[c] ?? 0) + 1;
      const y = String(i.year);
      yr[y] = (yr[y] ?? 0) + 1;
    }
    return {
      industries: Object.keys(ind).sort(),
      capabilities: Object.keys(cap).sort(),
      years: Object.keys(yr).sort((a, b) => Number(b) - Number(a)),
      counts: { ind, cap, yr },
    };
  }, [insights]);

  const impactActive = maxDelta > 0 && (impactRange[0] > 0 || impactRange[1] < maxDelta);

  const filtered = useMemo(() => {
    if (!insights) return [];
    return insights.filter((i) => {
      if (selIndustries.size && !selIndustries.has(i.industry)) return false;
      if (selCapabilities.size && !(i.capabilities ?? []).some((c) => selCapabilities.has(c)))
        return false;
      if (selYears.size && !selYears.has(String(i.year))) return false;
      const insightMax = Math.max(
        0,
        ...(i.metrics ?? []).map((m) => Math.abs(m.delta))
      );
      if (insightMax < impactRange[0] || insightMax > impactRange[1]) return false;
      return true;
    });
  }, [insights, selIndustries, selCapabilities, selYears, impactRange]);

  const activeFilterCount =
    selIndustries.size +
    selCapabilities.size +
    selYears.size +
    (impactActive ? 1 : 0);

  const clearAll = () => {
    setSelIndustries(new Set());
    setSelCapabilities(new Set());
    setSelYears(new Set());
    setImpactRange([0, maxDelta]);
  };

  // CollectionPage JSON-LD with ItemList of case studies for richer SERP coverage.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies | Varun Goel",
    url: `${SITE_ORIGIN}/case-studies`,
    description:
      "Story-driven transformation case studies across industries, with metrics and lessons.",
    hasPart: (insights ?? []).slice(0, 20).map((i) => ({
      "@type": "Article",
      headline: i.title,
      url: `${SITE_ORIGIN}/case-studies/${i.slug}`,
      articleSection: i.industry,
    })),
  };

  return (
    <>
      <SEO
        title="Case Studies | Transformation Stories"
        description="Story-driven case studies across industries. Every one backed by numbers and the lessons that translate to your business."
        path="/case-studies"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
      </Helmet>

      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Edgy Insights: <span className="text-accent">Bursts of Real Impact</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Story-driven transformation narratives with visuals and takeaways.
              Each insight reveals lessons from explosive business transformations. Your edge awaits.
            </p>
          </FadeIn>
        </div>
      </section>

      <main className="relative w-full pt-12 pb-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sidebar filters */}
          <aside className="col-span-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28 bg-secondary/60 border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-foreground">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1"
                    data-testid="button-reset-filters"
                  >
                    <X className="w-3 h-3" />
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>

              <FilterGroup
                icon={Layers}
                title="Industry"
                options={industries}
                selected={selIndustries}
                onToggle={(v) => setSelIndustries(toggleSet(selIndustries, v))}
                counts={counts.ind}
                defaultOpen
              />

              <FilterGroup
                icon={Network}
                title="Capability"
                options={capabilities}
                selected={selCapabilities}
                onToggle={(v) => setSelCapabilities(toggleSet(selCapabilities, v))}
                counts={counts.cap}
              />

              <FilterGroup
                icon={Calendar}
                title="Year"
                options={years}
                selected={selYears}
                onToggle={(v) => setSelYears(toggleSet(selYears, v))}
                counts={counts.yr}
              />

              {maxDelta > 0 && (
                <FilterSection
                  icon={TrendingUp}
                  title="Impact range"
                  activeCount={impactActive ? 1 : 0}
                >
                  <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{impactRange[0].toLocaleString()}</span>
                    <span>{impactRange[1].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={impactRange}
                    onValueChange={(v) => setImpactRange([v[0], v[1]])}
                    max={maxDelta}
                    min={0}
                    step={Math.max(1, Math.floor(maxDelta / 100))}
                    className="w-full"
                    data-testid="slider-impact-range"
                  />
                </FilterSection>
              )}
            </div>
          </aside>

          {/* Results */}
          <section className="col-span-1 lg:col-span-9">
            {error && (
              <div className="p-6 border border-destructive/30 bg-destructive/5 rounded-lg text-sm mb-6">
                Couldn't load insights: {error}
              </div>
            )}

            {!insights && !error && (
              <div className="grid md:grid-cols-2 gap-8" data-testid="insights-loading">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-xl bg-muted/40 animate-pulse" />
                ))}
              </div>
            )}

            {insights && (
              <>
                <FadeIn className="mb-6">
                  <p className="text-muted-foreground text-sm">
                    Showing {filtered.length} of {insights.length} edgy insights
                  </p>
                </FadeIn>

                {filtered.length > 0 ? (
                  <StaggerContainer className="grid md:grid-cols-2 gap-8">
                    {filtered.map((insight, index) => (
                      <CaseStudyCard
                        key={insight.slug}
                        title={insight.title}
                        industry={insight.industry}
                        year={insight.year}
                        summary={insight.summary}
                        metrics={(insight.metrics ?? []).map((m) => ({
                          label: m.label,
                          delta: m.delta,
                          unit: m.unit ?? "",
                        }))}
                        slug={insight.slug}
                        image={
                          resolveFlexibleImage(insight.image, { width: 800, height: 450 }) ??
                          undefined
                        }
                        delay={index * 0.05}
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
                        onClick={clearAll}
                        variant="outline"
                        data-testid="button-no-results-reset"
                      >
                        Reset All Filters
                      </Button>
                    </div>
                  </FadeIn>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Want results like these?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Every edgy insight started with bold action. Let's discuss how to unleash
              similar explosive results in your transformation journey.
            </p>
            <Link href="/contact">
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
