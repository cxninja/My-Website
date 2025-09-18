import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CardShell } from "@/components/ui/card-shell";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Link } from "wouter";
import { Filter, RotateCcw } from "lucide-react";
import { innovations, getInnovationFilters, Innovation } from "@/data/innovations";

const { statuses, categories, capabilities, complexities, audiences } = getInnovationFilters();

// Create display-friendly labels
const statusLabels = {
  'available': 'Available Now',
  'beta': 'Beta Access',
  'coming-soon': 'Coming Soon', 
  'prototype': 'Prototype'
};

const categoryLabels = {
  'ai-tools': 'AI Tools',
  'automation': 'Automation',
  'analytics': 'Analytics',
  'strategy': 'Strategy',
  'collaboration': 'Collaboration'
};

const complexityLabels = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate', 
  'advanced': 'Advanced'
};

export default function Innovations() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [capabilityFilter, setCapabilityFilter] = useState<string>("All");
  const [complexityFilter, setComplexityFilter] = useState<string>("All");

  const filteredInnovations = useMemo(() => {
    return innovations.filter((innovation) => {
      // Status filter
      if (statusFilter !== "All" && innovation.status !== statusFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "All" && innovation.category !== categoryFilter) {
        return false;
      }

      // Capability filter
      if (capabilityFilter !== "All" && !innovation.capabilities.includes(capabilityFilter)) {
        return false;
      }

      // Complexity filter
      if (complexityFilter !== "All" && innovation.complexity !== complexityFilter) {
        return false;
      }

      return true;
    });
  }, [statusFilter, categoryFilter, capabilityFilter, complexityFilter]);

  const handleResetFilters = () => {
    setStatusFilter("All");
    setCategoryFilter("All");
    setCapabilityFilter("All");
    setComplexityFilter("All");
  };

  const getStatusBadgeVariant = (status: Innovation['status']) => {
    switch (status) {
      case 'available': return 'default';
      case 'beta': return 'secondary';
      case 'coming-soon': return 'outline';
      case 'prototype': return 'outline';
      default: return 'outline';
    }
  };

  const renderInnovationCard = (innovation: Innovation, index: number) => {
    const IconComponent = innovation.icon;
    
    const enhancedDescription = (
      <div className="space-y-4">
        <p className="text-sm">{innovation.description}</p>
        
        {/* Status & Category Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={getStatusBadgeVariant(innovation.status)}>
            {statusLabels[innovation.status]}
          </Badge>
          <Badge variant="outline">
            {categoryLabels[innovation.category]}
          </Badge>
          <Badge variant="outline">
            {complexityLabels[innovation.complexity]}
          </Badge>
        </div>

        {/* Features & Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="space-y-1 text-muted-foreground">
              {innovation.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
              {innovation.features.length > 3 && (
                <li className="text-accent">+ {innovation.features.length - 3} more</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Benefits:</h4>
            <ul className="space-y-1 text-muted-foreground">
              {innovation.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx}>• {benefit}</li>
              ))}
              {innovation.benefits.length > 3 && (
                <li className="text-accent">+ {innovation.benefits.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>

        {/* Edge Phrase */}
        <div className="bg-accent/5 p-3 rounded-lg">
          <p className="text-xs font-medium text-accent">Edge: "{innovation.edgePhrase}"</p>
        </div>

        {/* Timeline for non-available items */}
        {innovation.timeline && (
          <div className="text-xs font-medium text-accent">
            {innovation.timeline}
          </div>
        )}
      </div>
    );

    const ctaText = innovation.status === 'available' ? 'Request Demo →' : 
                   innovation.status === 'beta' ? 'Join Beta →' : 
                   'Join Waitlist →';

    return (
      <CardShell
        key={innovation.id}
        title={innovation.title}
        description={enhancedDescription}
        icon={IconComponent}
        ctaText={ctaText}
        href="/connect"
        delay={index * 0.1}
        dataTestId={`innovation-card-${innovation.id}`}
        ariaLabel={`${ctaText.replace(' →', '')} for ${innovation.title}`}
        variant="default"
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Innovations: NovaTransform's AI Edges | Varun Goel</title>
        <meta name="description" content="Explore NovaTransform's comprehensive innovation portfolio - AI-powered tools, automation solutions, and strategic frameworks for business transformation." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                NovaTransform Innovations: <span className="text-accent">Burst Ahead</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From prototypes to production-ready tools—discover {innovations.length} innovations designed to transform your workflow with AI precision and strategic insight.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/connect">Join Innovation Program</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/expertise">Explore Capabilities</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-lg">Filter Innovations</h2>
                  <Badge variant="outline">
                    {filteredInnovations.length} of {innovations.length}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleResetFilters}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger data-testid="select-status-filter">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {statusLabels[status as keyof typeof statusLabels]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger data-testid="select-category-filter">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Capability</label>
                  <Select value={capabilityFilter} onValueChange={setCapabilityFilter}>
                    <SelectTrigger data-testid="select-capability-filter">
                      <SelectValue placeholder="All capabilities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Capabilities</SelectItem>
                      {capabilities.map((capability) => (
                        <SelectItem key={capability} value={capability}>
                          {capability}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Complexity</label>
                  <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                    <SelectTrigger data-testid="select-complexity-filter">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      {complexities.map((complexity) => (
                        <SelectItem key={complexity} value={complexity}>
                          {complexityLabels[complexity as keyof typeof complexityLabels]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Innovations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filteredInnovations.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {filteredInnovations.map(renderInnovationCard)}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-xl mb-2">No innovations found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                <Button onClick={handleResetFilters} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Innovation Vision</h3>
              <p className="text-lg text-muted-foreground mb-6">
                "Innovation is endless: These tools evolve with user input, turning my 19-year insights into your daily advantage. Every burst builds on the last—exponential transformation awaits."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/connect">Join Innovation Program</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/toolkit">Get Free Toolkit</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/expertise">Explore All Capabilities</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}