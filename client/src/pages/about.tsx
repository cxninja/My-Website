import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Award, Target, Users, Zap } from "lucide-react";

const founderStory = {
  name: "Leadership Team",
  bio: "With over 20 years of combined experience across operations and growth, our team brings pragmatic, data-led execution to every engagement. We've built and scaled organizations across multiple industries, understanding both the strategic vision and tactical realities of transformation.",
  experience: "20+ years across ops and growth"
};

const values = [
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "Every recommendation is tied to measurable business outcomes. We don't just provide advice—we ensure results."
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "We work alongside your team as partners, not external observers. Your success is our success."
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Speed matters in business. We focus on quick wins while building sustainable long-term solutions."
  }
];

const timeline = [
  {
    year: "2020",
    title: "Founded NovaTransform",
    description: "Established with the mission to bridge the gap between strategy and execution for mid-market companies."
  },
  {
    year: "2021",
    title: "First Major Client Success",
    description: "Delivered 40% improvement in manufacturing OEE for precision parts manufacturer, establishing our methodology."
  },
  {
    year: "2022",
    title: "Digital Marketing Practice Launch",
    description: "Expanded services to include full-funnel marketing optimization, helping SaaS companies scale demand generation."
  },
  {
    year: "2023",
    title: "Customer Success Expertise",
    description: "Added customer lifecycle management and churn prevention to our core service offerings."
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Recognized as a leading boutique consultancy for outcome-focused transformation projects."
  }
];

const certifications = [
  "Google Analytics Certified",
  "Salesforce Certified Administrator",
  "AWS Solutions Architect",
  "Lean Six Sigma Black Belt",
  "Certified Customer Success Manager"
];

export default function About() {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about NovaTransform's leadership team, values, and approach to delivering measurable outcomes through strategic consulting."
      />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              About NovaTransform
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              I'm an operator who became a consultant. My experience building and scaling businesses 
              informs every recommendation we make.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="w-32 h-32 bg-muted rounded-full mb-6"></div>
              <h2 className="font-display font-bold text-2xl mb-4">{founderStory.name}</h2>
              <p className="text-muted-foreground mb-4">{founderStory.experience}</p>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline"
                data-testid="link-founder-linkedin"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {founderStory.bio}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              My Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every client engagement and shape my approach to consulting.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <Card className="border border-border h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-xl mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              My Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in building a consulting practice focused on measurable outcomes.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <FadeIn key={item.year} delay={index * 0.1}>
                  <div className="relative flex items-start gap-8">
                    <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center border-4 border-background relative z-10">
                      <span className="font-bold text-accent">{item.year}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Credentials & Certifications
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I maintain industry certifications to ensure I'm always current with best practices.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, index) => (
                <Badge key={cert} variant="secondary" className="px-4 py-2 text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  {cert}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              My Operating Principles
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                <strong className="text-foreground">Measure Everything.</strong> Every initiative must have clear KPIs and measurement frameworks. 
                We believe what gets measured gets optimized.
              </p>
              <p className="mb-6">
                <strong className="text-foreground">Start with Why.</strong> Understanding the business context and desired outcomes 
                shapes every recommendation we make.
              </p>
              <p className="mb-6">
                <strong className="text-foreground">Pilot Before Scale.</strong> Prove concepts with small, controlled experiments 
                before committing to full implementations.
              </p>
              <p>
                <strong className="text-foreground">Transfer Knowledge.</strong> My success is measured by your team's ability 
                to sustain improvements long after we're gone.
              </p>
            </div>
          </FadeIn>
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
              We'd love to learn about your challenges and discuss how our approach 
              can drive measurable results for your business.
            </p>
            <Button
              onClick={handleContactClick}
              variant="secondary"
              className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
              data-testid="button-contact-about-cta"
            >
              Get in Touch
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
