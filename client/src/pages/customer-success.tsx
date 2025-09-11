import { Helmet } from "react-helmet-async";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight, Heart, TrendingUp, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  "15-25% reduction in customer churn rate",
  "Improved customer lifetime value (CLV)",
  "Faster time to value for new customers",
  "Increased expansion revenue from existing accounts"
];

const painPoints = [
  "Customers churning without warning signs",
  "Long, inconsistent onboarding that delays value realization",
  "No systematic approach to identifying expansion opportunities",
  "Customer success team reacting to problems instead of preventing them"
];

const deliverables = [
  {
    title: "Customer Health Score Model",
    description: "Predictive scoring system based on usage, engagement, and outcome metrics with automated alerts",
    timeline: "Week 2-3"
  },
  {
    title: "Onboarding Playbook",
    description: "Systematic approach to customer activation and early value realization with milestone tracking",
    timeline: "Week 3-4"
  },
  {
    title: "Churn Prevention Framework", 
    description: "Early warning system with automated intervention triggers and retention playbooks",
    timeline: "Week 4-5"
  },
  {
    title: "Expansion Revenue Engine",
    description: "Data-driven system for identifying upsell/cross-sell opportunities and timing",
    timeline: "Week 5-6"
  }
];

const successMetrics = [
  { 
    metric: "Churn Reduction", 
    value: "20%", 
    description: "Average churn rate improvement",
    icon: TrendingUp 
  },
  { 
    metric: "Time to Value", 
    value: "50%", 
    description: "Faster customer activation",
    icon: Users 
  },
  { 
    metric: "Early Warning", 
    value: "85%", 
    description: "At-risk customers identified",
    icon: AlertCircle 
  }
];

export default function CustomerSuccess() {
  return (
    <>
      <Helmet>
        <title>Customer Success Consulting - NovaTransform</title>
        <meta name="description" content="Transform your customer success with predictive health scoring, systematic onboarding, and churn prevention. Reduce churn by 25% while increasing expansion revenue." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/30 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Stop Losing <span className="text-accent">Customers</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Turn customer success into a predictable growth engine. Our clients typically see 
              <strong> 15-25% reduction in churn</strong> and <strong>significant increases in expansion revenue</strong> within 90 days.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact" data-testid="button-hero-contact">
                Get Your Customer Success Audit <ArrowRight className="w-5 h-5 ml-2" />
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
              Sound Like Your Customer Success Challenges?
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {painPoints.map((pain, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-6 border border-destructive/20 rounded-lg bg-destructive/5 h-full">
                  <p className="text-gray-800 dark:text-gray-200">{pain}</p>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
          <FadeIn className="text-center mt-12">
            <p className="text-lg text-muted-foreground">
              <strong>Every churned customer represents lost revenue and growth potential.</strong> 
              But most companies are still flying blind when it comes to customer health.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-4">
              Proven Customer Success Results
            </h2>
            <p className="text-muted-foreground">
              Average improvements across our customer success engagements
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center p-8 bg-white rounded-xl border">
                  <metric.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-accent mb-2">{metric.value}</div>
                  <div className="font-semibold mb-2">{metric.metric}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
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
                A predictive customer success system that identifies opportunities and risks before they impact 
                your business. Transform reactive support into proactive growth.
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
                  <div className="text-4xl font-bold text-accent mb-2">6 Weeks</div>
                  <div className="text-muted-foreground">To Customer Success Transformation</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-accent" />
                    <div>
                      <div className="font-medium text-sm">Health Scoring</div>
                      <div className="text-xs text-muted-foreground">Predict churn before it happens</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-accent" />
                    <div>
                      <div className="font-medium text-sm">Onboarding System</div>
                      <div className="text-xs text-muted-foreground">Accelerate time to value</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-accent" />
                    <div>
                      <div className="font-medium text-sm">Expansion Engine</div>
                      <div className="text-xs text-muted-foreground">Identify growth opportunities</div>
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
              When You'll See Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete customer success infrastructure that turns retention into your competitive advantage
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
              Ready to Stop Customer Churn?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Turn customer success into predictable growth. Let's build a system that identifies 
              opportunities and prevents churn before it happens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/contact" data-testid="button-cta-contact">
                  Get Your Customer Success Audit
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              45-minute customer health review • No commitment required • Churn risk assessment included
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}