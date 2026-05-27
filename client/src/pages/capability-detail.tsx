import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Target,
  Zap,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { capabilities } from "@/data/capabilities";
import { SITE_ORIGIN } from "@/config/site";
import {
  sanityClient,
  EDGY_INSIGHTS_BY_CAPABILITY_QUERY,
  resolveFlexibleImage,
  type EdgyInsightListItem,
} from "@/lib/sanity";
import { CaseStudyCard } from "@/components/case-study-card";

export default function CapabilityDetail() {
  const { slug } = useParams();
  const capability = capabilities.find((c) => c.id === slug);

  const [relatedCases, setRelatedCases] = useState<EdgyInsightListItem[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setCasesLoading(true);
    sanityClient
      .fetch<EdgyInsightListItem[]>(EDGY_INSIGHTS_BY_CAPABILITY_QUERY, {
        capabilitySlug: slug,
      })
      .then((data) => setRelatedCases(data ?? []))
      .catch(() => setRelatedCases([]))
      .finally(() => setCasesLoading(false));
  }, [slug]);

  if (!capability) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Capability Not Found</h1>
          <Button asChild>
            <Link href="/expertise">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Expertise
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = capability.icon;
  const canonicalPath = `/expertise/${capability.id}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${capability.title} Consulting`,
    description: capability.description,
    serviceType: capability.title,
    url: `${SITE_ORIGIN}${canonicalPath}`,
    provider: {
      "@type": "Organization",
      name: "Varun Goel",
      url: `${SITE_ORIGIN}/`,
    },
    areaServed: "Worldwide",
  };

  const faqJsonLd =
    capability.faqs && capability.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: capability.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const relatedCapabilities = capabilities.filter((c) => c.id !== capability.id).slice(0, 3);

  return (
    <>
      <SEO
        title={`${capability.title} Consulting`}
        description={capability.description}
        path={canonicalPath}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 pt-24 pb-4">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          </li>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <li>
            <Link href="/expertise" className="hover:text-accent transition-colors">Expertise</Link>
          </li>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <li className="text-foreground font-medium" aria-current="page">{capability.title}</li>
        </ol>
      </nav>

      {/* ── Hero (2-column) ──────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Practice
              </span>
              <h1 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
                {capability.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {capability.description}
              </p>

              {capability.headlineMetric && (
                <div className="mt-8 inline-flex items-baseline gap-3 px-5 py-3 rounded-2xl bg-accent/10 border border-accent/20">
                  <span className="font-display font-black text-3xl md:text-4xl text-accent tracking-tighter leading-none">
                    {capability.headlineMetric.value}
                  </span>
                  <span className="text-sm text-foreground font-medium">
                    {capability.headlineMetric.label}
                  </span>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                  <Link href="/contact">
                    Book a discovery call
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href="#case-studies">See case studies</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-secondary/60 border border-border rounded-3xl p-7 space-y-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center">
                  <IconComponent className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">
                    Framework
                  </p>
                  <h3 className="font-display font-bold text-lg mb-2">
                    {capability.framework.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {capability.framework.description}
                  </p>
                </div>

                <div className="border-t border-border pt-5">
                  <div className="flex items-start gap-2.5 mb-4">
                    <Target className="w-4 h-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-1">Quick win</p>
                      <p className="text-sm text-foreground">{capability.quickWin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-1">Edgy insight</p>
                      <p className="text-sm italic text-muted-foreground">"{capability.edgyInsight}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── When this becomes the priority ───────────────────────────── */}
      {capability.painSignals && capability.painSignals.length > 0 && (
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Signals</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                When this becomes the priority
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                If two or more of these are true, this is where to start.
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capability.painSignals.map((signal, i) => (
                <FadeIn key={i}>
                  <div className="flex items-start gap-3 bg-background border border-border rounded-xl p-5 hover:border-accent/40 transition-colors">
                    <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-foreground/90 text-[15px] leading-relaxed">{signal}</p>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Methodology ─────────────────────────────────────────────── */}
      {capability.methodology && capability.methodology.length > 0 && (
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">How I work</span>
                  <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                    The methodology
                  </h2>
                </div>
                {capability.bestAs && capability.typicalDuration && (
                  <p className="text-sm text-muted-foreground max-w-md">
                    Best as a <span className="font-semibold text-foreground">{capability.bestAs}</span>.
                    Typical shape: {capability.typicalDuration}.
                  </p>
                )}
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border">
              {capability.methodology.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.1}>
                  <article className="group bg-background p-7 h-full hover:bg-secondary/60 transition-colors">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black font-display text-foreground/10 group-hover:text-accent/40 transition-colors">
                        {step.step}
                      </span>
                      {step.duration && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Numbers I move ──────────────────────────────────────────── */}
      {capability.metrics && capability.metrics.length > 0 && (
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn className="mb-8">
              <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Numbers I move
              </p>
            </FadeIn>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {capability.metrics.map((m, i) => (
                <FadeIn key={m.label} delay={i * 0.05} className="text-center">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-display font-black text-3xl md:text-4xl text-foreground tracking-tighter leading-none">
                    {m.value}
                  </dd>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug px-2">
                    {m.label}
                  </p>
                </FadeIn>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── What's inside ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Scope</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              What's inside
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              The components I cover under this capability.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capability.bullets.map((bullet, i) => (
              <FadeIn key={i}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background hover:border-accent/40 transition-colors">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-foreground/90 text-[15px]">{bullet}</span>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Approach + Outcomes (kept from original data) ───────────── */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">My approach</span>
              <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl tracking-tight mb-8">
                Step by step
              </h2>
              <ol className="space-y-4">
                {capability.approach.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>

            <FadeIn delay={0.15}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Outcomes</span>
              <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl tracking-tight mb-8">
                What you walk away with
              </h2>
              <ul className="space-y-4">
                {capability.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Related case studies (Sanity-driven) ────────────────────── */}
      <section id="case-studies" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Proof</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                  Case studies in {capability.title}
                </h2>
              </div>
              <Link href="/case-studies">
                <Button variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10">
                  All case studies <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {casesLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-secondary/50 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : relatedCases.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <Sparkles className="w-6 h-6 text-accent mx-auto mb-3" aria-hidden="true" />
              <p className="font-medium">New {capability.title.toLowerCase()} case studies coming soon.</p>
              <p className="text-sm mt-2">
                <Link href="/contact" className="text-accent hover:underline">Talk to me directly</Link>
                {" "}about engagements in flight.
              </p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {relatedCases.map((insight, i) => (
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
                  image={resolveFlexibleImage(insight.image, { width: 800, height: 450 }) ?? undefined}
                  delay={i * 0.1}
                />
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      {capability.faqs && capability.faqs.length > 0 && (
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">FAQ</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                Common questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Don't see your question? <Link href="/contact" className="text-accent font-semibold hover:underline">Ask directly</Link>.
              </p>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="space-y-3">
                {capability.faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-2xl border border-border bg-background px-6 data-[state=open]:border-accent/40"
                  >
                    <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline hover:text-accent">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Related capabilities (cards, not badges) ────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Continue</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Related expertise
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCapabilities.map((rc) => {
              const RcIcon = rc.icon;
              return (
                <FadeIn key={rc.id}>
                  <Link href={`/expertise/${rc.id}`}>
                    <article className="group h-full bg-background border border-border rounded-2xl p-6 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent transition-all duration-300">
                        <RcIcon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-2">{rc.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {rc.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all">
                        Explore <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </article>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild className="rounded-xl">
              <Link href="/expertise">
                View all {capabilities.length} capabilities
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Want to talk about {capability.title.toLowerCase()}?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              A 30-minute discovery call. No deck, no pitch. Just a working conversation about where you are and what would move the needle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="secondary" className="bg-white text-accent hover:bg-white/90 px-8 py-3">
                <Link href="/contact">
                  Book a discovery call
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-accent-foreground border-white/30 hover:bg-white/10 px-8 py-3">
                <Link href="/case-studies">
                  See case studies
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
