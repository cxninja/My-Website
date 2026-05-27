import { Helmet } from "react-helmet-async";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  Target,
  TrendingUp,
  Users,
  Award,
  GraduationCap,
  Building,
  Mail,
  Calendar,
  MapPin,
} from "lucide-react";

const leaderProfile = {
  name: "Varun Goel",
  title: "Head of Client Success & Digital Transformation",
  location: "Noida, Uttar Pradesh, India",
  experience: "20+ years",
  specialization: "B2B SaaS & Manufacturing Technology",
  summary:
    "RevOps and Customer Success leader with nearly two decades of experience driving revenue, adoption, and efficiency across B2B SaaS, manufacturing analytics, and digital services. I bridge sales and delivery with AI-driven playbooks to accelerate time-to-value for enterprise clients.",

  keyAchievements: [
    {
      metric: "19+",
      label: "Years Experience",
      description:
        "Deep expertise in B2B SaaS, manufacturing analytics, and digital services since 2005",
    },
    {
      metric: "180+",
      label: "Team Members Led",
      description:
        "Managed global delivery teams across software, QA, and content at Intelegencia (2009 — 2016)",
    },
    {
      metric: "High",
      label: "Portfolio Retention",
      description:
        "Consistently strong client retention across enterprise accounts at Adobe, Zendesk, and Intelegencia",
    },
    {
      metric: "Multi-Million",
      label: "Dollar Expansions",
      description: "Led strategic account growth and expansion across APAC, EMEA, and US markets",
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
    },
    {
      company: "Intelegencia",
      role: "Senior Director, Client Success",
      period: "Jul 2023 — Jan 2025",
      description:
        "Returned to Intelegencia to lead Client Success across manufacturing analytics and digital transformation engagements, ahead of promotion to AVP.",
      skills: ["Customer Success Management", "Manufacturing Analytics", "Account Growth"],
    },
    {
      company: "Zendesk",
      role: "Customer Success Leader",
      period: "Jul 2020 — Jul 2023",
      description:
        "Led customer success across India, SAARC, and APAC enterprise accounts with focus on retention, expansion, and executive engagement. Built scalable engagement models through structured success planning, stakeholder alignment, and partner collaboration. Spearheaded CS Office Hours, ValueSelling Workshops, internal tooling improvements, and cross-functional programs.",
      skills: ["Customer Retention", "Post-Sales Management", "Account Growth"],
    },
    {
      company: "Adobe",
      role: "Manager — Customer Success (APAC)",
      period: "Aug 2016 — Jul 2020",
      description:
        "Built and led the APAC Customer Success team for Adobe Experience Cloud, Document Cloud, and Creative Cloud across enterprise accounts. Partnered with senior stakeholders to drive enablement, retention, and strategic product adoption. Took on a hybrid role leading customer success and owning sales enablement for Adobe Digital Learning Services across SEA and Greater China.",
      skills: [
        "Post-Sales Management",
        "Operations Management",
        "Team Leadership",
      ],
    },
    {
      company: "Intelegencia",
      role: "Associate Director, Client Services",
      period: "Jun 2009 — Aug 2016",
      description:
        "Led global delivery across software, QA, and content teams — managing 180+ members serving clients across APAC, EMEA, and the US over seven years. Launched new service lines including QA, and scaled them into profit-driving units through process improvements and strong client partnerships.",
      skills: ["Service Delivery", "Operations Management", "Team Leadership"],
    },
    {
      company: "Earlier roles",
      role: "Sales & Business Development — Porteck, MAG Studios, ISHIR",
      period: "Nov 2005 — Jun 2009",
      description:
        "Built the foundation: pre-sales, business development, and client engagement across IT services, digital asset management, and application development — serving US, EMEA, and APAC markets.",
      skills: ["Business Development", "Pre-Sales", "Client Engagement"],
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

export default function Leadership() {

  // Person JSON-LD — anchors Varun's personal-brand entity for Google Knowledge Panel.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leaderProfile.name,
    jobTitle: leaderProfile.title,
    url: "https://novatransform.com/leadership",
    image: "https://novatransform.com/images/varun.webp",
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
      name: "NovaTransform",
      url: "https://novatransform.com/",
    },
  };

  return (
    <>
      <SEO
        title="Varun Goel — Customer Success & Digital Transformation Leader"
        description="Meet Varun Goel, Head of Client Success & Digital Transformation with 20+ years of experience in B2B SaaS and manufacturing technology."
        path="/leadership"
        image="/images/varun.webp"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-8">
              {/* Profile picture — self-hosted to replace the LinkedIn CDN
                  hot-link that had an expiring `e=` token. */}
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-accent/20">
                <img
                  src="/images/founder.jpg"
                  alt={leaderProfile.name}
                  width="128"
                  height="128"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
                {leaderProfile.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {leaderProfile.title}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {leaderProfile.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {leaderProfile.experience}
                </span>
              </div>
            </div>

            <Card className="standard-card p-8">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                {leaderProfile.summary}
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Key <span className="text-accent">Achievements</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proven track record of delivering measurable results across
              enterprise client portfolios
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaderProfile.keyAchievements.map((achievement, index) => (
              <FadeIn key={achievement.label} delay={index * 0.1}>
                <Card className="standard-card p-6 text-center h-full">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {achievement.metric}
                  </div>
                  <h3 className="font-semibold mb-3">{achievement.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Core <span className="text-accent">Competencies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep expertise across customer success, digital transformation,
              and enterprise growth
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {leaderProfile.coreCompetencies.map((competency, index) => {
              const IconComponent = competency.icon;
              return (
                <FadeIn key={competency.title} delay={index * 0.1}>
                  <Card className="standard-card p-8 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          {competency.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {competency.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Professional <span className="text-accent">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Leadership roles across industry-leading technology companies
            </p>
          </FadeIn>

          <StaggerContainer className="space-y-8">
            {leaderProfile.professionalExperience.map((role, index) => (
              <FadeIn key={`${role.company}-${role.role}`} delay={index * 0.1}>
                <Card className="standard-card p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2">
                        {role.role}
                      </h3>
                      <div className="text-accent font-medium mb-2">
                        {role.company}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {role.period}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-12">
            <FadeIn>
              <div className="text-center mb-8">
                <GraduationCap className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl mb-6">
                  Education
                </h3>
              </div>
              <div className="space-y-6">
                {leaderProfile.education.map((edu, index) => (
                  <Card key={index} className="standard-card p-6">
                    <h4 className="font-semibold mb-2">{edu.program}</h4>
                    <div className="text-accent font-medium mb-1">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {edu.year}
                    </div>
                  </Card>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center mb-8">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl mb-6">
                  Certifications
                </h3>
              </div>
              <div className="space-y-6">
                {leaderProfile.certifications.map((cert, index) => (
                  <Card key={index} className="standard-card p-6">
                    <h4 className="font-semibold mb-2">{cert.title}</h4>
                    <div className="text-accent font-medium mb-1">
                      {cert.issuer}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {cert.year}
                    </div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our leadership experience can drive
              transformational results for your organization.
            </p>
            <Link href="/contact">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-contact-leadership-cta"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
