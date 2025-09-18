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
    "Client Success & Operations leader with 20+ years in B2B SaaS and manufacturing technology, delivering 98% portfolio retention, multi-million-dollar expansions, and measurable time-to-value gains through adoption programs, operational efficiency, and data-driven strategies.",

  keyAchievements: [
    {
      metric: "98%",
      label: "Portfolio Retention",
      description:
        "Consistently maintained high client retention rates across enterprise accounts",
    },
    {
      metric: "20+",
      label: "Years Experience",
      description:
        "Deep expertise in B2B SaaS and manufacturing technology sectors",
    },
    {
      metric: "Multi-Million",
      label: "Dollar Expansions",
      description: "Led strategic account growth and expansion initiatives",
    },
    {
      metric: "180+",
      label: "Team Members",
      description:
        "Managed large global delivery teams across software, QA, and content",
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
      role: "AVP - Client Success",
      period: "Jan 2025 - Present",
      description:
        "Leading global client strategy, delivery, and transformation across SaaS and manufacturing-aligned services",
      skills: [
        "Customer Success",
        "Manufacturing Analytics",
        "Digital Transformation",
      ],
    },
    {
      company: "Zendesk",
      role: "Customer Success Leader",
      period: "Jul 2020 - Jul 2023",
      description:
        "Led customer success across India, SAARC, and APAC enterprise accounts with focus on retention and expansion",
      skills: ["Customer Retention", "Post-Sales Management", "Account Growth"],
    },
    {
      company: "Adobe",
      role: "Manager - Customer Success (APAC)",
      period: "Aug 2016 - Jul 2020",
      description:
        "Built and led APAC Customer Success team for Adobe Experience Cloud, Document Cloud, and Creative Cloud",
      skills: [
        "Post-Sales Management",
        "Operations Management",
        "Team Leadership",
      ],
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
      year: "2024-2027",
    },
    {
      title: "Zendesk Messaging",
      issuer: "Zendesk",
      year: "2023",
    },
  ],
};

export default function Leadership() {

  return (
    <>
      <SEO
        title="Leadership - Varun Goel"
        description="Meet Varun Goel, Head of Client Success & Digital Transformation with 20+ years of experience in B2B SaaS and manufacturing technology."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-8">
              {/* Thin Banner */}
              <div className="w-full h-60 mb-6 rounded-lg overflow-hidden bg-secondary/50">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5616AQGZv2Ev9tGgwA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733746258207?e=1759363200&v=beta&t=sJiGxL6Q5ld8JMr5boRZwKz4tlDJfePHAFrTjOQosBA"
                  alt="Professional Banner"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-accent/20">
                <img
                  src="https://media.licdn.com/dms/image/v2/C4E03AQEHHepD4pJI7Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517744343084?e=1759363200&v=beta&t=_gyiwiAlvV6cuPEJeA6qKYoiJWDkD-NjgC3Y4i6s56U"
                  alt={leaderProfile.name}
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
