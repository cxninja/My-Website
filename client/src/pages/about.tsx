import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Target,
  Users,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Briefcase,
  FileText,
  Gauge,
  Compass,
  Layers,
  Handshake,
} from "lucide-react";
import { Link } from "wouter";

const founder = {
  name: "Varun Goel",
  experience: "19+ years across ops, growth, and customer success",
  linkedinUrl: "https://www.linkedin.com/in/varungoel/",
};

// The brand story — what /about is FOR. CV detail lives on /leadership;
// manifesto lives on /philosophy. This page is the through-line.
const brandStory = [
  "NovaTransform is the advisory brand for 19+ years of senior operating experience — across Adobe (APAC Customer Success), Zendesk (CSM leadership), and Intelegencia (current AVP, Client Success & Digital Marketing Group).",
  "It exists because the gap between a strategy slide and a working system is where most transformations die. I've spent two decades closing that gap — first inside enterprises, now as the practice behind NovaTransform.",
  "The methodology is what travels. NovaTransform is how it gets packaged.",
];

const values = [
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "Every recommendation is tied to a measurable business outcome. I don't just provide advice — I ensure results.",
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "I work alongside your team as a partner, not an external observer. Your success is my success.",
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Speed matters. I focus on quick wins while building sustainable long-term systems.",
  },
];

// Operating principles — was a prose essay, now a scannable 4-card grid.
const operatingPrinciples = [
  {
    n: "01",
    icon: Gauge,
    title: "Measure everything",
    body: "Every initiative gets clear KPIs and a measurement framework. What gets measured gets optimised.",
  },
  {
    n: "02",
    icon: Compass,
    title: "Start with why",
    body: "Understanding the business context and the desired outcome shapes every recommendation that follows.",
  },
  {
    n: "03",
    icon: Layers,
    title: "Pilot before scale",
    body: "Prove the concept with a small, controlled experiment before committing to full rollout.",
  },
  {
    n: "04",
    icon: Handshake,
    title: "Transfer knowledge",
    body: "My success is measured by your team's ability to sustain the gains long after I'm gone.",
  },
];

// "Where to go from here" — routes intent. Replaces the duplicated timeline +
// certifications sections; this page is now a hub, not a duplicate.
const nextDoors = [
  {
    title: "Philosophy",
    description: "The manifesto, contrarian principles, and how I think about modern transformation.",
    href: "/philosophy",
    icon: Sparkles,
  },
  {
    title: "Leadership",
    description: "Full career timeline — roles at Adobe, Zendesk, and Intelegencia, plus credentials.",
    href: "/leadership",
    icon: Briefcase,
  },
  {
    title: "Case Studies",
    description: "Real transformations across industries — playbook, metrics, and the lessons that translate.",
    href: "/case-studies",
    icon: FileText,
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About NovaTransform & Varun Goel"
        description="NovaTransform is the advisory brand for 19+ years of senior operating experience across customer success, digital transformation, and AI-first execution."
        path="/about"
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 pt-24 pb-4">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          </li>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <li className="text-foreground font-medium" aria-current="page">About</li>
        </ol>
      </nav>

      {/* ── Hero (editorial) ───────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              About
            </span>
            <h1 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              The brand, the practice,<br />
              <span className="text-muted-foreground">the operator behind both.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              NovaTransform is what happens when two decades of operating experience get packaged
              into a senior-led advisory practice — built for leaders who need execution, not slides.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── The story (portrait + narrative) ───────────────────────────── */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] gap-10 md:gap-14 items-start">
            <FadeIn>
              <div className="mx-auto md:mx-0">
                <div className="w-44 h-44 md:w-52 md:h-52 lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden ring-4 ring-accent/15 shadow-lg">
                  <img
                    src="/images/founder.jpg"
                    alt={`${founder.name}, founder of NovaTransform`}
                    loading="lazy"
                    decoding="async"
                    width="260"
                    height="260"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-5 text-center md:text-left">
                  <p className="font-display font-bold text-xl">{founder.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{founder.experience}</p>
                  <Button asChild variant="outline" className="mt-4 rounded-xl">
                    <a href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                The story
              </span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                Why NovaTransform exists
              </h2>
              <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-[17px] max-w-prose">
                {brandStory.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/leadership">
                  <Button variant="ghost" className="text-accent hover:bg-accent/10">
                    Read the full career story
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Values (hairline-divider grid) ─────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">My values</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              What guides the work
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Three principles that shape every engagement.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <FadeIn key={v.title}>
                  <div className="group bg-background p-8 h-full hover:bg-secondary/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-3">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Operating principles (2x2 numbered grid) ───────────────────── */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">How I operate</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                  Operating principles
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Four rules that govern how every engagement runs, from kickoff to handover.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operatingPrinciples.map((p) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.n}>
                  <article className="group bg-background border border-border rounded-2xl p-7 h-full hover:border-accent/40 transition-colors">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center">
                        <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <span className="text-3xl font-black font-display text-foreground/10 group-hover:text-accent/30 transition-colors">
                        {p.n}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                  </article>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Where to go from here (cross-page nav) ─────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Go deeper</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Where to go from here
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Three doors. Pick the one closest to what brought you here.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextDoors.map((door) => {
              const Icon = door.icon;
              return (
                <FadeIn key={door.title}>
                  <Link href={door.href}>
                    <article className="group h-full bg-background border border-border rounded-2xl p-7 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent transition-all duration-300">
                        <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-bold text-lg mb-3">{door.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{door.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </article>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Want to talk?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              A 30-minute discovery call. No deck, no pitch — just a working conversation about where you are and what would move the needle.
            </p>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-contact-about-cta"
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
