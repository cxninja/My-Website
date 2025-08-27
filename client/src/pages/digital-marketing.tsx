import { Helmet } from "react-helmet-async";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CheckCircle, ArrowRight, Target, BarChart3, Zap } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  "25-50% increase in marketing qualified leads",
  "15-30% reduction in customer acquisition cost", 
  "Complete marketing ROI visibility",
  "Systematic testing framework for campaigns"
];

const painPoints = [
  "Can't accurately track which marketing channels are driving revenue",
  "Spending money on ads that don't convert",
  "Website visitors leaving without taking action",
  "Marketing and sales teams working with different data"
];

const deliverables = [
  {
    title: "Marketing Attribution Model",
    description: "Multi-touch attribution framework that shows exactly which touchpoints drive conversions",
    timeline: "Week 2-3"
  },
  {
    title: "Conversion Optimization Program", 
    description: "Systematic A/B testing framework with prioritized experiment roadmap",
    timeline: "Week 3-4"
  },
  {
    title: "Growth Loop Framework",
    description: "Repeatable system for identifying and optimizing your highest-impact growth levers",
    timeline: "Week 4-5"
  },
  {
    title: "Campaign Operations Playbook",
    description: "Standardized processes for campaign creation, monitoring, and optimization",
    timeline: "Week 5-6"
  }
];

export default function DigitalMarketing() {
  return (
    <>
      <Helmet>
        <title>Digital Marketing Consulting - AstraVantage</title>
        <meta name="description" content="Transform your marketing with data-driven attribution, conversion optimization, and systematic growth programs. Reduce CAC by 30% while increasing MQLs by 50%." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/30 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <TrendingUp className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Stop Wasting Money on <span className="text-accent">Marketing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get complete visibility into what's driving revenue, optimize what works, and eliminate what doesn't. 
              Our clients typically see <strong>25-50% more qualified leads</strong> while reducing acquisition costs by <strong>15-30%</strong>.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact" data-testid="button-hero-contact">
                Get Your Marketing Audit <ArrowRight className="w-5 h-5 ml-2" />
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
              Sound Familiar?
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
              <strong>You're not alone.</strong> Most growing companies struggle with marketing measurement and optimization. 
              The good news? These problems are completely solvable.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                What You'll Get
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                A complete marketing transformation that turns your marketing spend into predictable, 
                measurable revenue growth. No more guesswork.
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
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">6-8 Weeks</div>
                  <div className="text-muted-foreground mb-6">To Complete Transformation</div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-sm font-medium">Attribution</div>
                    </div>
                    <div>
                      <BarChart3 className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-sm font-medium">Optimization</div>
                    </div>
                    <div>
                      <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="text-sm font-medium">Growth</div>
                    </div>
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
              What You'll Receive
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Concrete deliverables that transform your marketing from cost center to revenue driver
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
              Ready to Fix Your Marketing?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Stop burning money on marketing that doesn't work. Let's build a system that 
              delivers predictable, measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/contact" data-testid="button-cta-contact">
                  Get Your Free Marketing Audit
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              30-minute call • No sales pitch • Actionable insights guaranteed
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}