import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CardShell } from "@/components/ui/card-shell";
import { FadeIn, StaggerContainer } from "@/components/motion/fade-in";
import { Link } from "wouter";
import { Filter, RotateCcw, Download, Clock, FileText, Star } from "lucide-react";
import { toolkitResources, getToolkitFilters, ToolkitResource } from "@/data/toolkit";

const { types, categories, capabilities, difficulties } = getToolkitFilters();

// Create display-friendly labels
const typeLabels = {
  'pdf': 'PDF Guide',
  'worksheet': 'Worksheet', 
  'checklist': 'Checklist',
  'template': 'Template',
  'guide': 'Guide',
  'framework': 'Framework'
};

const categoryLabels = {
  'customer-success': 'Customer Success',
  'marketing': 'Marketing',
  'transformation': 'Transformation',
  'leadership': 'Leadership', 
  'ai-innovation': 'AI Innovation',
  'strategy': 'Strategy'
};

const difficultyLabels = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

export default function Toolkit() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [capabilityFilter, setCapabilityFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const filteredResources = useMemo(() => {
    return toolkitResources.filter((resource) => {
      // Type filter
      if (typeFilter !== "All" && resource.type !== typeFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== "All" && resource.category !== categoryFilter) {
        return false;
      }

      // Capability filter
      if (capabilityFilter !== "All" && resource.capability !== capabilityFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== "All" && resource.difficulty !== difficultyFilter) {
        return false;
      }

      // Featured filter
      if (showFeaturedOnly && !resource.featured) {
        return false;
      }

      return true;
    });
  }, [typeFilter, categoryFilter, capabilityFilter, difficultyFilter, showFeaturedOnly]);

  const handleResetFilters = () => {
    setTypeFilter("All");
    setCategoryFilter("All");
    setCapabilityFilter("All");
    setDifficultyFilter("All");
    setShowFeaturedOnly(false);
  };

  const getDifficultyBadgeVariant = (difficulty: ToolkitResource['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'default';
      case 'intermediate': return 'secondary';
      case 'advanced': return 'outline';
      default: return 'outline';
    }
  };

  const renderResourceCard = (resource: ToolkitResource, index: number) => {
    const IconComponent = resource.icon;
    
    const enhancedDescription = (
      <div className="space-y-4">
        <p className="text-sm">{resource.description}</p>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">
            {typeLabels[resource.type]}
          </Badge>
          <Badge variant="outline">
            {categoryLabels[resource.category]}
          </Badge>
          <Badge variant={getDifficultyBadgeVariant(resource.difficulty)}>
            {difficultyLabels[resource.difficulty]}
          </Badge>
          {resource.featured && (
            <Badge variant="secondary">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        {/* Resource Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{resource.timeToComplete}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{resource.format}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground">
              Size: {resource.fileSize}
            </div>
            {resource.pages && (
              <div className="text-muted-foreground">
                Pages: {resource.pages}
              </div>
            )}
          </div>
        </div>

        {/* Capability Connection */}
        <div className="bg-accent/5 p-3 rounded-lg">
          <p className="text-xs font-medium text-accent">
            From: {resource.capability} Capability
          </p>
        </div>
      </div>
    );

    return (
      <CardShell
        key={resource.id}
        title={resource.title}
        description={enhancedDescription}
        icon={IconComponent}
        ctaText="Download Free →"
        href={resource.downloadUrl}
        delay={index * 0.1}
        dataTestId={`toolkit-card-${resource.id}`}
        ariaLabel={`Download ${resource.title} for free`}
        variant="default"
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Toolkit: Free NovaTransform Resources | Varun Goel</title>
        <meta name="description" content={`Download ${toolkitResources.length} free transformation resources, frameworks, and templates from Varun Goel's expertise toolkit.`} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                Your Transformation Toolkit: <span className="text-accent">Instant Edges</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Curated from my 19-year expertise—{toolkitResources.length} free, actionable resources to spark your nova. These aren't generics—they're battle-tested from cross-industry wins.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="#resources">Browse {toolkitResources.length} Resources</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/connect">Request Custom Toolkit</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section id="resources" className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold text-lg">Filter Toolkit</h2>
                  <Badge variant="outline">
                    {filteredResources.length} of {toolkitResources.length}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger data-testid="select-type-filter">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {typeLabels[type as keyof typeof typeLabels]}
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
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger data-testid="select-difficulty-filter">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Show</label>
                  <Button
                    variant={showFeaturedOnly ? "default" : "outline"}
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className="w-full justify-start"
                    data-testid="toggle-featured-filter"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Featured Only
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              All Toolkit Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Each resource is derived from real-world implementations and proven results across industries.
            </p>
          </div>

          {filteredResources.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {filteredResources.map(renderResourceCard)}
            </StaggerContainer>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-xl mb-2">No resources found</h3>
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

      {/* CTA Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Need Something Specific?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Can't find exactly what you need? I create custom toolkits tailored to your specific transformation challenges and industry context.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/connect">Request Custom Toolkit</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/innovations">Explore AI Tools</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/#capabilities">View All Capabilities</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}