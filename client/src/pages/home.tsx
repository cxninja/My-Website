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

      {/* Services Overview */}
      <section id="services" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              Our <span className="text-emphasis">Capabilities</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Senior-led expertise across four core domains, each engineered for <span className="font-semibold text-foreground">measurable business impact</span>.
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
      <section id="case-studies" className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              <span className="text-emphasis">Proven</span> Results
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Real outcomes from strategic partnerships. Each engagement designed for <span className="font-semibold text-foreground">measurable impact</span>.
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
              size="lg"
              onClick={handleCaseStudiesNavigate}
              className="magnetic-button border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-4 font-semibold rounded-xl"
              data-testid="button-view-all-case-studies"
            >
              View All Case Studies
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/30 section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center container-spacing">
            <h2 className="heading-lg mb-6 accent-border inline-block pb-4">
              Why <span className="text-emphasis">AstraVantage</span>
            </h2>
            <p className="text-large text-muted-foreground max-w-3xl mx-auto">
              Three core principles that differentiate our approach and ensure <span className="font-semibold text-foreground">your success</span>.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-10">
            {whyUsPoints.map((point, index) => (
              <FadeIn key={point.title} delay={index * 0.1} className="text-center">
                <div className="standard-card p-8 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-4">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </FadeIn>
            ))}
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
              Hear from the leaders who've partnered with us to drive <span className="font-semibold text-foreground">meaningful change</span>.
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
