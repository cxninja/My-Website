import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { SEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import caseStudies from "@/data/case-studies.json";
import testimonials from "@/data/testimonials.json";
import { Check, Quote } from "lucide-react";
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
    description: "Partners, not junior consultants. 20+ years of hands-on experience across strategy and execution."
  },
  {
    title: "Data-native", 
    description: "Every recommendation backed by rigorous analysis. We measure what matters and optimize relentlessly."
  },
  {
    title: "Operator mindset",
    description: "We've built and scaled organizations. We understand the practical realities of implementation."
  }
];

export default function Home() {
  const handleContactScroll = () => {
    const contactElement = document.querySelector('#contact');
    contactElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCaseStudiesNavigate = () => {
    window.location.href = '/case-studies';
  };

  return (
    <>
      <SEO />
      
      <Hero />

      {/* Credibility Strip */}
      <section className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              {credibilityLogos.map((company) => (
                <div 
                  key={company.name} 
                  className="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity"
                  data-testid={`company-${company.name.toLowerCase()}`}
                >
                  <company.icon className="w-8 h-8 text-muted-foreground" />
                  <span className="font-semibold text-sm">{company.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Our Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Senior-led expertise across four core domains, each engineered for measurable business impact.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={`/services#${service.id}`}
                delay={index * 0.1}
              />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section id="case-studies" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real outcomes from strategic partnerships. Each engagement designed for measurable impact.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
            {caseStudies.slice(0, 3).map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.slug}
                title={caseStudy.title}
                industry={caseStudy.industry}
                year={caseStudy.year}
                summary={caseStudy.summary}
                metrics={caseStudy.metrics}
                slug={caseStudy.slug}
                delay={index * 0.1}
              />
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <Button
              variant="outline"
              onClick={handleCaseStudiesNavigate}
              className="magnetic-button border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3"
              data-testid="button-view-all-case-studies"
            >
              View All Case Studies
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Why AstraVantage
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three core principles that differentiate our approach and ensure your success.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {whyUsPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.1} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from the leaders who've partnered with us to drive meaningful change.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <div className="bg-card p-8 rounded-lg border border-border">
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
              Ready to Scale Your Impact?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve measurable outcomes across your most critical business challenges.
            </p>
            <Button
              onClick={handleContactScroll}
              variant="secondary"
              className="magnetic-button bg-white text-accent hover:bg-white/90 px-8 py-3"
              data-testid="button-start-conversation-footer"
            >
              Start a Conversation
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
