import { Helmet } from "react-helmet-async";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Users,
  Building,
  Mail,
  Linkedin,
  ChevronRight,
  Sparkles,
  DollarSign,
} from "lucide-react";

const leaderProfile = {
  name: "Varun Goel",
  location: "Noida, Uttar Pradesh, India",
  experience: "19+ years",
  specialization: "B2B SaaS · Manufacturing Analytics · Digital Transformation",
  linkedinUrl: "https://www.linkedin.com/in/varungoel",
  email: "varun@novatransform.com",
  summary:
    "RevOps and Customer Success leader with nearly two decades of experience driving revenue, adoption, and efficiency across B2B SaaS, manufacturing analytics, and digital services. I bridge sales and delivery with AI-driven playbooks to accelerate time-to-value for enterprise clients.",

  // Two numeric stats + two qualitative differentiators.
  // The numeric ones get the big-number treatment; the qualitative ones use
  // an icon+label card pattern so they don't masquerade as fake metrics.
  numericStats: [
    {
      metric: "19+",
      label: "Years across ops & growth",
      sub: "Since 2005",
    },
    {
      metric: "180+",
      label: "Team members led",
      sub: "Intelegencia · 2009 — 2016",
    },
  ],
  qualitativeStats: [
    {
      icon: DollarSign,
      label: "Multi-million $ expansions",
      sub: "APAC, EMEA, US enterprise accounts",
    },
    {
      icon: Sparkles,
      label: "Strong portfolio retention",
      sub: "At Adobe, Zendesk & Intelegencia",
    },
  ],

  coreCompetencies: [
    {
      icon: Users,
      title: "Customer Success Management",
      description:
        "End-to-end customer lifecycle management with focus on adoption, retention, and expansion",
    },
    {
      icon: TrendingUp,
      title: "Digital Transformation",
      description:
        "AI-driven growth strategies and operational excellence across manufacturing and SaaS",
    },
    {
      icon: Building,
      title: "Enterprise Account Management",
      description:
        "Strategic relationship management for large enterprise clients across global markets",
    },
    {
      icon: Target,
      title: "SaaS & Tech-Enabled Services",
      description:
        "Deep domain expertise in software-as-a-service and technology-enabled business models",
    },
  ],

  professionalExperience: [
    {
      company: "Intelegencia",
      role: "AVP — Client Success & Digital Marketing Group",
      period: "Jan 2025 — Present",
      description:
        "Leading global client strategy, delivery, and transformation across SaaS and manufacturing-aligned services. Driving portfolio growth, operational efficiency, and the digital marketing practice for global customers. Managing key partnerships like Sight Machine to enable digital transformation in industrial environments.",
      skills: [
        "Customer Success",
        "Manufacturing Analytics",
        "Digital Transformation",
        "Digital Marketing",
      ],
      isEarlier: false,
    },
    {
      company: "Intelegencia",
      role: "Senior Director, Client Success",
      period: "Jul 2023 — Jan 2025",
      description:
        "Returned to Intelegencia to lead Client Success across manufacturing analytics and digital transformation engagements, ahead of promotion to AVP.",
      skills: ["Customer Success Management", "Manufacturing Analytics", "Account Growth"],
      isEarlier: false,
    },
    {
      company: "Zendesk",
      role: "Customer Success Leader",
      period: "Jul 2020 — Jul 2023",
      description:
        "Led customer success across India, SAARC, and APAC enterprise accounts with focus on retention, expansion, and executive engagement. Built scalable engagement models through structured success planning, stakeholder alignment, and partner collaboration. Spearheaded CS Office Hours, ValueSelling Workshops, internal tooling improvements, and cross-functional programs.",
      skills: ["Customer Retention", "Post-Sales Management", "Account Growth"],
      isEarlier: false,
    },
    {
      company: "Adobe",
      role: "Manager — Customer Success (APAC)",
      period: "Aug 2016 — Jul 2020",
      description:
        "Built and led the APAC Customer Success team for Adobe Experience Cloud, Document Cloud, and Creative Cloud across enterprise accounts. Partnered with senior stakeholders to drive enablement, retention, and strategic product adoption. Took on a hybrid role leading customer success and owning sales enablement for Adobe Digital Learning Services across SEA and Greater China.",
      skills: ["Post-Sales Management", "Operations Management", "Team Leadership"],
      isEarlier: false,
    },
    {
      company: "Intelegencia",
      role: "Associate Director, Client Services",
      period: "Jun 2009 — Aug 2016",
      description:
        "Led global delivery across software, QA, and content teams — managing 180+ members serving clients across APAC, EMEA, and the US over seven years. Launched new service lines including QA, and scaled them into profit-driving units through process improvements and strong client partnerships.",
      skills: ["Service Delivery", "Operations Management", "Team Leadership"],
      isEarlier: false,
    },
    {
      company: "Porteck · MAG Studios · ISHIR",
      role: "Sales & Business Development",
      period: "Nov 2005 — Jun 2009",
      description:
        "Built the foundation: pre-sales, business development, and client engagement across IT services, digital asset management, and application development — serving US, EMEA, and APAC markets.",
      skills: ["Business Development", "Pre-Sales", "Client Engagement"],
      isEarlier: true,
    },
  ],

  education: [
    {
      institution: "Indian School of Business",
      program: "Leading Business Transformation in the Age of AI",
      year: "2020",
    },
    {
      institution: "Indian Institute of Management, Lucknow",
      program: "Digital Marketing",
      year: "2019",
    },
    {
      institution: "Indo American School of Business",
      program: "MBA — Global Management and Marketing",
      year: "2003 — 2005",
    },
    {
      institution: "Kurukshetra University",
      program: "B.C.A. — Computer Applications",
      year: "2000 — 2003",
    },
  ],

  certifications: [
    {
      title: "Project Management Professional (PMP)®",
      issuer: "Project Management Institute",
      year: "2024 — 2027",
    },
    {
      title: "Leading Business Transformation in the Age of AI",
      issuer: "Indian School of Business",
      year: "2020",
    },
    {
      title: "CSM Advanced Certified Professional",
      issuer: "Gainsight",
      year: "2020",
    },
    {
      title: "Digital Marketing",
      issuer: "Indian Institute of Management, Lucknow",
      year: "2019",
    },
    {
      title: "Zendesk Messaging",
      issuer: "Zendesk",
      year: "2023",
    },
    {
      title: "ValueSelling Framework",
      issuer: "ValueSelling Associates",
      year: "",
    },
    {
      title: "Lean Six Sigma Green Belt",
      issuer: "Exemplar Global",
      year: "",
    },
  ],
};

// Current title is derived from the latest role — never goes stale even if
// the experience array gets updated.
const currentRole = leaderProfile.professionalExperience[0];

export default function Leadership() {
  // Person JSON-LD — anchors Varun's personal-brand entity for Google Knowledge Panel.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leaderProfile.name,
    jobTitle: currentRole.role,
    url: "https://novatransform.com/leadership",
    image: "https://novatransform.com/images/founder.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    description: leaderProfile.summary,
    knowsAbout: [
      "Customer Success",
      "Digital Transformation",
      "B2B SaaS",
      "Manufacturing Technology",
      "AI Innovation",
      "Go-to-Market Strategy",
    ],
    worksFor: {
      "@type": "Organization",
      name: currentRole.company,
    },
    sameAs: [leaderProfile.linkedinUrl],
  };

  return (
    <>
      <SEO
        title={`Varun Goel — ${currentRole.role}`}
        description={leaderProfile.summary}
        path="/leadership"
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
          <li>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          </li>
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <li className="text-foreground font-medium" aria-current="page">Leadership</li>
        </ol>
      </nav>

      {/* ── Hero (2-column) ────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
              {/* Portrait */}
              <div className="mx-auto md:mx-0">
                <div className="w-48 h-48 md:w-60 md:h-60 lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden ring-4 ring-accent/15 shadow-lg">
                  <img
                    src="/images/founder.jpg"
                    alt={leaderProfile.name}
                    width="280"
                    height="280"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Identity */}
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                  Leadership
                </span>
                <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
                  {leaderProfile.name}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 font-medium">
                  {currentRole.role}
                  <span className="text-muted-foreground"> at </span>
                  {currentRole.company}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-normal">{leaderProfile.location}</Badge>
                  <Badge variant="secondary" className="font-normal">{leaderProfile.experience}</Badge>
                  <Badge variant="secondary" className="font-normal">{leaderProfile.specialization}</Badge>
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
                  {leaderProfile.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                    <a href={leaderProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <a href={`mailto:${leaderProfile.email}`}>
                      <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                      Email me
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Numbers that matter ────────────────────────────────────────── */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Track record</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
                  Numbers & differentiators
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                A snapshot of what shows up across the engagements.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Numeric stats — big-number treatment reserved for actual numbers */}
            {leaderProfile.numericStats.map((s) => (
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

            {/* Qualitative differentiators — icon+label, no fake big numbers */}
            {leaderProfile.qualitativeStats.map((s) => {
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

      {/* ── Core competencies ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">What I do</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Core capabilities
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {leaderProfile.coreCompetencies.map((c) => {
              const Icon = c.icon;
              return (
                <FadeIn key={c.title}>
                  <div className="bg-background p-8 h-full flex items-start gap-4 hover:bg-secondary/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 font-display">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                    </div>
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
              19+ years across Adobe, Zendesk, and Intelegencia — with two stints at Intelegencia bookending the journey.
            </p>
          </FadeIn>

          {/* Vertical timeline: dot column + content column */}
          <ol className="relative space-y-10 md:space-y-12">
            {/* Connecting line (hidden on mobile to avoid clutter) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-[7px] top-2 bottom-2 w-0.5 bg-border"
            />
            {leaderProfile.professionalExperience.map((role, i) => (
              <FadeIn key={`${role.company}-${role.role}`} delay={i * 0.05}>
                <li className="relative md:pl-10">
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className={`hidden md:block absolute left-0 top-2 w-4 h-4 rounded-full ring-4 ring-secondary/30 ${
                      role.isEarlier ? "bg-muted-foreground/50" : "bg-accent"
                    }`}
                  />

                  <article
                    className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 ${
                      role.isEarlier ? "opacity-75" : ""
                    }`}
                  >
                    <div className="md:pt-1">
                      <div className="text-sm font-semibold text-accent tabular-nums">
                        {role.period}
                      </div>
                      {i === 0 && (
                        <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">
                          Current
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight mb-1">
                        {role.role}
                      </h3>
                      <div className="font-semibold text-foreground/80 mb-3">{role.company}</div>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Credentials (Education + Certifications merged) ────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Credentials</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl tracking-tight">
              Education & certifications
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <FadeIn>
              <h3 className="font-display font-bold text-xl mb-6 pb-3 border-b-2 border-accent inline-block">
                Education
              </h3>
              <ul className="space-y-5">
                {leaderProfile.education.map((edu, i) => (
                  <li key={i} className="border-l-2 border-border pl-4 hover:border-accent transition-colors">
                    <div className="font-semibold text-foreground">{edu.program}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{edu.institution}</div>
                    <div className="text-xs text-muted-foreground/80 mt-1 tabular-nums">{edu.year}</div>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="font-display font-bold text-xl mb-6 pb-3 border-b-2 border-accent inline-block">
                Certifications
              </h3>
              <ul className="space-y-5">
                {leaderProfile.certifications.map((cert, i) => (
                  <li key={i} className="border-l-2 border-border pl-4 hover:border-accent transition-colors">
                    <div className="font-semibold text-foreground">{cert.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</div>
                    {cert.year && (
                      <div className="text-xs text-muted-foreground/80 mt-1 tabular-nums">{cert.year}</div>
                    )}
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
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Want to talk?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Whether it's transformation, customer success, or scaling a practice — I'd rather have a working conversation than a discovery deck.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="secondary" className="bg-white text-accent hover:bg-white/90 px-8 py-3">
                <a href={leaderProfile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="bg-transparent text-accent-foreground border-white/30 hover:bg-white/10 px-8 py-3"
                  data-testid="button-contact-leadership-cta"
                >
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
