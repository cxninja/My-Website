import { Helmet } from "react-helmet-async";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight, Clock, Users, BarChart3 } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  "40-60% reduction in manual processing time",
  "Improved data accuracy and accessibility",
  "Enhanced employee productivity and satisfaction", 
  "Faster decision-making through automated workflows"
];

const painPoints = [
  "Employees spending hours on manual, repetitive tasks",
  "Critical business data trapped in spreadsheets and silos",
  "Slow decision-making due to outdated information",
  "Different departments using incompatible systems"
];

const deliverables = [
  {
    title: "Digital Transformation Roadmap",
    description: "Phased implementation plan with clear milestones, ROI projections, and resource requirements",
    timeline: "Week 2-3"
  },
  {
    title: "Process Automation Framework",
    description: "Standardized approach to identifying and implementing workflow automation opportunities",
    timeline: "Week 3-4"
  },
  {
    title: "Integration Architecture", 
    description: "Technical blueprint for connecting disparate systems and creating unified data flows",
    timeline: "Week 4-5"
  },
  {
    title: "Change Management Program",
    description: "Comprehensive adoption strategy with training materials and success metrics",
    timeline: "Week 5-6"
  }
];

const transformationAreas = [
  {
    title: "Process Automation",
    description: "Eliminate repetitive tasks",
    icon: Zap,
    impact: "Save 40-60% time"
  },
  {
    title: "Data Integration", 
    description: "Connect all your systems",
    icon: BarChart3,
    impact: "Single source of truth"
  },
  {
    title: "Workflow Optimization",
    description: "Streamline operations",
    icon: Clock,
    impact: "Faster decisions"
  }
];

export default function DigitalTransformation() {
  return (
    <>
      <Helmet>
        <title>Digital Transformation Consulting - AstraVantage</title>
        <meta name="description" content="Transform your business with integrated systems, automated workflows, and data-driven processes. Reduce manual work by 60% while improving decision speed and accuracy." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/30 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Zap className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Stop Drowning in <span className="text-accent">Manual Work</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your business operations with integrated systems and automated workflows. 
              Our clients typically reduce <strong>manual processing time by 40-60%</strong> while making <strong>faster, data-driven decisions</strong>.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact" data-testid="button-hero-contact">
                Get Your Digital Assessment <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-6">
              Is This Your Reality?
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {painPoints.map((pain, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-6 border border-destructive/20 rounded-lg bg-destructive/5">
                  <p className="text-muted-foreground">{pain}</p>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
          <FadeIn className="text-center mt-12">
            <p className="text-lg text-muted-foreground">
              <strong>You're not behind—you're ready.</strong> Most growing businesses reach this point. 
              The difference is taking action to transform these inefficiencies into competitive advantages.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Transformation Areas */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-4">
              Three Pillars of Transformation
            </h2>
            <p className="text-muted-foreground">
              Where we focus to deliver maximum impact
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {transformationAreas.map((area, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center p-8 bg-white rounded-xl border">
                  <area.icon className="w-16 h-16 text-accent mx-auto mb-6" />
                  <h3 className="font-bold text-xl mb-3">{area.title}</h3>
                  <p className="text-muted-foreground mb-4">{area.description}</p>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {area.impact}
                  </Badge>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                What You'll Achieve
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A fully integrated digital ecosystem where data flows seamlessly, processes run automatically, 
                and your team focuses on high-value strategic work.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 rounded-2xl border border-accent/20">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-accent mb-2">6-8 Weeks</div>
                  <div className="text-muted-foreground">To Full Transformation</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium">Assessment</span>
                    <span className="text-xs text-muted-foreground">Week 1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium">Blueprint</span>
                    <span className="text-xs text-muted-foreground">Week 2-3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <span className="text-sm font-medium">Pilot</span>
                    <span className="text-xs text-muted-foreground">Week 4-5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                    <span className="text-sm font-medium">Scale</span>
                    <span className="text-xs text-muted-foreground">Week 6-8</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              When You'll See Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive transformation package that modernizes your entire operation
            </p>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {deliverables.map((deliverable, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-accent border-accent/30">
                        {deliverable.timeline}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{deliverable.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{deliverable.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Stop wasting time on manual processes. Let's build an integrated system that 
              scales with your business and empowers your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/contact" data-testid="button-cta-contact">
                  Get Your Digital Assessment
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              60-minute transformation review • No commitment required • Custom roadmap included
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}