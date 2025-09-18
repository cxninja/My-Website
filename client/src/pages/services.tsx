import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { capabilities } from "@/data/capabilities";
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
  const handleConnectClick = () => {
    window.location.href = '/connect';
  };

  return (
    <>
      <SEO 
        title="Expertise: 8 Pillars of NovaTransform Edge | Varun Goel"
        description="Varun Goel's 8 core capabilities: Customer Success, Digital Marketing, Digital Transformation, GTM Strategy, Leadership & Scaling, Cross-Industry Adaptability, AI Innovation, and Stakeholder Engagement."
      />

      {/* Hero */}
      <section className="pt-24 pb-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Expertise: <span className="text-accent">8 Pillars of NovaTransform Edge</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Deepened across industries—these pillars deliver frameworks honed in real fires. 
              Each capability represents years of cross-industry experience distilled into actionable edges.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
              NovaTransform Methodology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven approach that combines strategic thinking with tactical execution, delivering transformational results through systematic frameworks.
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

      {/* Capability Sections */}
      {capabilities.map((capability, index) => (
        <section key={capability.id} id={capability.id} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <FadeIn>
                <div className="lg:sticky lg:top-32">
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <capability.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                    {capability.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {capability.description}
                  </p>
                  {/* Framework */}
                  <div className="bg-accent/5 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-accent mb-1">{capability.framework.title}</h4>
                    <p className="text-sm text-muted-foreground">{capability.framework.description}</p>
                  </div>
                  {/* Quick Win & Edgy Insight */}
                  <div className="space-y-2 mb-6">
                    <div className="text-sm">
                      <span className="font-medium text-green-600">Quick Win:</span>
                      <span className="text-muted-foreground ml-2">{capability.quickWin}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-accent">Edgy Insight:</span>
                      <span className="text-muted-foreground ml-2 italic">"{capability.edgyInsight}"</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleConnectClick}
                    className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground"
                    data-testid={`button-connect-${capability.id}`}
                  >
                    Leverage This Capability
                  </Button>
                </div>
              </FadeIn>

              <div className="space-y-8">
                {/* Approach */}
                <FadeIn delay={0.2}>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">My Approach</h3>
                    <ul className="space-y-2">
                      {capability.approach.map((step, stepIndex) => (
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
                    <h3 className="font-semibold text-xl mb-4">Core Components</h3>
                    <ul className="space-y-2">
                      {capability.bullets.map((bullet, bulletIndex) => (
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
                    <h3 className="font-semibold text-xl mb-4">Proven Outcomes</h3>
                    <ul className="space-y-2">
                      {capability.outcomes.map((outcome, outcomeIndex) => (
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
                    <h3 className="font-semibold text-xl mb-4">Key Frameworks & Tools</h3>
                    <div className="grid gap-4">
                      {capability.artifacts.map((artifact, artifactIndex) => (
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
          
          {index < capabilities.length - 1 && (
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
              Ready to Unleash Your NovaTransform?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's identify which capabilities can deliver the most explosive impact for your transformation. 
              Every nova starts with understanding your unique edge potential.
            </p>
            <Button
              onClick={handleConnectClick}
              variant="secondary"
              className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
              data-testid="button-connect-capabilities-cta"
            >
              Ignite Your Transformation
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
