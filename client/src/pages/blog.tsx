import { Helmet } from "react-helmet-async";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  {
    id: 1,
    title: "Digital Transformation: Beyond Technology",
    slug: "digital-transformation-beyond-technology",
    excerpt: "True digital transformation isn't just about adopting new tools—it's about fundamentally reimagining how your business operates.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min",
    category: "Digital Transformation",
    featured: true,
  },
  {
    id: 2,
    title: "Manufacturing Analytics: From Data to Decisions",
    slug: "manufacturing-analytics-data-to-decisions",
    excerpt: "Learn how leading manufacturers are using real-time analytics to optimize operations and reduce costs.",
    author: "Michael Rodriguez",
    date: "2024-01-10",
    readTime: "6 min",
    category: "Manufacturing",
    featured: false,
  },
  {
    id: 3,
    title: "Customer Success Metrics That Actually Matter",
    slug: "customer-success-metrics-that-matter",
    excerpt: "Stop tracking vanity metrics. Focus on the customer success KPIs that drive real business growth.",
    author: "Emily Johnson",
    date: "2024-01-05",
    readTime: "5 min",
    category: "Customer Success",
    featured: false,
  },
  {
    id: 4,
    title: "The ROI of Marketing Automation",
    slug: "roi-of-marketing-automation",
    excerpt: "A comprehensive analysis of how marketing automation impacts revenue and customer lifetime value.",
    author: "David Park",
    date: "2023-12-28",
    readTime: "10 min",
    category: "Digital Marketing",
    featured: false,
  },
  {
    id: 5,
    title: "Building Scalable Systems for Growth",
    slug: "building-scalable-systems-growth",
    excerpt: "Essential principles for creating business systems that grow with your company.",
    author: "Sarah Chen",
    date: "2023-12-20",
    readTime: "7 min",
    category: "Strategy",
    featured: false,
  },
  {
    id: 6,
    title: "Industry 4.0: The Manufacturing Revolution",
    slug: "industry-4-manufacturing-revolution",
    excerpt: "How smart factories are transforming manufacturing through IoT, AI, and predictive analytics.",
    author: "Michael Rodriguez",
    date: "2023-12-15",
    readTime: "9 min",
    category: "Manufacturing",
    featured: false,
  },
];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Blog - AstraVantage Consulting</title>
        <meta name="description" content="Insights and expertise on digital transformation, manufacturing analytics, marketing automation, and customer success strategies." />
      </Helmet>
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
                Insights & <span className="text-accent">Expertise</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic insights, industry trends, and practical guidance from our consultants.
              </p>
            </div>
          </FadeIn>

          {/* Featured Post */}
          {featuredPost && (
            <FadeIn>
              <div className="mb-16">
                <Card className="overflow-hidden border-2 border-accent/20">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-8 flex items-center justify-center">
                      <div className="text-6xl font-bold text-accent/20">
                        FEATURED
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                          {featuredPost.category}
                        </Badge>
                        <Badge variant="outline">Featured</Badge>
                      </div>
                      <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                        <span>By {featuredPost.author}</span>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${featuredPost.slug}`} data-testid="button-read-featured">
                          Read Article <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>
          )}

          {/* Blog Posts Grid */}
          <FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-accent transition-colors">
                      <Link href={`/blog/${post.slug}`} data-testid={`link-blog-post-${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {post.author}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Newsletter CTA */}
          <FadeIn>
            <div className="mt-20">
              <Card className="bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="text-center p-12">
                  <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Get the latest insights on digital transformation, manufacturing analytics, 
                    and customer success delivered to your inbox.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/contact" data-testid="button-subscribe-newsletter">
                      Subscribe to Newsletter
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}