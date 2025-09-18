import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Target, Users, Zap, Brain, Network } from "lucide-react";
import { Link } from "wouter";

const toolkitResources = [
  {
    title: "Retention Cycle Guide",
    description: "5-step PDF with templates and actionable frameworks",
    icon: Users,
    from: "Customer Success",
    downloadUrl: "#"
  },
  {
    title: "Targeted Burst Model Worksheet",
    description: "Excel template for marketing planning and optimization",
    icon: Target,
    from: "Digital Marketing",
    downloadUrl: "#"
  },
  {
    title: "Scale Without Sacrifice Checklist",
    description: "Team-building prompts and leadership frameworks",
    icon: Users,
    from: "Leadership & Scaling",
    downloadUrl: "#"
  },
  {
    title: "AI Burst Starter Kit",
    description: "Quick prototyping guide for AI tool development",
    icon: Brain,
    from: "AI Innovation",
    downloadUrl: "#"
  },
  {
    title: "Quiet Influence Playbook",
    description: "Stakeholder engagement tips and communication strategies",
    icon: Network,
    from: "Stakeholder Engagement",
    downloadUrl: "#"
  },
  {
    title: "Transform Pipeline Framework",
    description: "Digital transformation assessment and planning toolkit",
    icon: Zap,
    from: "Digital Transformation",
    downloadUrl: "#"
  }
];

export default function Toolkit() {
  return (
    <>
      <Helmet>
        <title>Toolkit: Free NovaTransform Resources | Varun Goel</title>
        <meta name="description" content="Download free transformation resources, frameworks, and templates from Varun Goel's expertise toolkit." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Transformation Toolkit: <span className="text-accent">Instant Edges</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Curated from my expertise—free, actionable resources to spark your nova. These aren't generics—they're battle-tested from cross-industry wins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#resources">Browse Resources</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/connect">Request Custom Toolkit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section id="resources" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Download, Apply, Transform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each resource is derived from real-world implementations and proven results across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolkitResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <IconComponent className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <p className="text-sm text-accent font-medium">from {resource.from}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {resource.description}
                    </p>
                    <Button className="w-full group" asChild>
                      <Link href="/connect">
                        <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                        Download
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download All Section */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl">
            <FileText className="w-16 h-16 text-accent mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Get the Complete Toolkit
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Download all resources in one comprehensive package and start your transformation journey today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/connect">Download All Resources</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/edgy-insights">See Applications in Action</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Ready for More?
            </h3>
            <p className="text-lg text-muted-foreground">
              These resources are just the beginning. Let's discuss how to customize them for your specific needs.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/connect">Book Consultation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/expertise">Explore Full Capabilities</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/innovations">See AI Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}