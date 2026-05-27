import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Award, Target, Users, Zap } from "lucide-react";
import { Link } from "wouter";

const founderStory = {
  name: "Varun Goel",
  bio: "NovaTransform is the advisory brand for 19+ years of senior operating experience — across Adobe (APAC Customer Success), Zendesk (CSM leadership), and Intelegencia (current AVP, Client Success & Digital Marketing Group). The methodology is what travels. NovaTransform is how it gets packaged.",
  experience: "19+ years across ops, growth, and customer success"
};

const values = [
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "Every recommendation is tied to measurable business outcomes. I don't just provide advice—I ensure results."
  },
  {
    icon: Users,
    title: "Partnership Mindset",
    description: "I work alongside your team as a partner, not an external observer. Your success is my success."
  },
  {
    icon: Zap,
    title: "Rapid Implementation",
    description: "Speed matters in business. I focus on quick wins while building sustainable long-term solutions."
  }
];

// Career milestones drawn from LinkedIn employment record — kept honest so it
// reconciles with the detailed role list on /leadership.
const timeline = [
  {
    year: "2025",
    title: "AVP — Client Success & Digital Marketing Group, Intelegencia",
    description: "Leading global client strategy, delivery, and transformation across SaaS and manufacturing-aligned services. Driving the digital marketing practice for global customers."
  },
  {
    year: "2023",
    title: "Senior Director, Client Success — Intelegencia",
    description: "Returned to Intelegencia to lead Client Success across manufacturing analytics and digital transformation engagements."
  },
  {
    year: "2020",
    title: "Customer Success Leader, Zendesk",
    description: "Led customer success across India, SAARC, and APAC enterprise accounts — retention, expansion, and executive engagement at scale."
  },
  {
    year: "2016",
    title: "Manager — Customer Success (APAC), Adobe",
    description: "Built and led the APAC Customer Success team for Adobe Experience Cloud, Document Cloud, and Creative Cloud across enterprise accounts."
  },
  {
    year: "2009",
    title: "Associate Director, Client Services — Intelegencia",
    description: "Led global delivery across software, QA, and content teams — 180+ team members serving clients across APAC, EMEA, and the US over 7 years."
  },
  {
    year: "2005",
    title: "Earlier — Sales & Business Development",
    description: "Started in pre-sales and BD across ISHIR, MAG Studios, and Porteck — the foundation for a career built on customer relationships."
  }
];

// Real credentials from LinkedIn. Keep in sync with /leadership certifications.
const certifications = [
  "Project Management Professional (PMP)® — PMI, 2024",
  "Leading Business Transformation in the Age of AI — ISB, 2020",
  "CSM Advanced Certified Professional — Gainsight, 2020",
  "Digital Marketing — IIM Lucknow, 2019",
  "Zendesk Messaging — 2023",
  "ValueSelling Framework — ValueSelling Associates",
  "Lean Six Sigma Green Belt — Exemplar Global"
];

export default function About() {

  return (
    <>
      <SEO
        title="About NovaTransform & Varun Goel"
        description="Learn about NovaTransform's leadership, values, and approach to delivering measurable outcomes through strategic consulting."
        path="/about"
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
              informs every recommendation I make.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <img src="/images/founder.jpg" alt="Varun Goel, Founder of NovaTransform" loading="lazy" decoding="async" width="128" height="128" className="w-32 h-32 rounded-full object-cover mb-6" />
              <h2 className="font-display font-bold text-2xl mb-4">{founderStory.name}</h2>
              <p className="text-muted-foreground mb-4">{founderStory.experience}</p>
              <a 
                href="https://www.linkedin.com/in/varungoel/" 
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
              19+ years across customer success, operations, and growth — at Intelegencia, Adobe, and Zendesk.
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
            <Link href="/contact">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-contact-about-cta"
              >
                Get in Touch
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
