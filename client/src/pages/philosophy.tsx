import { SEO } from "@/lib/seo";
import { FadeIn } from "@/components/motion/fade-in";
import { Bolt, Layers, Cpu } from "lucide-react";

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
    title: "Radical Candor",
    body: "Clarity is kindness. I operate with absolute transparency, cutting through corporate diplomacy to address root causes immediately.",
    span: "lg:col-span-5 lg:mt-24",
  },
  {
    icon: Layers,
    title: "Architectural Thinking",
    body: "I don't solve isolated problems. I redesign the underlying architecture that allowed the problem to exist in the first place.",
    span: "lg:col-span-5",
  },
  {
    icon: Cpu,
    title: "AI-First Execution",
    body: "Every initiative begins with the question: \"How can AI accelerate, augment, or automate this?\" We build for the future state, not the present constraint.",
    span: "lg:col-span-6 lg:col-start-4 lg:mt-16",
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
  return (
    <>
      <SEO
        title="Philosophy & Identity — NovaTransform"
        description="The manifesto, principles, and inflection points behind NovaTransform's approach to AI-native enterprise transformation."
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
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight font-display mb-12">How I Lead</h2>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.title} delay={0.1 + i * 0.15} className={`col-span-1 ${p.span}`}>
                  <div className="relative bg-secondary border border-border rounded-3xl p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 hover:border-accent/40">
                    {i === 2 && (
                      <div className="absolute -top-6 -right-6 text-7xl text-foreground/5 font-black pointer-events-none font-display select-none">X</div>
                    )}
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 relative z-10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-display relative z-10">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm relative z-10">{p.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
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
