import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SEO } from "@/lib/seo";
import { FadeIn } from "@/components/motion/fade-in";
import { Bolt, Layers, Cpu, X, Check } from "lucide-react";

const principles = [
  {
    n: "01",
    title: "Process over Outcome",
    body: "Fixating on the end goal creates blind spots. Rigorous, adaptable systems inevitably produce superior outcomes.",
  },
  {
    n: "02",
    title: "AI as Co-Founder",
    body: "Treating AI as a mere tool limits its potential. Integrate it as a strategic partner in the ideation phase.",
  },
  {
    n: "03",
    title: "Friction is Data",
    body: "Organizational resistance isn't a blocker; it's diagnostic telemetry indicating where the system needs redesign.",
  },
];

const pillars = [
  {
    icon: Bolt,
    n: "I",
    label: "Communication",
    title: "Radical Candor",
    body: "Clarity is kindness. I operate with absolute transparency, cutting through corporate diplomacy to address root causes immediately.",
    longBody:
      "Most organizations rot from unspoken truths. I name the dysfunction in the room, kindly and specifically and early, so teams can spend their energy solving the real problem instead of rehearsing diplomatic workarounds. Trust compounds when feedback is predictable and direct.",
    bullets: [
      "Name the elephant in week one, not quarter three",
      "Critique the work, never the person",
      "Disagree in the room, commit outside of it",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Two leaders in candid conversation across a table",
  },
  {
    icon: Layers,
    n: "II",
    label: "Problem-solving",
    title: "Architectural Thinking",
    body: "I don't solve isolated problems. I redesign the underlying architecture that allowed the problem to exist in the first place.",
    longBody:
      "Symptoms beg for hotfixes. Systems demand redesign. I treat every recurring issue as a tell about the underlying structure (process, incentives, data flow, ownership) and rebuild the substrate so the same class of problem can't return. The work is slower upfront and exponentially cheaper at scale.",
    bullets: [
      "Map the system before touching the symptom",
      "Refactor incentives, not just workflows",
      "Solve the class of problem, retire the ticket category",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Architectural blueprint with overlaid drafting tools",
  },
  {
    icon: Cpu,
    n: "III",
    label: "Execution",
    title: "AI-First Execution",
    body: "Every initiative begins with the question: \"How can AI accelerate, augment, or automate this?\" We build for the future state, not the present constraint.",
    longBody:
      "AI is not a feature on a roadmap. It is the new floor. Every workflow I scope starts by asking which steps a model can compress from days to minutes, which decisions can be augmented with structured retrieval, and which human hours are now better spent on judgement instead of execution. I build for the org six quarters out, not the one I inherited.",
    bullets: [
      "Default to AI-augmented, prove the case for human-only",
      "Ship the agent, then design the team around it",
      "Measure cycle time in minutes, not sprints",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Abstract neural-network visualization in blue and purple",
  },
];

const inflections = [
  {
    year: "2023",
    title: "The AI Pivot",
    label: "Strategic Realignment",
    body: "Transitioned from traditional enterprise transformation to applied AI integration. Recognized that legacy change management frameworks were obsolete in the face of generative models.",
    active: true,
  },
  {
    year: "2020",
    title: "Scale at Zendesk",
    label: "Operational Excellence",
    body: "Led global ops reorganization. Engineered a decentralized decision-making matrix that reduced time-to-market for key features by 40%.",
  },
  {
    year: "2017",
    title: "The Adobe Foundation",
    label: "Enterprise Rigor",
    body: "Immersed in the mechanics of enterprise scale. Learned how to navigate complex stakeholder ecosystems while pushing aggressive product roadmaps.",
  },
];

export default function Philosophy() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // ESC closes the drawer for keyboard users.
  useEffect(() => {
    if (activePillar === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePillar(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activePillar]);

  const togglePillar = (i: number) =>
    setActivePillar((curr) => (curr === i ? null : i));

  return (
    <>
      <SEO
        title="Philosophy & Identity"
        description="The manifesto, principles, and inflection points behind my approach to AI-native enterprise transformation."
        path="/philosophy"
      />

      <main className="relative w-full pt-32 pb-24 bg-background text-foreground overflow-hidden">
        {/* Ambient glow accents */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40"
             style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.10) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
             style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)" }} />

        {/* Manifesto Hero */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 relative">
          <div className="max-w-5xl">
            <FadeIn delay={0.1}>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">The Manifesto</span>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] uppercase font-display">
                <span className="block">Comfort is</span>
                <span className="block text-muted-foreground">the enemy of</span>
                <span className="block text-accent">Evolution.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mt-10 max-w-3xl ml-0 md:ml-12 lg:ml-24 border-l-2 border-border pl-8">
                <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
                  I build systems that disrupt stagnation. True transformation isn't about incremental gains; it's about{" "}
                  <span className="text-foreground font-medium border-b border-dashed border-accent cursor-help" title="Strategic dismantling of legacy processes to rebuild with AI-native agility.">
                    fracturing the status quo
                  </span>{" "}
                  to unlock exponential value.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contrarian Principles */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <FadeIn key={p.n} delay={0.1 + i * 0.15}>
                <div className="group bg-secondary rounded-2xl p-8 border border-border hover:border-accent/40 transition-colors h-full">
                  <div className="text-3xl font-black text-foreground/15 group-hover:text-accent/30 transition-colors mb-4 font-display">
                    {p.n}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 uppercase tracking-tight font-display">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.body}</p>
                  <div className="h-px w-full bg-border group-hover:bg-accent/40 transition-colors" />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Leadership Pillars */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 relative">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">Operating system</span>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight font-display">How I Lead</h2>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Three non-negotiables that shape every decision, hire, and roadmap I touch.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const isActive = activePillar === i;
              return (
                <FadeIn key={p.title} delay={0.1 + i * 0.15}>
                  <button
                    type="button"
                    onClick={() => togglePillar(i)}
                    aria-expanded={isActive}
                    aria-controls="pillar-drawer"
                    className={`group relative h-full w-full text-left p-8 md:p-10 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isActive
                        ? "bg-secondary"
                        : "bg-background hover:bg-secondary/60"
                    }`}
                  >
                    {/* Top rule. Accent when active, animates on hover */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300 ${
                        isActive ? "bg-accent" : "bg-border group-hover:bg-accent/60"
                      }`}
                    />

                    <div className="flex items-start justify-between mb-8">
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
                          isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                        }`}
                      >
                        Pillar {p.n}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                        {p.label}
                      </span>
                    </div>

                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${
                        isActive
                          ? "bg-accent text-accent-foreground ring-1 ring-accent"
                          : "bg-accent/10 text-accent ring-1 ring-accent/15 group-hover:bg-accent group-hover:text-accent-foreground group-hover:ring-accent"
                      }`}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    <h3 className="text-2xl md:text-[26px] font-bold font-display leading-tight mb-4 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {p.body}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      <span>{isActive ? "Close" : "Read more"}</span>
                      <span
                        aria-hidden="true"
                        className={`inline-block transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      >
                        ↓
                      </span>
                    </div>

                    {/* Tick / pointer connecting active card to drawer below */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="hidden md:block absolute -bottom-px left-1/2 -translate-x-1/2 translate-y-full w-4 h-4 bg-secondary border-l border-t border-border rotate-45 z-10"
                      />
                    )}
                  </button>
                </FadeIn>
              );
            })}
          </div>

          {/* Expanding drawer */}
          <AnimatePresence initial={false}>
            {activePillar !== null && (
              <motion.div
                key={`drawer-${activePillar}`}
                id="pillar-drawer"
                role="region"
                aria-label={`Details: ${pillars[activePillar].title}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-secondary border border-border rounded-3xl relative">
                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setActivePillar(null)}
                    aria-label="Close pillar details"
                    className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <motion.div
                    key={`drawer-content-${activePillar}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0"
                  >
                    {/* Image */}
                    <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden lg:rounded-l-3xl">
                      <img
                        src={pillars[activePillar].image}
                        alt={pillars[activePillar].imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-background/10 to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute bottom-5 left-6 right-6 flex items-center gap-3 text-background mix-blend-difference">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
                          Pillar {pillars[activePillar].n}
                        </span>
                        <span className="h-px flex-1 bg-current opacity-40" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                          {pillars[activePillar].label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 p-8 md:p-12 lg:p-14">
                      <h3 className="text-3xl md:text-4xl font-bold font-display tracking-tight leading-tight mb-6">
                        {pillars[activePillar].title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                        {pillars[activePillar].longBody}
                      </p>

                      <div className="border-t border-border pt-6">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                          How it shows up
                        </span>
                        <ul className="mt-4 space-y-3">
                          {pillars[activePillar].bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-3 text-[15px] text-foreground/90"
                            >
                              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                                <Check className="w-3 h-3" strokeWidth={3} />
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Inflection Points Timeline */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-24 relative">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-4">The Arc</span>
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight font-display">Inflection Points</h2>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm text-right hidden md:block">
                Non-linear career shifts that defined my operational DNA.
              </p>
            </div>
          </FadeIn>

          <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12 pb-12">
            {inflections.map((it, i) => (
              <FadeIn key={it.year} delay={0.1 + i * 0.15}>
                <div className="group relative pl-8 md:pl-16">
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:bg-accent group-hover:border-accent group-hover:scale-125 transition-all duration-300" />
                  <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                    <div className="md:w-32 flex-shrink-0 pt-1">
                      <span className={`font-bold text-base transition-colors ${it.active ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`}>
                        {it.year}
                      </span>
                    </div>
                    <div className="bg-secondary border border-border rounded-2xl p-6 md:p-7 w-full group-hover:border-accent/40 transition-colors">
                      <h4 className="text-lg font-bold mb-2 font-display">{it.title}</h4>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-4">{it.label}</span>
                      <p className="text-muted-foreground text-sm leading-relaxed">{it.body}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
