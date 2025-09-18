import { 
  Users, Target, Zap, Brain, Network, FileText, 
  CheckSquare, BarChart3, Settings, Lightbulb,
  TrendingUp, Shield, Clock, Award
} from "lucide-react";

export interface ToolkitResource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "worksheet" | "checklist" | "template" | "guide" | "framework";
  category: "customer-success" | "marketing" | "transformation" | "leadership" | "ai-innovation" | "strategy";
  capability: string; // Maps to the 8 capability pillars
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToComplete: string;
  fileSize: string;
  pages?: number;
  format: string;
  icon: typeof Users;
  downloadUrl: string;
  featured: boolean;
}

export const toolkitResources: ToolkitResource[] = [
  // Customer Success Resources
  {
    id: "retention-cycle-guide",
    title: "Retention Cycle Guide",
    description: "5-step PDF with templates and actionable frameworks for customer retention transformation",
    type: "guide",
    category: "customer-success",
    capability: "Customer Success",
    difficulty: "intermediate",
    timeToComplete: "2-3 hours",
    fileSize: "2.4 MB",
    pages: 18,
    format: "PDF + Excel Templates",
    icon: Users,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "churn-prevention-checklist",
    title: "Churn Prevention Checklist",
    description: "30-point checklist to identify and address churn risks before they become losses",
    type: "checklist",
    category: "customer-success", 
    capability: "Customer Success",
    difficulty: "beginner",
    timeToComplete: "30 minutes",
    fileSize: "1.2 MB",
    pages: 8,
    format: "PDF + Notion Template",
    icon: CheckSquare,
    downloadUrl: "/connect",
    featured: false
  },

  // Digital Marketing Resources
  {
    id: "targeted-burst-model",
    title: "Targeted Burst Model Worksheet",
    description: "Excel template for marketing planning and optimization with automated calculations",
    type: "worksheet",
    category: "marketing",
    capability: "Digital Marketing",
    difficulty: "intermediate",
    timeToComplete: "1-2 hours",
    fileSize: "3.1 MB",
    format: "Excel + Google Sheets",
    icon: Target,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "marketing-roi-calculator",
    title: "Marketing ROI Calculator",
    description: "Comprehensive tool to measure and optimize marketing campaign performance",
    type: "template",
    category: "marketing",
    capability: "Digital Marketing",
    difficulty: "beginner",
    timeToComplete: "45 minutes",
    fileSize: "1.8 MB",
    format: "Excel + PowerBI Template",
    icon: BarChart3,
    downloadUrl: "/connect",
    featured: false
  },

  // Leadership & Team Scaling Resources
  {
    id: "scale-without-sacrifice",
    title: "Scale Without Sacrifice Checklist",
    description: "Team-building prompts and leadership frameworks for sustainable growth",
    type: "framework",
    category: "leadership",
    capability: "Leadership & Team Scaling",
    difficulty: "advanced",
    timeToComplete: "3-4 hours",
    fileSize: "2.8 MB",
    pages: 24,
    format: "PDF + Video Series",
    icon: Users,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "leadership-scorecard",
    title: "Leadership Impact Scorecard",
    description: "Quarterly assessment framework to measure and improve leadership effectiveness",
    type: "template",
    category: "leadership",
    capability: "Leadership & Team Scaling", 
    difficulty: "intermediate",
    timeToComplete: "1 hour",
    fileSize: "1.5 MB",
    format: "PDF + Excel Dashboard",
    icon: Award,
    downloadUrl: "/connect",
    featured: false
  },

  // AI Innovation Resources
  {
    id: "ai-burst-starter-kit",
    title: "AI Burst Starter Kit",
    description: "Quick prototyping guide for AI tool development with implementation templates",
    type: "guide",
    category: "ai-innovation",
    capability: "AI Innovation",
    difficulty: "advanced",
    timeToComplete: "4-6 hours",
    fileSize: "4.2 MB", 
    pages: 32,
    format: "PDF + Code Templates",
    icon: Brain,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "ai-readiness-assessment",
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's readiness for AI implementation and transformation",
    type: "checklist",
    category: "ai-innovation",
    capability: "AI Innovation",
    difficulty: "intermediate",
    timeToComplete: "2 hours",
    fileSize: "1.9 MB",
    pages: 12,
    format: "PDF + Online Form",
    icon: Settings,
    downloadUrl: "/connect",
    featured: false
  },

  // Stakeholder Engagement Resources
  {
    id: "quiet-influence-playbook", 
    title: "Quiet Influence Playbook",
    description: "Stakeholder engagement tips and communication strategies for lasting impact",
    type: "guide",
    category: "strategy",
    capability: "Stakeholder Engagement",
    difficulty: "intermediate",
    timeToComplete: "2-3 hours",
    fileSize: "2.1 MB",
    pages: 16,
    format: "PDF + Email Templates",
    icon: Network,
    downloadUrl: "/connect",
    featured: false
  },
  {
    id: "stakeholder-mapping-canvas",
    title: "Stakeholder Mapping Canvas",
    description: "Visual framework to identify, analyze, and engage key stakeholders effectively",
    type: "template",
    category: "strategy",
    capability: "Stakeholder Engagement",
    difficulty: "beginner",
    timeToComplete: "1 hour",
    fileSize: "1.3 MB",
    format: "PDF + Miro Template",
    icon: Network,
    downloadUrl: "/connect",
    featured: true
  },

  // Digital Transformation Resources
  {
    id: "transform-pipeline-framework",
    title: "Transform Pipeline Framework",
    description: "Digital transformation assessment and planning toolkit with step-by-step guidance",
    type: "framework",
    category: "transformation",
    capability: "Digital Transformation",
    difficulty: "advanced",
    timeToComplete: "5-8 hours",
    fileSize: "5.1 MB",
    pages: 42,
    format: "PDF + Project Templates",
    icon: Zap,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "transformation-readiness-meter",
    title: "Transformation Readiness Meter", 
    description: "Quick assessment tool to gauge organizational readiness for digital transformation",
    type: "checklist",
    category: "transformation",
    capability: "Digital Transformation",
    difficulty: "beginner",
    timeToComplete: "30 minutes",
    fileSize: "1.1 MB",
    pages: 6,
    format: "PDF + Online Quiz",
    icon: BarChart3,
    downloadUrl: "/connect",
    featured: false
  },

  // GTM Strategy Resources
  {
    id: "gtm-velocity-planner",
    title: "GTM Velocity Planner",
    description: "Comprehensive go-to-market planning template with timeline and resource allocation",
    type: "template",
    category: "strategy",
    capability: "GTM Strategy",
    difficulty: "advanced",
    timeToComplete: "6-8 hours",
    fileSize: "3.8 MB",
    format: "Excel + PowerPoint Template",
    icon: TrendingUp,
    downloadUrl: "/connect",
    featured: true
  },
  {
    id: "market-timing-framework",
    title: "Market Timing Framework",
    description: "Data-driven approach to identify optimal market entry and launch timing",
    type: "framework",
    category: "strategy",
    capability: "GTM Strategy",
    difficulty: "intermediate", 
    timeToComplete: "3-4 hours",
    fileSize: "2.3 MB",
    pages: 20,
    format: "PDF + Analysis Tools",
    icon: Clock,
    downloadUrl: "/connect",
    featured: false
  },

  // Cross-Industry Resources
  {
    id: "industry-adaptation-guide",
    title: "Cross-Industry Adaptation Guide",
    description: "Framework for adapting strategies and tactics across different industry contexts",
    type: "guide",
    category: "strategy",
    capability: "Cross-Industry Adaptability",
    difficulty: "advanced",
    timeToComplete: "4-5 hours",
    fileSize: "3.4 MB",
    pages: 28,
    format: "PDF + Case Studies",
    icon: Lightbulb,
    downloadUrl: "/connect",
    featured: false
  },
  {
    id: "competitive-edge-matrix",
    title: "Competitive Edge Matrix",
    description: "Strategic framework to identify and develop unique competitive advantages",
    type: "template",
    category: "strategy",
    capability: "Cross-Industry Adaptability",
    difficulty: "intermediate",
    timeToComplete: "2-3 hours",
    fileSize: "1.7 MB",
    format: "Excel + Strategy Canvas",
    icon: Shield,
    downloadUrl: "/connect",
    featured: true
  }
];

// Generate filter options dynamically
export const getToolkitFilters = () => {
  const types = Array.from(new Set(toolkitResources.map(r => r.type)));
  const categories = Array.from(new Set(toolkitResources.map(r => r.category)));
  const capabilities = Array.from(new Set(toolkitResources.map(r => r.capability)));
  const difficulties = Array.from(new Set(toolkitResources.map(r => r.difficulty)));

  return {
    types,
    categories,
    capabilities,
    difficulties
  };
};