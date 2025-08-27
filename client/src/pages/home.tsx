import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { SEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import caseStudies from "@/data/case-studies.json";
import testimonials from "@/data/testimonials.json";
import { Check, Quote, ArrowRight } from "lucide-react";
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
      <section id="services" className="py-20 bg-gradient-to-br from-secondary/30 via-accent/5 to-secondary/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <FadeIn className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <span className="text-accent font-semibold text-sm">🚀 PROVEN EXPERTISE</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Four <span className="text-accent">Game-Changing</span> Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Senior-led expertise across four core domains, each engineered for measurable business impact.
            </p>
            
            {/* Success metrics banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">25-50%</div>
                <div className="text-xs text-muted-foreground">Lead Growth</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">30%</div>
                <div className="text-xs text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">60%</div>
                <div className="text-xs text-muted-foreground">Time Savings</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">15-25%</div>
                <div className="text-xs text-muted-foreground">Churn Reduction</div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="group">
                <FadeIn delay={index * 0.1}>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="font-display font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
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
