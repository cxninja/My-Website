import React from "react";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

const engagementModel = [
  {
    phase: "Diagnose",
    description: "Comprehensive assessment of current state, identifying gaps and opportunities"
  },
  {
    phase: "Blueprint", 
    description: "Strategic roadmap with clear milestones, metrics, and success criteria"
  },
  {
    phase: "Pilot",
    description: "Proof-of-concept implementation to validate approach and measure impact"
  },
  {
    phase: "Scale",
    description: "Full rollout with continuous optimization and knowledge transfer"
  }
];

export default function Services() {
  const handleContactClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/contact';
    }
  };

  return (
    <>
      <SEO 
        title="Services"
        description="Senior-led consulting across Digital Marketing, Manufacturing Analytics, Digital Transformation, and Customer Success. Diagnose → Blueprint → Pilot → Scale."
      />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Senior-led expertise across four core domains, each engineered for measurable business impact. 
              Our systematic approach ensures sustainable transformation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
              Our Engagement Model
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results through systematic execution and continuous optimization.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-4 gap-6">
            {engagementModel.map((phase, index) => (
              <FadeIn key={phase.phase} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-accent">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{phase.phase}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                  {index < engagementModel.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div className="lg:sticky lg:top-32">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <Button
                    onClick={handleContactClick}
                    className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground"
                    data-testid={`button-contact-${service.id}`}
                  >
                    Discuss This Service
                  </Button>
                </div>
              </FadeIn>

              <div className="space-y-8">
                {/* Approach */}
                <FadeIn delay={0.2}>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Our Approach</h3>
                    <ul className="space-y-2">
                      {service.approach.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-accent">{stepIndex + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* Deliverables */}
                <FadeIn delay={0.3}>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Key Deliverables</h3>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* Outcomes */}
                <FadeIn delay={0.4}>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Expected Outcomes</h3>
                    <ul className="space-y-2">
                      {service.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                {/* Example Artifacts */}
                <FadeIn delay={0.5}>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Example Artifacts</h3>
                    <div className="grid gap-4">
                      {service.artifacts.map((artifact, artifactIndex) => (
                        <Card key={artifactIndex} className="border border-border">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">{artifact.title}</h4>
                            <p className="text-sm text-muted-foreground">{artifact.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
          
          {index < services.length - 1 && (
            <div className="max-w-7xl mx-auto px-6 mt-20">
              <div className="border-t border-border"></div>
            </div>
          )}
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss which service area can drive the most impact for your organization. 
              Every engagement starts with understanding your specific challenges.
            </p>
            <Button
              onClick={handleContactClick}
              variant="secondary"
              className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
              data-testid="button-contact-services-cta"
            >
              Start the Conversation
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
