import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { SEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { capabilities } from "@/data/capabilities";
import edgyInsights from "@/data/edgy-insights.json";
import testimonials from "@/data/testimonials.json";
import { Check, Quote, Crown, BarChart3, Settings } from "lucide-react";
import { Link } from "wouter";
import { SiTechcrunch, SiGoogle, SiAmazon, SiIntel, SiSalesforce } from "react-icons/si";

const credibilityLogos = [
  { name: "TechCorp", icon: SiTechcrunch },
  { name: "ManufactureInc", icon: SiIntel },
  { name: "GrowthCo", icon: SiGoogle },
  { name: "InnovateLtd", icon: SiAmazon },
  { name: "ScaleSys", icon: SiSalesforce }
];

const whyUsPoints = [
  {
    title: "Senior-led",
    description: "Partners, not junior consultants. 20+ years of hands-on experience across strategy and execution.",
    icon: Crown
  },
  {
    title: "Data-native", 
    description: "Every recommendation backed by rigorous analysis. I measure what matters and optimize relentlessly.",
    icon: BarChart3
  },
  {
    title: "Operator mindset",
    description: "I've built and scaled organizations. I understand the practical realities of implementation.",
    icon: Settings
  }
];

export default function Home() {
  // Removed handleConnectClick and handleEdgyInsightsNavigate - using Link components now

  return (
    <>
      <SEO />
      
      <Hero />
      {/* Credibility Strip */}

      {/*
      <section className="section-padding-sm border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-center text-muted-foreground mb-12 font-medium tracking-wide uppercase text-xs">
              Trusted by <span className="text-emphasis">industry leaders</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
              {credibilityLogos.map((company) => (
                <div 
                  key={company.name} 
                  className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300 group cursor-pointer"
                  data-testid={`company-${company.name.toLowerCase()}`}
                >
                  <div className="p-4 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <company.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{company.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      */}
      
      {/* Capabilities Overview */}
      <section id="capabilities" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              My <span className="text-emphasis">Capability Pillars</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              The <span className="text-accent font-semibold">NovaTransform Edge</span>: Eight interconnected capabilities that unlock explosive business transformation and sustainable competitive advantage.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <ServiceCard
                key={capability.id}
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
                href={`/capability/${capability.id}`}
                delay={index * 0.1}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Edgy Insights Preview */}
      <section id="edgy-insights" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              <span className="text-emphasis">Edgy Insights:</span> Bursts of Real Impact
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              6 story-driven transformation narratives with visuals and takeaways. Each insight reveals lessons from <span className="font-semibold text-foreground">explosive business transformations</span>—your edge awaits.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
            {edgyInsights.slice(0, 3).map((insight, index) => (
              <CaseStudyCard
                key={insight.slug}
                title={insight.title}
                industry={insight.industry}
                year={insight.year}
                summary={insight.summary}
                metrics={insight.metrics}
                slug={insight.slug}
                image={insight.image}
                delay={index * 0.1}
              />
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <Link href="/edgy-insights">
              <Button
                variant="outline"
                size="lg"
                className="magnetic-button border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-4 font-semibold rounded-xl"
                data-testid="button-view-all-edgy-insights"
              >
                Explore All Edgy Insights
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              Why Work <span className="text-emphasis">With Me</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Three core principles that differentiate my approach and ensure <span className="font-semibold text-foreground">your success</span>.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {whyUsPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <FadeIn key={point.title} delay={index * 0.1} className="text-center">
                  <div className="standard-card p-8 h-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-4">{point.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              <span className="text-emphasis">Client</span> Testimonials
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Hear from the leaders who've partnered with me to drive <span className="font-semibold text-foreground">meaningful change</span>.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <div className="bg-card p-8 rounded-lg border border-border h-full">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-accent mb-4" />
                    <p className="text-lg italic text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-muted rounded-full mr-4"></div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Ready to Unleash Your NovaTransform?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's explore which capability pillars can drive your explosive business transformation. Every NovaTransform starts with bold action.
            </p>
            <Link href="/connect">
              <Button
                variant="secondary"
                className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
                data-testid="button-connect-footer"
              >
                Ignite Your Edge
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
