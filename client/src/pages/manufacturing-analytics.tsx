import { Helmet } from "react-helmet-async";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, CheckCircle, ArrowRight, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  "8-15 percentage point improvement in OEE scores",
  "20-35% reduction in unplanned downtime",
  "Decreased defect rates through early detection",
  "Enhanced production planning accuracy"
];

const painPoints = [
  "Equipment failures happen without warning, causing costly downtime",
  "No real-time visibility into production line performance", 
  "Quality issues discovered too late in the process",
  "Production planning based on outdated or incomplete data"
];

const deliverables = [
  {
    title: "OEE Dashboard Suite",
    description: "Real-time visibility into availability, performance, and quality metrics across all production lines",
    timeline: "Week 2-3"
  },
  {
    title: "Predictive Maintenance System",
    description: "ML-powered equipment failure prediction with automated maintenance scheduling",
    timeline: "Week 4-5"
  },
  {
    title: "Quality Control Framework", 
    description: "Automated defect detection and root cause analysis with SPC alerts",
    timeline: "Week 5-6"
  },
  {
    title: "Production Optimization Model",
    description: "Data-driven production planning with demand forecasting and capacity optimization",
    timeline: "Week 6-7"
  }
];

const metrics = [
  { label: "Avg OEE Improvement", value: "12%", icon: TrendingUp },
  { label: "Downtime Reduction", value: "28%", icon: Activity },
  { label: "Early Problem Detection", value: "90%", icon: AlertTriangle }
];

export default function ManufacturingAnalytics() {
  return (
    <>
      <Helmet>
        <title>Manufacturing Analytics Consulting - AstraVantage</title>
        <meta name="description" content="Transform your manufacturing operations with predictive analytics, OEE monitoring, and real-time quality control. Reduce downtime by 35% and improve OEE by 15 points." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-secondary/30 to-secondary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <BarChart3 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Stop Losing Money to <span className="text-accent">Downtime</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your manufacturing operations with predictive analytics and real-time monitoring. 
              Our clients typically see <strong>20-35% less unplanned downtime</strong> and <strong>8-15 point OEE improvements</strong> within 90 days.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contact" data-testid="button-hero-contact">
                Get Your Operations Assessment <ArrowRight className="w-5 h-5 ml-2" />
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
              Manufacturing Challenges Costing You Money
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
              <strong>Every minute of downtime costs money.</strong> But most manufacturers are still operating blind, 
              reacting to problems instead of preventing them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-4">
              Proven Results
            </h2>
            <p className="text-muted-foreground">
              Average improvements across our manufacturing clients
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center p-6 bg-white rounded-xl border">
                  <metric.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <div className="text-3xl font-bold text-accent mb-2">{metric.value}</div>
                  <div className="text-muted-foreground font-medium">{metric.label}</div>
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
                Complete operational visibility with predictive capabilities that prevent problems 
                before they impact production. Turn your factory into a competitive advantage.
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
                  <div className="text-4xl font-bold text-accent mb-2">7-8 Weeks</div>
                  <div className="text-muted-foreground">To Full Implementation</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">1</span>
                    </div>
                    <span className="text-sm">Data pipeline setup</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">2</span>
                    </div>
                    <span className="text-sm">Analytics platform deployment</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">3</span>
                    </div>
                    <span className="text-sm">Team training & optimization</span>
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
              Complete analytics infrastructure that transforms your manufacturing operations
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
              Ready to Eliminate Downtime?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Stop losing money to equipment failures and quality issues. Let's build a predictive 
              system that keeps your operations running smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
                className="bg-white text-accent hover:bg-white/90 font-semibold px-8"
              >
                <Link href="/contact" data-testid="button-cta-contact">
                  Get Your Operations Assessment
                </Link>
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              45-minute facility review • No commitment required • Immediate insights provided
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}