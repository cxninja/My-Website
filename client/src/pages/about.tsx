import { Helmet } from "react-helmet-async";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Linkedin,
  Mail,
  ArrowRight,
  ChevronRight,
  Sparkles,
  DollarSign,
  Gauge,
  Compass,
  Layers,
  Handshake,
} from "lucide-react";
import { Link } from "wouter";
import { SITE_ORIGIN } from "@/config/site";

// ─── Profile (single source of truth for the about page) ──────────────────────
const profile = {
  name: "Varun Goel",
  location: "Noida, Uttar Pradesh, India",
  experience: "19+ years",
  specialization: "B2B SaaS · Manufacturing Analytics · Digital Transformation",
  linkedinUrl: "https://www.linkedin.com/in/varungoel",
  email: "varun@novatransform.com",
  summary:
    "I'm a RevOps and Customer Success leader with nearly two decades of experience driving revenue, adoption, and efficiency across B2B SaaS, manufacturing analytics, and digital services. I bridge sales and delivery with AI-driven playbooks to accelerate time-to-value for enterprise clients.",
};

// The story: why I do this work. First person, no company personification.
const story = [
  "For 19+ years I've worked inside the gap between a strategy slide and a system that actually runs. At Adobe I built the APAC Customer Success team. At Zendesk I led retention and expansion across India, SAARC, and APAC. At Intelegencia I scaled global delivery, then came back to run Client Success and the digital marketing practice as AVP.",
  "Most transformations die in that gap. The deck is right, but nothing ships, or it ships and the team can't sustain it. I close the gap by doing the work alongside your team, then handing over the playbooks so the gains keep compounding after I leave.",
  "This site lives at novatransform.com, but there's no agency behind it. It's me. When you work with me, you work with me.",
];

const numericStats = [
  { metric: "19+", label: "Years across ops & growth", sub: "Since 2005" },
  { metric: "180+", label: "Team members led", sub: "Intelegencia, 2009 - 2016" },
];
const qualitativeStats = [
  { icon: DollarSign, label: "Multi-million $ expansions", sub: "APAC, EMEA, US enterprise accounts" },
  { icon: Sparkles, label: "Strong portfolio retention", sub: "At Adobe, Zendesk & Intelegencia" },
];

const career = [
  {
    company: "Intelegencia",
    role: "AVP, Client Success & Digital Marketing Group",
    period: "Jan 2025 - Present",
    description:
      "Leading global client strategy, delivery, and transformation across SaaS and manufacturing-aligned services. Driving portfolio growth, operational efficiency, and the digital marketing practice. Managing partnerships like Sight Machine to enable digital transformation in industrial environments.",
    current: true,
  },
  {
    company: "Intelegencia",
    role: "Senior Director, Client Success",
    period: "Jul 2023 - Jan 2025",
    description:
      "Returned to Intelegencia to lead Client Success across manufacturing analytics and digital transformation engagements, ahead of promotion to AVP.",
  },
  {
    company: "Zendesk",
    role: "Customer Success Leader",
    period: "Jul 2020 - Jul 2023",
    description:
      "Led customer success across India, SAARC, and APAC enterprise accounts with focus on retention, expansion, and executive engagement. Built scalable engagement models and ran CS Office Hours, ValueSelling Workshops, and cross-functional programs.",
  },
  {
    company: "Adobe",
    role: "Manager, Customer Success (APAC)",
    period: "Aug 2016 - Jul 2020",
    description:
      "Built and led the APAC Customer Success team for Adobe Experience Cloud, Document Cloud, and Creative Cloud. Owned sales enablement for Adobe Digital Learning Services across SEA and Greater China.",
  },
  {
    company: "Intelegencia",
    role: "Associate Director, Client Services",
    period: "Jun 2009 - Aug 2016",
    description:
      "Led global delivery across software, QA, and content teams, managing 180+ members serving clients across APAC, EMEA, and the US over seven years. Launched and scaled new service lines including QA.",
  },
  {
    company: "Porteck · MAG Studios · ISHIR",
    role: "Sales & Business Development",
    period: "Nov 2005 - Jun 2009",
    description:
      "Built the foundation: pre-sales, business development, and client engagement across IT services, digital asset management, and application development.",
    isEarlier: true,
  },
];

// How I work. Concrete operating rules. The deeper worldview lives on /philosophy.
const operatingPrinciples = [
  { n: "01", icon: Gauge, title: "Measure everything", body: "Every initiative gets clear KPIs and a measurement framework. What gets measured gets optimised." },
  { n: "02", icon: Compass, title: "Start with why", body: "Understanding the business context and the desired outcome shapes every recommendation that follows." },
  { n: "03", icon: Layers, title: "Pilot before scale", body: "Prove the concept with a small, controlled experiment before committing to full rollout." },
  { n: "04", icon: Handshake, title: "Transfer knowledge", body: "My success is measured by your team's ability to sustain the gains long after I'm gone." },
];

const education = [
  { institution: "Indian School of Business", program: "Leading Business Transformation in the Age of AI", year: "2020" },
  { institution: "Indian Institute of Management, Lucknow", program: "Digital Marketing", year: "2019" },
  { institution: "Indo American School of Business", program: "MBA, Global Management and Marketing", year: "2003 - 2005" },
  { institution: "Kurukshetra University", program: "B.C.A., Computer Applications", year: "2000 - 2003" },
];
const certifications = [
  { title: "Project Management Professional (PMP)®", issuer: "Project Management Institute", year: "2024 - 2027" },
  { title: "Leading Business Transformation in the Age of AI", issuer: "Indian School of Business", year: "2020" },
  { title: "CSM Advanced Certified Professional", issuer: "Gainsight", year: "2020" },
  { title: "Digital Marketing", issuer: "Indian Institute of Management, Lucknow", year: "2019" },
  { title: "Zendesk Messaging", issuer: "Zendesk", year: "2023" },
  { title: "ValueSelling Framework", issuer: "ValueSelling Associates", year: "" },
  { title: "Lean Six Sigma Green Belt", issuer: "Exemplar Global", year: "" },
];

const currentRole = career[0];

export default function About() {
  // Person JSON-LD. The site's primary entity is Varun, not a company.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: currentRole.role,
    url: `${SITE_ORIGIN}/about`,
    image: `${SITE_ORIGIN}/images/founder.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    description: profile.summary,
    knowsAbout: [
      "Customer Success",
      "Digital Transformation",
      "B2B SaaS",
      "Manufacturing Analytics",
      "AI Innovation",
      "Go-to-Market Strategy",
    ],
    worksFor: { "@type": "Organization", name: currentRole.company },
    sameAs: [profile.linkedinUrl],
    alumniOf: education.map((e) => ({ "@type": "Organization", name: e.institution })),
  };

  return (
    <>
      <SEO
        title="About Varun Goel"
        description={profile.summary}
        path="/about"
        image="/images/founder.jpg"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Helmet>

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

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
            <FadeIn>
              <div className="mx-auto md:mx-0">
                <div className="w-48 h-48 md:w-60 md:h-60 lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden ring-4 ring-accent/15 shadow-lg">
                  <img
                    src="/images/founder.jpg"
                    alt={profile.name}
                    width="280"
                    height="280"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">About</span>
              <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
                {profile.name}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-foreground/80 font-medium">
                {currentRole.role}
                <span className="text-muted-foreground"> at </span>
                {currentRole.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-normal">{profile.location}</Badge>
                <Badge variant="secondary" className="font-normal">{profile.experience}</Badge>
                <Badge variant="secondary" className="font-normal">{profile.specialization}</Badge>
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
                {profile.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                    Connect on LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Email me
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── The story ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">The story</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight mb-8">
              Why I do this
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[17px]">
              {story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Numbers & differentiators ──────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Track record</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              What shows up across the work
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {numericStats.map((s) => (
              <FadeIn key={s.label}>
                <div className="bg-background border border-border rounded-2xl p-6 h-full hover:border-accent/40 transition-colors">
                  <div className="font-display font-black text-4xl md:text-5xl text-foreground tracking-tighter leading-none">
                    {s.metric}
                  </div>
                  <div className="mt-3 font-semibold text-sm">{s.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
                </div>
              </FadeIn>
            ))}
            {qualitativeStats.map((s) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.label}>
                  <div className="bg-background border border-border rounded-2xl p-6 h-full hover:border-accent/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div className="mt-4 font-semibold text-sm">{s.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
                  </div>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Career timeline ────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Career</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Where I've worked
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              19+ years across Adobe, Zendesk, and Intelegencia, with two stints at Intelegencia bookending the journey.
            </p>
          </FadeIn>

          <ol className="relative space-y-10 md:space-y-12">
            <div aria-hidden="true" className="hidden md:block absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
            {career.map((role, i) => (
              <FadeIn key={`${role.company}-${role.role}`} delay={i * 0.05}>
                <li className="relative md:pl-10">
                  <span
                    aria-hidden="true"
                    className={`hidden md:block absolute left-0 top-2 w-4 h-4 rounded-full ring-4 ring-secondary/30 ${
                      role.isEarlier ? "bg-muted-foreground/50" : "bg-accent"
                    }`}
                  />
                  <article className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 ${role.isEarlier ? "opacity-75" : ""}`}>
                    <div className="md:pt-1">
                      <div className="text-sm font-semibold text-accent tabular-nums">{role.period}</div>
                      {role.current && (
                        <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">
                          Current
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-1">{role.role}</h3>
                      <div className="font-semibold text-foreground/80 mb-3">{role.company}</div>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">{role.description}</p>
                    </div>
                  </article>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* ── How I work ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">How I work</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                  Operating principles
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                The rules that govern every engagement. For the deeper worldview, read
                {" "}<Link href="/philosophy" className="text-accent font-semibold hover:underline">the philosophy</Link>.
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

      {/* ── Credentials ────────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Credentials</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Education & certifications
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <FadeIn>
              <h3 className="font-display font-bold text-xl mb-6 pb-3 border-b-2 border-accent inline-block">Education</h3>
              <ul className="space-y-5">
                {education.map((edu, i) => (
                  <li key={i} className="border-l-2 border-border pl-4 hover:border-accent transition-colors">
                    <div className="font-semibold text-foreground">{edu.program}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{edu.institution}</div>
                    <div className="text-xs text-muted-foreground/80 mt-1 tabular-nums">{edu.year}</div>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="font-display font-bold text-xl mb-6 pb-3 border-b-2 border-accent inline-block">Certifications</h3>
              <ul className="space-y-5">
                {certifications.map((cert, i) => (
                  <li key={i} className="border-l-2 border-border pl-4 hover:border-accent transition-colors">
                    <div className="font-semibold text-foreground">{cert.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</div>
                    {cert.year && <div className="text-xs text-muted-foreground/80 mt-1 tabular-nums">{cert.year}</div>}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Want to talk?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              A 30-minute discovery call. No deck, no pitch. Just a working conversation about where you are and what would move the needle.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="secondary" className="bg-white text-accent hover:bg-white/90 px-8 py-3">
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-accent-foreground border-white/30 hover:bg-white/10 px-8 py-3">
                  <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                  Send a message
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
