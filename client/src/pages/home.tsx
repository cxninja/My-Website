import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  Quote,
  Crown,
  BarChart3,
  Settings,
  Compass,
  Stethoscope,
  Rocket,
  TrendingUp,
  Check,
  X as XIcon,
  ArrowRight,
  Factory,
  Cloud,
  ShoppingBag,
  Landmark,
  HeartPulse,
  Truck,
  Store,
  GraduationCap,
} from "lucide-react";

import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { SEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capabilities } from "@/data/capabilities";
import {
  sanityClient,
  ALL_EDGY_INSIGHTS_QUERY,
  POSTS_QUERY,
  resolveFlexibleImage,
  postUrl,
  type EdgyInsightListItem,
  type PostListItem,
} from "@/lib/sanity";
import testimonials from "@/data/testimonials.json";

// ─── Static data ─────────────────────────────────────────────────────────────

// Impact numbers reused from the capability claims already shown in the header.
// Keep these in sync with /capability/* descriptions.
const impactStats = [
  { value: "19+", label: "Years across ops & growth" },
  { value: "95%+", label: "Customer retention" },
  { value: "40%+", label: "Lead growth on managed campaigns" },
  { value: "35%+", label: "Operational efficiency lift" },
  { value: "8", label: "Industries served" },
  { value: "AI-first", label: "Default execution model" },
];

const methodology = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    duration: "Week 1–2",
    body: "Deep-dive into your current state: data, processes, teams, and constraints. No assumptions imported from other engagements.",
  },
  {
    n: "02",
    icon: Stethoscope,
    title: "Diagnose",
    duration: "Week 2–4",
    body: "Pinpoint the structural causes, not symptoms. Prioritise interventions by ROI, time-to-value, and organisational readiness.",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Deploy",
    duration: "Week 4–12",
    body: "Ship the first measurable win inside 90 days. Implementation alongside your team, not over the wall to consultants.",
  },
  {
    n: "04",
    icon: TrendingUp,
    title: "Compound",
    duration: "Quarter 2+",
    body: "Hand over playbooks, dashboards, and an enablement plan so the gains keep compounding after I leave the room.",
  },
];

const industries = [
  { name: "Manufacturing", icon: Factory },
  { name: "SaaS & Software", icon: Cloud },
  { name: "E-commerce", icon: ShoppingBag },
  { name: "Financial Services", icon: Landmark },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Logistics", icon: Truck },
  { name: "Retail", icon: Store },
  { name: "Education", icon: GraduationCap },
];

const differentiationRows: { trad: string; nova: string }[] = [
  { trad: "Junior analysts produce slides, partner shows up for sign-off", nova: "Senior operator does the work alongside your team" },
  { trad: "Generic playbook applied to your business", nova: "Architecture built from your data, your constraints, your customers" },
  { trad: "12-month roadmap, value at month 9", nova: "First measurable win inside 90 days, compounding from there" },
  { trad: "AI as a slide topic", nova: "AI as the default execution model: agents, automation, augmented decisions" },
  { trad: "Engagement ends, knowledge leaves with the firm", nova: "Playbooks, dashboards, and team enablement stay behind" },
];

const engagementModels = [
  {
    name: "Sprint",
    duration: "4–6 weeks",
    summary: "A focused diagnostic + plan for a single capability or initiative.",
    bullets: ["Discovery + diagnosis", "Prioritised roadmap", "One quick-win pilot"],
  },
  {
    name: "Retainer",
    duration: "3–12 months",
    summary: "Embedded execution partnership across one or more capability pillars.",
    bullets: ["Weekly working sessions", "Hands-on implementation", "Team enablement"],
    featured: true,
  },
  {
    name: "Advisory",
    duration: "Ongoing",
    summary: "Monthly strategic counsel for founders, CEOs, and senior leaders.",
    bullets: ["Twice-monthly 1:1s", "Async review of plans & docs", "On-call for critical moments"],
  },
];

const faqs = [
  {
    q: "How do you charge?",
    a: "Sprints are fixed-fee. Retainers are monthly. Advisory is a monthly subscription. No hourly billing. You should never hesitate to call me because of the meter.",
  },
  {
    q: "How long is a typical engagement?",
    a: "Sprints run 4 to 6 weeks. Retainers usually start at one quarter and extend as we see results; most clients stay 6 to 12 months. Advisory is open-ended.",
  },
  {
    q: "Remote, on-site, or hybrid?",
    a: "Default is remote with structured working sessions. I travel for kickoffs, quarterly reviews, and any moment where being in the room matters.",
  },
  {
    q: "Which industries do you work with?",
    a: "Manufacturing, SaaS, e-commerce, financial services, healthcare, logistics, retail, and education. The methodology travels; the diagnostic is always industry-specific.",
  },
  {
    q: "Do you replace our internal team or work with them?",
    a: "Always with. The work has to live inside your organisation after I leave, so I build playbooks, train operators, and hand over dashboards. No black boxes.",
  },
  {
    q: "How quickly can we start?",
    a: "Discovery calls within a week. Sprints typically kick off inside 2–3 weeks of signing. Retainers depend on scope and your team's readiness.",
  },
  {
    q: "What happens after the engagement ends?",
    a: "You keep the assets: playbooks, dashboards, frameworks, automations. I stay reachable for follow-up questions and offer a 30-day post-engagement check-in at no charge.",
  },
];

const whyUsPoints = [
  {
    title: "Senior-led",
    description: "Partners, not junior consultants. 20+ years of hands-on experience across strategy and execution.",
    icon: Crown,
  },
  {
    title: "Data-native",
    description: "Every recommendation backed by rigorous analysis. I measure what matters and optimize relentlessly.",
    icon: BarChart3,
  },
  {
    title: "Operator mindset",
    description: "I've built and scaled organizations. I understand the practical realities of implementation.",
    icon: Settings,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [edgyInsights, setEdgyInsights] = useState<EdgyInsightListItem[]>([]);
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<EdgyInsightListItem[]>(ALL_EDGY_INSIGHTS_QUERY)
      .then((data) => setEdgyInsights(data ?? []))
      .catch(() => setEdgyInsights([]))
      .finally(() => setInsightsLoading(false));

    sanityClient
      .fetch<PostListItem[]>(POSTS_QUERY)
      .then((data) => setPosts(data ?? []))
      .catch(() => setPosts([]))
      .finally(() => setPostsLoading(false));
  }, []);

  // FAQ schema. Drives rich snippets in Google SERPs.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Services as a structured list. Helps Google understand the capability lineup.
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: capabilities.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://novatransform.com/capability/${c.id}`,
      name: c.title,
    })),
  };

  // Person schema. Anchors Varun's personal-brand search results.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Varun Goel",
    jobTitle: "Founder, NovaTransform",
    url: "https://novatransform.com/",
    image: "https://novatransform.com/images/varun.webp",
    worksFor: {
      "@type": "Organization",
      name: "NovaTransform",
      url: "https://novatransform.com/",
    },
    knowsAbout: capabilities.map((c) => c.title),
  };

  return (
    <>
      <SEO
        title="Digital Transformation, Manufacturing Analytics & Customer Success Consulting"
        description="Varun Goel partners with leaders on digital marketing, manufacturing analytics, digital transformation and customer success. Senior-led, data-native, AI-first. First measurable win inside 90 days."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Hero />

      {/* ── Impact strip ─────────────────────────────────────────────────── */}
      <section
        id="impact"
        aria-label="Impact at a glance"
        className="border-t border-border bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <FadeIn>
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-accent mb-10">
              Impact at a glance
            </p>
          </FadeIn>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
            {impactStats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.05} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-black text-4xl md:text-5xl text-foreground tracking-tighter leading-none">
                  {s.value}
                </dd>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug px-2">
                  {s.label}
                </p>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Capability Pillars (existing) ────────────────────────────────── */}
      <section id="capabilities" className="section-padding bg-background section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              My <span className="text-emphasis">Capability Pillars</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Eight interconnected practices spanning strategy and execution. Pick the ones that move the needle for your business.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <ServiceCard
                key={capability.id}
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
                href={`/capability/${capability.id}`}
                delay={index * 0.1}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── How I work (methodology) ─────────────────────────────────────── */}
      <section id="process" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="container-spacing">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">The method</span>
                <h2 className="mt-3 heading-lg">How I work</h2>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Four phases, designed to deliver a measurable win inside 90 days and compound from there.
              </p>
            </div>
          </FadeIn>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {methodology.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={m.n} delay={i * 0.1}>
                  <article className="group relative h-full bg-background p-8 transition-colors duration-300 hover:bg-secondary/60">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black font-display text-foreground/15 group-hover:text-accent/40 transition-colors">
                        {m.n}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {m.duration}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 tracking-tight">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Edgy Insights (existing) ─────────────────────────────────────── */}
      <section id="edgy-insights" className="section-padding bg-background section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Edgy Insights</span>
            <h2 className="mt-3 heading-lg">Case Studies & Transformation Stories</h2>
            <p className="mt-4 text-large text-muted-foreground max-w-3xl mx-auto">
              Story-driven narratives showing the playbook, the metrics, and the lessons, drawn from real transformations across industries.
            </p>
          </FadeIn>

          {insightsLoading ? (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-secondary/50 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
              {edgyInsights.slice(0, 3).map((insight, index) => (
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
                  delay={index * 0.1}
                />
              ))}
            </StaggerContainer>
          )}

          <FadeIn className="text-center">
            <Link href="/case-studies">
              <Button
                variant="outline"
                size="lg"
                className="magnetic-button border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-4 font-semibold rounded-xl"
                data-testid="button-view-all-edgy-insights"
              >
                Explore all case studies
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Industries served ────────────────────────────────────────────── */}
      <section id="industries" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Industries</span>
            <h2 className="mt-3 heading-lg">Where the playbook travels</h2>
            <p className="mt-4 text-large text-muted-foreground max-w-3xl mx-auto">
              The methodology is industry-agnostic. The diagnosis is always industry-specific.
            </p>
          </FadeIn>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <FadeIn key={ind.name} delay={i * 0.05}>
                  <li className="bg-background p-6 flex flex-col items-center text-center gap-3 h-full hover:bg-secondary/60 transition-colors">
                    <span className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-sm">{ind.name}</span>
                  </li>
                </FadeIn>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Why work with me (existing) ──────────────────────────────────── */}
      <section className="section-padding bg-background section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              Why Work <span className="text-emphasis">With Me</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Three core principles that differentiate my approach and ensure <span className="font-semibold text-foreground">your success</span>.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {whyUsPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <FadeIn key={point.title} delay={index * 0.1} className="text-center">
                  <div className="standard-card p-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-4">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Differentiation table ────────────────────────────────────────── */}
      <section id="vs" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">The difference</span>
            <h2 className="mt-3 heading-lg">Traditional consultancy vs. NovaTransform</h2>
          </FadeIn>

          <div className="rounded-3xl border border-border bg-background overflow-hidden">
            <div className="grid grid-cols-3 bg-secondary/60 text-sm font-bold uppercase tracking-wider">
              <div className="p-5 md:p-6 col-span-1 text-muted-foreground">Dimension</div>
              <div className="p-5 md:p-6 col-span-1 text-muted-foreground border-l border-border">Traditional consultancy</div>
              <div className="p-5 md:p-6 col-span-1 text-accent border-l border-border">NovaTransform</div>
            </div>
            {differentiationRows.map((row, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`grid grid-cols-3 text-sm md:text-base ${i % 2 === 1 ? "bg-secondary/20" : ""}`}>
                  <div className="hidden md:block p-5 md:p-6 col-span-1 font-semibold text-foreground border-t border-border">
                    {["Who does the work", "Approach", "Time to value", "AI posture", "After we're done"][i]}
                  </div>
                  <div className="p-5 md:p-6 col-span-3 md:col-span-1 border-t border-border flex items-start gap-3 text-muted-foreground">
                    <XIcon className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground/70" aria-hidden="true" />
                    <span>{row.trad}</span>
                  </div>
                  <div className="p-5 md:p-6 col-span-3 md:col-span-1 border-t border-border md:border-l border-l-border flex items-start gap-3 text-foreground">
                    <Check className="w-4 h-4 mt-1 flex-shrink-0 text-accent" aria-hidden="true" strokeWidth={3} />
                    <span>{row.nova}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────────────────── */}
      <section id="engagement" className="section-padding bg-background section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Engagement models</span>
            <h2 className="mt-3 heading-lg">Pick the shape that fits your moment</h2>
            <p className="mt-4 text-large text-muted-foreground max-w-3xl mx-auto">
              From a focused 4-week sprint to ongoing strategic advisory. Three ways to work together.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {engagementModels.map((model, i) => (
              <FadeIn key={model.name} delay={i * 0.1}>
                <article
                  className={`relative h-full rounded-3xl border p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 ${
                    model.featured
                      ? "border-accent bg-accent/[0.03] shadow-lg"
                      : "border-border bg-background"
                  }`}
                >
                  {model.featured && (
                    <span className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-accent text-accent-foreground">
                      Most chosen
                    </span>
                  )}
                  <h3 className="font-display font-bold text-2xl mb-1">{model.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-5">{model.duration}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{model.summary}</p>
                  <ul className="space-y-3 mb-8">
                    {model.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" strokeWidth={3} aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button
                      variant={model.featured ? "default" : "outline"}
                      className={`w-full rounded-xl ${
                        model.featured
                          ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                          : "border-2 border-border hover:border-accent hover:text-accent"
                      }`}
                    >
                      Discuss this option
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (existing) ──────────────────────────────────────── */}
      <section id="proof" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              <span className="text-emphasis">LinkedIn</span> Testimonials
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Hear from the leaders who've partnered with me to drive <span className="font-semibold text-foreground">meaningful change</span>.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <figure className="bg-background p-8 rounded-2xl border border-border h-full">
                  <Quote className="w-8 h-8 text-accent mb-4" aria-hidden="true" />
                  <blockquote className="text-lg italic text-muted-foreground mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <figcaption className="flex items-center">
                    <span className="w-12 h-12 rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 flex items-center justify-center font-bold text-base mr-4" aria-hidden="true">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span>
                      <span className="block font-semibold">{testimonial.author}</span>
                      <span className="block text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Latest insights (blog strip) ─────────────────────────────────── */}
      <section id="blog" className="section-padding bg-background section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="container-spacing">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">From the journal</span>
                <h2 className="mt-3 heading-lg">Latest writing</h2>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10">
                  View all posts <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {postsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-border overflow-hidden">
                  <div className="aspect-[16/10] bg-secondary/60 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-secondary/60 animate-pulse rounded" />
                    <div className="h-5 w-full bg-secondary/60 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-secondary/60 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">New posts coming soon.</p>
          ) : (
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {posts.slice(0, 3).map((post, i) => {
                const url = postUrl({ slug: post.slug, categories: post.categories });
                const img = resolveFlexibleImage(post.mainImage, { width: 800, height: 500 });
                return (
                  <FadeIn key={post._id} delay={i * 0.1}>
                    <Link href={url}>
                      <article className="group h-full rounded-2xl border border-border bg-background overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        <div className="aspect-[16/10] bg-secondary overflow-hidden">
                          {img ? (
                            <img
                              src={img}
                              alt={post.mainImage?.alt || post.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-secondary" />
                          )}
                        </div>
                        <div className="p-6">
                          {post.categories?.[0] && (
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                              {post.categories[0].title}
                            </span>
                          )}
                          <h3 className="mt-2 font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                            {post.author?.name && <span>{post.author.name}</span>}
                            {post.readingMinutes && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{post.readingMinutes} min read</span>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeIn>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">FAQ</span>
            <h2 className="mt-3 heading-lg">Frequently asked</h2>
            <p className="mt-4 text-muted-foreground">
              Don't see your question? <Link href="/contact" className="text-accent font-semibold hover:underline">Ask directly</Link>.
            </p>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
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

      {/* ── Final CTA (rewritten copy) ───────────────────────────────────── */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to talk about your next transformation?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              A 30-minute discovery call. No deck, no pitch. Just a working conversation about where you are and what would move the needle.
            </p>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-connect-footer"
              >
                Book a discovery call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
