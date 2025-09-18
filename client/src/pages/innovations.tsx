import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Target } from "lucide-react";
import { Link } from "wouter";

export default function Innovations() {
  return (
    <>
      <Helmet>
        <title>Innovations: NovaTransform's AI Edges | Varun Goel</title>
        <meta name="description" content="Explore NovaTransform's AI-powered innovations including the SOW Generator and upcoming tools for business transformation." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              NovaTransform Innovations: <span className="text-accent">AI-Powered Bursts</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Practical tools from my prototypes—starting strong with AI that transforms your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Current Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              Available Now
            </h2>
            
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-foreground">AI SOW Generator</CardTitle>
                    <p className="text-muted-foreground">Tailors statements of work in minutes</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• AI-driven templates</li>
                      <li>• Risk flagging</li>
                      <li>• Version control</li>
                      <li>• Compliance checks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Benefits:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Cuts drafting time 70%</li>
                      <li>• Ensures precision for GTM launches</li>
                      <li>• Reduces manual errors</li>
                      <li>• Accelerates project kickoffs</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg mb-4">
                  <p className="text-sm font-medium text-accent">Edge: "Bureaucracy burst—focus on strategy."</p>
                </div>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/connect">Request Demo</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/connect">Beta Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
            Nova Bursts Ahead
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-8 h-8 text-accent" />
                  <CardTitle>AI Churn Predictor</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Forecasts customer risks with 95% accuracy—ties directly to Customer Success capability.
                </p>
                <div className="text-sm font-medium text-accent">Coming Q2 2025</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-8 h-8 text-accent" />
                  <CardTitle>GTM Planner Tool</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Automates market mapping and competitive analysis for quick strategic edges.
                </p>
                <div className="text-sm font-medium text-accent">Coming Q3 2025</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 p-8 rounded-2xl">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Innovation Vision</h3>
            <p className="text-lg text-muted-foreground mb-6">
              "Innovation is endless: These tools evolve with user input, turning my 19-year insights into your daily advantage."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/connect">Join Beta Program</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/expertise">Explore Capabilities</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/toolkit">Get Free Toolkit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}