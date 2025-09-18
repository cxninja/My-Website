import { useParams } from "wouter";
import { SEO } from "@/lib/seo";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, ArrowRight, Target, Zap, Download } from "lucide-react";
import { Link } from "wouter";
import { capabilities } from "@/data/capabilities";

export default function CapabilityDetail() {
  const { slug } = useParams();
  const capability = capabilities.find(c => c.id === slug);

  if (!capability) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Capability Not Found</h1>
          <Button asChild>
            <Link href="/expertise">
              ← Back to Expertise
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = capability.icon;

  return (
    <>
      <SEO 
        title={`${capability.title} | NovaTransform Capability | Varun Goel`}
        description={capability.description}
      />

      {/* Header */}
      <section className="pt-24 pb-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <Button 
              variant="ghost" 
              asChild
              className="mb-6 p-0 hover:bg-transparent hover:text-accent"
            >
              <Link href="/expertise">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Capabilities
              </Link>
            </Button>

            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <IconComponent className="w-10 h-10 text-accent" />
            </div>

            <h1 className="font-display font-bold text-4xl md:text-6xl mb-4">
              {capability.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {capability.description}
            </p>

            {/* Framework Highlight */}
            <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20 mb-8">
              <h3 className="font-semibold text-accent mb-2 text-lg">
                {capability.framework.title}
              </h3>
              <p className="text-muted-foreground">
                {capability.framework.description}
              </p>
            </div>

            {/* Quick Win & Edgy Insight */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Quick Win</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">{capability.quickWin}</p>
                  </div>
                </div>
              </div>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-accent mb-1">Edgy Insight</h4>
                    <p className="text-sm text-muted-foreground italic">"{capability.edgyInsight}"</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-6">
              Core Components
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The foundational elements that make this capability deliver transformational results.
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capability.bullets.map((bullet, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-secondary/30 p-4 rounded-lg h-full flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-muted-foreground">{bullet}</span>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Approach & Outcomes */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* My Approach */}
            <FadeIn>
              <h2 className="font-display font-bold text-3xl mb-8">My Approach</h2>
              <div className="space-y-4">
                {capability.approach.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-accent">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Proven Outcomes */}
            <FadeIn delay={0.2}>
              <h2 className="font-display font-bold text-3xl mb-8">Proven Outcomes</h2>
              <div className="space-y-4">
                {capability.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Frameworks & Tools */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl mb-6">
              Key Frameworks & Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Battle-tested resources and methodologies that accelerate your transformation.
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capability.artifacts.map((artifact, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{artifact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{artifact.description}</p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/toolkit">
                        <Download className="w-4 h-4 mr-2" />
                        Get Framework
                      </Link>
                    </Button>
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
              Ready to Leverage This Capability?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how to apply {capability.title.toLowerCase()} to drive explosive impact in your organization. 
              Every transformation starts with understanding your specific edge potential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-accent hover:bg-white/90"
                asChild
              >
                <Link href="/connect">
                  Start Your NovaTransform <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/edgy-insights">
                  See This in Action
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Capabilities */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl mb-4">
              Explore Other Capabilities
            </h2>
            <p className="text-muted-foreground">
              Each capability amplifies the others. Discover the full NovaTransform edge.
            </p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {capabilities
              .filter(c => c.id !== capability.id)
              .slice(0, 4)
              .map((relatedCapability) => (
              <Link key={relatedCapability.id} href={`/capability/${relatedCapability.id}`}>
                <Badge
                  variant="outline"
                  className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {relatedCapability.title}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/expertise">
                View All 8 Capabilities
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}