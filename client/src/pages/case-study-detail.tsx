import { useParams } from "wouter";
import { SEO } from "@/lib/seo";
import { FadeIn } from "@/components/motion/fade-in";
import { MetricChip, AnimatedCounter } from "@/components/metric-chip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Quote } from "lucide-react";
import caseStudies from "@/data/case-studies.json";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => window.location.href = '/case-studies'}>
            ← Back to Case Studies
          </Button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    window.location.href = '/case-studies';
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      <SEO 
        title={caseStudy.title}
        description={caseStudy.summary}
      />

      {/* Header */}
      <section className="pt-24 pb-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <Button 
              variant="ghost" 
              onClick={handleBackClick}
              className="mb-6 p-0 hover:bg-transparent hover:text-accent"
              data-testid="button-back-to-case-studies"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                {caseStudy.industry}
              </span>
              <span className="text-muted-foreground text-sm">{caseStudy.year}</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              {caseStudy.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {caseStudy.summary}
            </p>

            {caseStudy.image && (
              <div className="mb-8">
                <img 
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {caseStudy.metrics.map((metric, index) => (
                <MetricChip
                  key={metric.label}
                  label={metric.label}
                  delta={metric.delta}
                  unit={metric.unit}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Context */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="font-display font-bold text-2xl mb-6">Context</h2>
            <p className="text-muted-foreground leading-relaxed">
              {caseStudy.sections.context}
            </p>
          </section>
        </FadeIn>

        {/* Approach */}
        <FadeIn delay={0.1}>
          <section className="mb-16">
            <h2 className="font-display font-bold text-2xl mb-6">Our Approach</h2>
            <div className="space-y-4">
              {caseStudy.sections.approach.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-medium text-accent">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Solution Architecture */}
        <FadeIn delay={0.2}>
          <section className="mb-16">
            <h2 className="font-display font-bold text-2xl mb-6">Solution Architecture</h2>
            <Card className="border border-border">
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.sections.solution}
                </p>
              </CardContent>
            </Card>
          </section>
        </FadeIn>

        {/* Outcomes */}
        <FadeIn delay={0.3}>
          <section className="mb-16">
            <h2 className="font-display font-bold text-2xl mb-6">Measurable Outcomes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseStudy.sections.outcomes.map((outcome, index) => (
                <Card key={outcome.metric} className="border border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">{outcome.metric}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Before</span>
                      <span className="font-medium">
                        <AnimatedCounter 
                          value={outcome.before} 
                          suffix={outcome.unit || ""}
                          duration={1.5}
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">After</span>
                      <span className="font-medium text-accent">
                        <AnimatedCounter 
                          value={outcome.after} 
                          suffix={outcome.unit || ""}
                          duration={2}
                        />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <FadeIn delay={0.4}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Client Testimonial</h2>
              <Card className="border border-accent/20 bg-accent/5">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-accent mb-4" />
                  <blockquote className="text-lg italic text-muted-foreground mb-6">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-muted rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold">{caseStudy.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {caseStudy.testimonial.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </FadeIn>
        )}

        <Separator className="mb-16" />

        {/* CTA */}
        <FadeIn delay={0.5}>
          <section className="text-center">
            <h2 className="font-display font-bold text-3xl mb-4">
              Ready for Similar Results?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve comparable outcomes in your organization. 
              Every successful engagement starts with understanding your unique challenges.
            </p>
            <Button
              onClick={handleContactClick}
              className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
              data-testid="button-contact-case-study-cta"
            >
              Start the Conversation
            </Button>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
