import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Search, Layers, Network, Tag, BarChart3, Star, X,
  Download, ArrowRight, FileText, Clock,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FilterGroup } from "@/components/filter-group";
import { toolkitResources, getToolkitFilters, ToolkitResource } from "@/data/toolkit";

const { types, categories, capabilities, difficulties } = getToolkitFilters();

const typeLabels: Record<ToolkitResource["type"], string> = {
  pdf: "PDF Guide",
  worksheet: "Worksheet",
  checklist: "Checklist",
  template: "Template",
  guide: "Guide",
  framework: "Framework",
};

const categoryLabels: Record<ToolkitResource["category"], string> = {
  "customer-success": "Customer Success",
  marketing: "Marketing",
  transformation: "Transformation",
  leadership: "Leadership",
  "ai-innovation": "AI Innovation",
  strategy: "Strategy",
};

const difficultyLabels: Record<ToolkitResource["difficulty"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

type FilterKind = "category" | "capability" | "type" | "difficulty";

interface ActiveFilter {
  kind: FilterKind;
  value: string;
  label: string;
}

function toggleSet(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

// FilterGroup lives in @/components/filter-group and is shared with /edgy-insights.

export default function Toolkit() {
  const [query, setQuery] = useState("");
  const [selCategories, setSelCategories] = useState<Set<string>>(new Set());
  const [selCapabilities, setSelCapabilities] = useState<Set<string>>(new Set());
  const [selTypes, setSelTypes] = useState<Set<string>>(new Set());
  const [selDifficulties, setSelDifficulties] = useState<Set<string>>(new Set());
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const counts = useMemo(() => {
    const byCat: Record<string, number> = {};
    const byCap: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byDiff: Record<string, number> = {};
    for (const r of toolkitResources) {
      byCat[r.category] = (byCat[r.category] ?? 0) + 1;
      byCap[r.capability] = (byCap[r.capability] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byDiff[r.difficulty] = (byDiff[r.difficulty] ?? 0) + 1;
    }
    return { byCat, byCap, byType, byDiff };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return toolkitResources.filter((r) => {
      if (selCategories.size && !selCategories.has(r.category)) return false;
      if (selCapabilities.size && !selCapabilities.has(r.capability)) return false;
      if (selTypes.size && !selTypes.has(r.type)) return false;
      if (selDifficulties.size && !selDifficulties.has(r.difficulty)) return false;
      if (featuredOnly && !r.featured) return false;
      if (q && !(r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, selCategories, selCapabilities, selTypes, selDifficulties, featuredOnly]);

  const activeFilters: ActiveFilter[] = [
    ...Array.from(selCategories).map((v) => ({
      kind: "category" as FilterKind, value: v, label: `Category: ${categoryLabels[v as ToolkitResource["category"]] ?? v}`,
    })),
    ...Array.from(selCapabilities).map((v) => ({
      kind: "capability" as FilterKind, value: v, label: `Capability: ${v}`,
    })),
    ...Array.from(selTypes).map((v) => ({
      kind: "type" as FilterKind, value: v, label: `Type: ${typeLabels[v as ToolkitResource["type"]] ?? v}`,
    })),
    ...Array.from(selDifficulties).map((v) => ({
      kind: "difficulty" as FilterKind, value: v, label: `Level: ${difficultyLabels[v as ToolkitResource["difficulty"]] ?? v}`,
    })),
  ];

  const removeFilter = (f: ActiveFilter) => {
    if (f.kind === "category") setSelCategories(toggleSet(selCategories, f.value));
    if (f.kind === "capability") setSelCapabilities(toggleSet(selCapabilities, f.value));
    if (f.kind === "type") setSelTypes(toggleSet(selTypes, f.value));
    if (f.kind === "difficulty") setSelDifficulties(toggleSet(selDifficulties, f.value));
  };

  const clearAll = () => {
    setSelCategories(new Set());
    setSelCapabilities(new Set());
    setSelTypes(new Set());
    setSelDifficulties(new Set());
    setFeaturedOnly(false);
    setQuery("");
  };

  return (
    <>
      <Helmet>
        <title>AI Playbook — Frameworks & Artifacts | NovaTransform</title>
        <meta
          name="description"
          content={`Downloadable blueprints, operational cadences, and evaluation matrices. ${toolkitResources.length} free transformation resources from Varun Goel.`}
        />
      </Helmet>

      <main className="relative w-full pt-32 pb-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Playbook Hero */}
        <section className="py-16 flex flex-col items-start relative mb-8 border-b border-border pb-16">
          <FadeIn delay={0.1}>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
              The Laboratory
            </span>
          </FadeIn>
          <FadeIn delay={0.25}>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] uppercase font-display mb-6">
              Frameworks & <br />
              <span className="text-muted-foreground">Artifacts.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Downloadable blueprints, operational cadences, and evaluation matrices used to deploy enterprise transformation at scale. Theory translated into executable artifacts.
            </p>
          </FadeIn>
        </section>

        {/* Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Filters */}
          <aside className="col-span-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28 bg-secondary/60 border border-border rounded-2xl p-6">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search artifacts..."
                    className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <FilterGroup
                icon={Layers}
                title="Category"
                options={categories}
                selected={selCategories}
                onToggle={(v) => setSelCategories(toggleSet(selCategories, v))}
                counts={counts.byCat}
                labelMap={categoryLabels as unknown as Record<string, string>}
                defaultOpen
              />

              <FilterGroup
                icon={Network}
                title="Capability"
                options={capabilities}
                selected={selCapabilities}
                onToggle={(v) => setSelCapabilities(toggleSet(selCapabilities, v))}
                counts={counts.byCap}
              />

              <FilterGroup
                icon={Tag}
                title="Type"
                options={types}
                selected={selTypes}
                onToggle={(v) => setSelTypes(toggleSet(selTypes, v))}
                counts={counts.byType}
                labelMap={typeLabels as unknown as Record<string, string>}
              />

              <FilterGroup
                icon={BarChart3}
                title="Difficulty"
                options={difficulties}
                selected={selDifficulties}
                onToggle={(v) => setSelDifficulties(toggleSet(selDifficulties, v))}
                counts={counts.byDiff}
                labelMap={difficultyLabels as unknown as Record<string, string>}
              />

              {/* Featured toggle */}
              <button
                onClick={() => setFeaturedOnly((v) => !v)}
                className={`w-full flex items-center gap-2 justify-center text-sm rounded-lg px-3 py-2 border transition-colors ${
                  featuredOnly
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-background border-border text-foreground hover:border-accent/40"
                }`}
              >
                <Star className="w-4 h-4" />
                Featured only
              </button>
            </div>
          </aside>

          {/* Right: Grid */}
          <div className="col-span-1 lg:col-span-9">
            {/* Active filters */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold whitespace-nowrap">
                {filtered.length} of {toolkitResources.length}
              </span>
              {activeFilters.length > 0 && (
                <>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold whitespace-nowrap">
                    · Active:
                  </span>
                  {activeFilters.map((f) => (
                    <button
                      key={`${f.kind}:${f.value}`}
                      onClick={() => removeFilter(f)}
                      className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-3 py-1.5 whitespace-nowrap hover:border-accent/40 transition-colors"
                    >
                      <span className="text-xs">{f.label}</span>
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  ))}
                  <button
                    onClick={clearAll}
                    className="text-xs text-accent hover:text-foreground underline underline-offset-4 ml-2 whitespace-nowrap"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <FadeIn key={r.id} delay={Math.min(i * 0.05, 0.4)}>
                      <article className="group relative bg-secondary border border-border rounded-2xl p-6 flex flex-col h-full overflow-hidden hover:border-accent/40 transition-colors">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[100%]" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center text-accent">
                            <Icon className="w-5 h-5" />
                          </div>
                          {r.featured ? (
                            <span className="bg-accent/10 text-accent border border-accent/20 text-[10px] uppercase tracking-wider px-2 py-1 rounded font-mono">
                              Featured
                            </span>
                          ) : (
                            <span className="bg-muted text-muted-foreground border border-border text-[10px] uppercase tracking-wider px-2 py-1 rounded font-mono">
                              {difficultyLabels[r.difficulty]}
                            </span>
                          )}
                        </div>

                        <div className="mb-4 flex-grow relative z-10">
                          <h3 className="text-base md:text-lg font-bold mb-2 font-display">{r.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{r.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                          <span className="text-[10px] bg-background text-muted-foreground px-2 py-1 rounded border border-border font-mono">
                            {typeLabels[r.type]}
                          </span>
                          <span className="text-[10px] bg-background text-muted-foreground px-2 py-1 rounded border border-border font-mono">
                            {r.capability}
                          </span>
                          <span className="text-[10px] bg-background text-muted-foreground px-2 py-1 rounded border border-border font-mono">
                            {r.format.split(/[+/]/)[0].trim()}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-4 relative z-10">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {r.timeToComplete}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {r.fileSize}
                          </span>
                          {r.pages && <span>{r.pages} pages</span>}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border relative z-10">
                          <Link
                            href={r.downloadUrl}
                            className="text-sm font-bold tracking-wide flex items-center gap-2 hover:text-accent transition-colors"
                          >
                            Request access <ArrowRight className="w-3 h-3" />
                          </Link>
                          <Link
                            href={r.downloadUrl}
                            className="w-8 h-8 rounded-lg bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground flex items-center justify-center transition-colors border border-border"
                            aria-label={`Download ${r.title}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </article>
                    </FadeIn>
                  );
                })}
              </div>
            ) : (
              <FadeIn>
                <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">No artifacts found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting filters or clearing the search.</p>
                  <Button onClick={clearAll} variant="outline">Clear all filters</Button>
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {/* CTA */}
        <section className="mt-24">
          <FadeIn>
            <div className="bg-gradient-to-r from-accent/10 to-secondary p-8 md:p-12 rounded-2xl border border-border text-center">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3">Need something specific?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find exactly what you need? I create custom playbooks tailored to your transformation challenges and industry context.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/connect">Request custom playbook</Link>
                </Button>
                {/* Innovations link hidden
                <Button variant="outline" asChild>
                  <Link href="/innovations">Explore AI tools</Link>
                </Button>
                */}
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
}
