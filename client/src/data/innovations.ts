import { Brain, Zap, Target, BarChart3, Users, Cog, Lightbulb, TrendingUp } from "lucide-react";

export interface Innovation {
  id: string;
  title: string;
  description: string;
  status: "available" | "beta" | "coming-soon" | "prototype";
  category: "ai-tools" | "automation" | "analytics" | "strategy" | "collaboration";
  capabilities: string[]; // Maps to the 8 capability pillars
  complexity: "beginner" | "intermediate" | "advanced";
  targetAudience: string[];
  features: string[];
  benefits: string[];
  timeline?: string;
  icon: typeof Brain;
  edgePhrase: string;
}

export const innovations: Innovation[] = [
  {
    id: "ai-sow-generator",
    title: "AI SOW Generator",
    description: "Tailors statements of work in minutes with AI-driven precision and compliance checks",
    status: "available",
    category: "ai-tools",
    capabilities: ["GTM Strategy", "Digital Transformation"],
    complexity: "intermediate",
    targetAudience: ["Consultants", "Project Managers", "Business Leaders"],
    features: [
      "AI-driven templates",
      "Risk flagging",
      "Version control", 
      "Compliance checks"
    ],
    benefits: [
      "Cuts drafting time 70%",
      "Ensures precision for GTM launches",
      "Reduces manual errors",
      "Accelerates project kickoffs"
    ],
    icon: Brain,
    edgePhrase: "Bureaucracy burst—focus on strategy."
  },
  {
    id: "ai-churn-predictor",
    title: "AI Churn Predictor",
    description: "Forecasts customer risks with 95% accuracy—ties directly to Customer Success capability",
    status: "coming-soon",
    category: "ai-tools",
    capabilities: ["Customer Success", "AI Innovation"],
    complexity: "advanced",
    targetAudience: ["Customer Success Teams", "Account Managers", "SaaS Companies"],
    features: [
      "95% prediction accuracy",
      "Real-time risk scoring",
      "Integration with CRM",
      "Automated alerts"
    ],
    benefits: [
      "Prevents customer churn proactively",
      "Increases retention rates",
      "Optimizes customer success efforts",
      "Improves customer lifetime value"
    ],
    timeline: "Q2 2025",
    icon: Zap,
    edgePhrase: "Churn before it churns—retention revolution."
  },
  {
    id: "gtm-planner-tool",
    title: "GTM Planner Tool", 
    description: "Automates market mapping and competitive analysis for quick strategic edges",
    status: "coming-soon",
    category: "strategy",
    capabilities: ["GTM Strategy", "Digital Marketing"],
    complexity: "intermediate",
    targetAudience: ["Marketing Teams", "Product Managers", "Startup Founders"],
    features: [
      "Automated market mapping",
      "Competitive analysis",
      "Launch timeline optimization",
      "Risk assessment"
    ],
    benefits: [
      "Accelerates GTM planning 60%",
      "Identifies market opportunities",
      "Reduces launch risks",
      "Optimizes resource allocation"
    ],
    timeline: "Q3 2025",
    icon: Target,
    edgePhrase: "Market burst—strategy at lightning speed."
  },
  {
    id: "leadership-compass",
    title: "Leadership Compass",
    description: "Guides team scaling decisions with data-driven insights and leadership frameworks",
    status: "prototype",
    category: "collaboration",
    capabilities: ["Leadership & Team Scaling", "Stakeholder Engagement"],
    complexity: "advanced",
    targetAudience: ["CEOs", "Leadership Teams", "HR Directors"],
    features: [
      "Team dynamics analysis",
      "Leadership gap identification", 
      "Scaling roadmaps",
      "Culture assessment"
    ],
    benefits: [
      "Optimizes team performance",
      "Reduces leadership friction",
      "Accelerates scaling processes",
      "Improves team alignment"
    ],
    timeline: "Q4 2025",
    icon: Users,
    edgePhrase: "Leadership burst—scale without the chaos."
  },
  {
    id: "transformation-tracker",
    title: "Transformation Tracker",
    description: "Monitors digital transformation progress with real-time dashboards and milestone tracking",
    status: "beta",
    category: "analytics",
    capabilities: ["Digital Transformation", "Cross-Industry Adaptability"],
    complexity: "intermediate", 
    targetAudience: ["Transformation Leaders", "CIOs", "Operations Teams"],
    features: [
      "Progress dashboards",
      "Milestone tracking",
      "ROI calculations",
      "Risk monitoring"
    ],
    benefits: [
      "Increases transformation success rate",
      "Provides real-time visibility",
      "Optimizes resource allocation",
      "Reduces project risks"
    ],
    timeline: "Beta Access Available",
    icon: BarChart3,
    edgePhrase: "Transformation burst—visibility drives velocity."
  },
  {
    id: "automation-optimizer",
    title: "Automation Optimizer",
    description: "Identifies and prioritizes automation opportunities across business processes",
    status: "coming-soon",
    category: "automation",
    capabilities: ["Digital Transformation", "AI Innovation"],
    complexity: "beginner",
    targetAudience: ["Operations Teams", "Process Managers", "SMB Owners"],
    features: [
      "Process analysis",
      "Automation scoring",
      "Implementation roadmap",
      "ROI forecasting"
    ],
    benefits: [
      "Reduces manual tasks 40%", 
      "Improves process efficiency",
      "Accelerates automation adoption",
      "Maximizes automation ROI"
    ],
    timeline: "Q1 2026",
    icon: Cog,
    edgePhrase: "Automation burst—efficiency without the overwhelm."
  },
  {
    id: "innovation-lab",
    title: "Innovation Lab",
    description: "Collaborative space for testing new ideas with rapid prototyping and validation tools",
    status: "prototype",
    category: "collaboration",
    capabilities: ["AI Innovation", "Cross-Industry Adaptability"],
    complexity: "advanced",
    targetAudience: ["Innovation Teams", "Product Managers", "R&D Teams"],
    features: [
      "Rapid prototyping tools",
      "Idea validation framework",
      "Collaboration spaces",
      "Progress tracking"
    ],
    benefits: [
      "Accelerates innovation cycles",
      "Validates ideas faster",
      "Improves team collaboration",
      "Reduces innovation risks"
    ],
    timeline: "Experimental",
    icon: Lightbulb,
    edgePhrase: "Innovation burst—ideas to impact in record time."
  },
  {
    id: "growth-accelerator",
    title: "Growth Accelerator",
    description: "AI-powered growth strategy recommendations based on industry patterns and market data",
    status: "coming-soon", 
    category: "strategy",
    capabilities: ["GTM Strategy", "Digital Marketing", "Customer Success"],
    complexity: "intermediate",
    targetAudience: ["Growth Teams", "Marketing Leaders", "Founders"],
    features: [
      "Growth pattern analysis",
      "Strategy recommendations",
      "Market opportunity mapping",
      "Performance forecasting"
    ],
    benefits: [
      "Identifies growth levers",
      "Optimizes marketing spend",
      "Accelerates revenue growth",
      "Reduces growth experiment risks"
    ],
    timeline: "Q2 2026",
    icon: TrendingUp,
    edgePhrase: "Growth burst—exponential results, systematic approach."
  }
];

// Generate filter options dynamically
export const getInnovationFilters = () => {
  const statuses = Array.from(new Set(innovations.map(i => i.status)));
  const categories = Array.from(new Set(innovations.map(i => i.category)));
  const capabilities = Array.from(new Set(innovations.flatMap(i => i.capabilities)));
  const complexities = Array.from(new Set(innovations.map(i => i.complexity)));
  const audiences = Array.from(new Set(innovations.flatMap(i => i.targetAudience)));

  return {
    statuses,
    categories, 
    capabilities,
    complexities,
    audiences
  };
};