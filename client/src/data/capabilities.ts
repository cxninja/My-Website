import { TrendingUp, BarChart3, Zap, Users, Target, Crown, Globe, Brain, Network } from "lucide-react";

export interface Capability {
  id: string;
  title: string;
  icon: any;
  description: string;
  bullets: string[];
  framework: {
    title: string;
    description: string;
  };
  quickWin: string;
  edgyInsight: string;
  artifacts: Array<{
    title: string;
    description: string;
  }>;
  approach: string[];
  outcomes: string[];
}

export const capabilities: Capability[] = [
  {
    id: "customer-success",
    title: "Customer Success",
    icon: Users,
    description: "Retention mastery (95%+): Churn prediction, relationship ecosystems.",
    bullets: [
      "Customer health scoring and segmentation",
      "Predictive churn analysis and prevention",
      "Onboarding process optimization",
      "Customer lifecycle management",
      "Success metrics and KPI frameworks",
      "Account expansion strategies"
    ],
    framework: {
      title: "Nova Retention Cycle",
      description: "Predict, Engage, Evolve – systematic approach to customer lifecycle"
    },
    quickWin: "Segment clients by AI signals for 20% uplift",
    edgyInsight: "Loyalty outlives politics—build it proactively.",
    artifacts: [
      {
        title: "Retention Cycle Guide",
        description: "5-step PDF with templates for predicting and preventing churn"
      },
      {
        title: "Customer Health Score Model",
        description: "Predictive scoring system based on usage, engagement, and outcome metrics"
      },
      {
        title: "Churn Prevention Framework",
        description: "Early warning system with automated intervention triggers"
      }
    ],
    approach: [
      "Customer journey analysis and touchpoint mapping",
      "Health scoring model development and calibration", 
      "Predictive analytics implementation for churn prevention",
      "Playbook creation and team training"
    ],
    outcomes: [
      "Achieve 95%+ customer retention rates",
      "Reduced customer churn rate by 15-25%",
      "Improved customer lifetime value (CLV) by 20%+",
      "Faster time to value for new customers"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    description: "Growth campaigns (40%+ leads): SEO/PPC, AI personalization.",
    bullets: [
      "Growth loop design and optimization",
      "Conversion rate optimization programs",
      "Marketing measurement and attribution",
      "AI-driven campaign personalization",
      "Paid media strategy and execution",
      "SEO technical audits and content strategy"
    ],
    framework: {
      title: "Targeted Burst Model",
      description: "Micro-segment, Optimize, Scale – precision marketing approach"
    },
    quickWin: "A/B test AI headlines for instant conversions",
    edgyInsight: "Data strikes win wars—broad nets lose.",
    artifacts: [
      {
        title: "Marketing Attribution Model",
        description: "Multi-touch attribution framework with custom conversion scoring"
      },
      {
        title: "Growth Loop Framework",
        description: "Systematic approach to identifying and optimizing growth levers"
      },
      {
        title: "Campaign Operations Playbook",
        description: "Standardized processes for campaign setup, monitoring, and optimization"
      }
    ],
    approach: [
      "Current state audit of marketing technology and processes",
      "Customer journey mapping and conversion funnel analysis",
      "AI-powered personalization and targeting implementation",
      "Growth hypothesis development and testing framework"
    ],
    outcomes: [
      "Increased marketing qualified leads (MQLs) by 40%+",
      "Reduced customer acquisition cost (CAC) by 15-30%",
      "Improved marketing ROI visibility and attribution accuracy",
      "Enhanced campaign performance through systematic testing"
    ]
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    icon: Zap,
    description: "Efficiency revolutions (35%+): CRM/AI integrations, agile pivots.",
    bullets: [
      "Technology stack assessment and optimization",
      "Business process reengineering",
      "System integration and API development",
      "Change management and adoption programs",
      "Digital workflow automation",
      "Cloud migration and modernization"
    ],
    framework: {
      title: "Transform Pipeline",
      description: "Assess, Pilot, Iterate – systematic digital evolution"
    },
    quickWin: "Integrate one tool in a bottleneck for quick ROI",
    edgyInsight: "Stagnation is the real risk—burst through.",
    artifacts: [
      {
        title: "Digital Transformation Roadmap",
        description: "Phased implementation plan with clear milestones and ROI projections"
      },
      {
        title: "Process Automation Framework",
        description: "Standardized approach to identifying and implementing workflow automation"
      },
      {
        title: "Integration Architecture",
        description: "Technical blueprint for connecting disparate systems and data sources"
      }
    ],
    approach: [
      "Current state assessment of technology and processes",
      "Future state vision and transformation strategy development",
      "Pilot program design and implementation",
      "Full-scale rollout with continuous optimization"
    ],
    outcomes: [
      "Reduced manual processing time by 35-60%",
      "Improved data accuracy and accessibility",
      "Enhanced employee productivity and satisfaction",
      "Faster decision-making through automated workflows"
    ]
  },
  {
    id: "gtm-strategy",
    title: "GTM Strategy",
    icon: Target,
    description: "Market dominance: Planning to launch, CEO-synced.",
    bullets: [
      "Go-to-market strategy development",
      "Market analysis and competitive positioning",
      "Product launch planning and execution",
      "Sales enablement and channel strategy",
      "Pricing strategy and value proposition",
      "Revenue operations optimization"
    ],
    framework: {
      title: "Edge Launch Sequence",
      description: "Validate, Execute, Adapt – market entry mastery"
    },
    quickWin: "Map competitor gaps with AI for first-mover advantage",
    edgyInsight: "Decider access = unbeatable foresight.",
    artifacts: [
      {
        title: "GTM Strategy Blueprint",
        description: "Comprehensive market entry plan with timing and resource allocation"
      },
      {
        title: "Competitive Intelligence Framework",
        description: "Systematic approach to market analysis and positioning"
      },
      {
        title: "Launch Execution Playbook",
        description: "Step-by-step guide for successful product and service launches"
      }
    ],
    approach: [
      "Market opportunity assessment and sizing",
      "Customer segmentation and ideal customer profile development",
      "Competitive analysis and differentiation strategy",
      "Launch plan development and execution management"
    ],
    outcomes: [
      "Accelerated time-to-market by 25-40%",
      "Improved market penetration and adoption rates",
      "Enhanced competitive positioning and differentiation",
      "Increased revenue velocity and pipeline conversion"
    ]
  },
  {
    id: "leadership-scaling",
    title: "Leadership & Team Scaling",
    icon: Crown,
    description: "Winning teams (5-50+, 25% productivity): Selfless builds.",
    bullets: [
      "Leadership development and coaching",
      "Team structure optimization",
      "Performance management systems",
      "Culture transformation initiatives",
      "Succession planning and talent development",
      "Change management and communication"
    ],
    framework: {
      title: "Scale Without Sacrifice",
      description: "Train, Empower, Measure – sustainable team growth"
    },
    quickWin: "Weekly growth huddles to boost morale 15%",
    edgyInsight: "Shoulder loads; watch stars emerge.",
    artifacts: [
      {
        title: "Leadership Development Framework",
        description: "Structured approach to building high-performing leaders"
      },
      {
        title: "Team Scaling Playbook",
        description: "Best practices for growing teams while maintaining culture and performance"
      },
      {
        title: "Performance Management System",
        description: "Comprehensive framework for measuring and improving team effectiveness"
      }
    ],
    approach: [
      "Current team assessment and capability mapping",
      "Leadership development program design",
      "Performance management system implementation",
      "Culture and change management initiatives"
    ],
    outcomes: [
      "Improved team productivity by 25%+",
      "Enhanced employee engagement and retention",
      "Faster onboarding and time-to-productivity",
      "Stronger leadership pipeline and succession planning"
    ]
  },
  {
    id: "cross-industry",
    title: "Cross-Industry Adaptability",
    icon: Globe,
    description: "Seamless shifts: Startup hustle to enterprise polish.",
    bullets: [
      "Industry best practice analysis",
      "Cross-functional knowledge transfer",
      "Adaptability framework development",
      "Cultural navigation and change management",
      "Process standardization and customization",
      "Stakeholder alignment across domains"
    ],
    framework: {
      title: "Adapt Nova",
      description: "Observe, Blend, Innovate – versatility in action"
    },
    quickWin: "Cross-pollinate tactics from one sector to another",
    edgyInsight: "Versatility crushes silos—evolve unbound.",
    artifacts: [
      {
        title: "Industry Adaptation Framework",
        description: "Systematic approach to applying best practices across sectors"
      },
      {
        title: "Cross-Pollination Playbook",
        description: "Guide for identifying and adapting successful strategies between industries"
      },
      {
        title: "Cultural Navigation Toolkit",
        description: "Resources for understanding and adapting to different organizational cultures"
      }
    ],
    approach: [
      "Industry landscape analysis and best practice identification",
      "Adaptation strategy development and customization",
      "Cross-functional implementation and change management",
      "Performance measurement and continuous optimization"
    ],
    outcomes: [
      "Accelerated learning and adaptation in new domains",
      "Improved innovation through cross-industry insights",
      "Enhanced competitive advantage through unique perspectives",
      "Faster market entry and establishment in new sectors"
    ]
  },
  {
    id: "ai-innovation",
    title: "AI Innovation",
    icon: Brain,
    description: "Tool creation: SOW generators and beyond.",
    bullets: [
      "AI strategy development and implementation",
      "Custom tool and automation development",
      "Machine learning model design",
      "AI ethics and governance frameworks",
      "Process automation and optimization",
      "AI training and adoption programs"
    ],
    framework: {
      title: "AI Burst Method",
      description: "Ideate, Prototype, Deploy – innovation acceleration"
    },
    quickWin: "Automate one repetitive task for 30% time save",
    edgyInsight: "AI is your nova—harness it early.",
    artifacts: [
      {
        title: "AI SOW Generator",
        description: "Automated statement of work creation with AI-driven templates"
      },
      {
        title: "AI Implementation Roadmap",
        description: "Strategic plan for AI adoption and integration across business functions"
      },
      {
        title: "AI Governance Framework",
        description: "Policies and procedures for ethical AI implementation and management"
      }
    ],
    approach: [
      "AI opportunity assessment and use case identification",
      "Proof-of-concept development and validation",
      "Custom AI tool development and deployment",
      "Training and change management for AI adoption"
    ],
    outcomes: [
      "Reduced manual work time by 30-70%",
      "Improved decision-making through AI insights",
      "Enhanced innovation and competitive advantage",
      "Accelerated business processes and workflows"
    ]
  },
  {
    id: "stakeholder-engagement",
    title: "Stakeholder Engagement",
    icon: Network,
    description: "Syncing deciders: CEO collaborations, influence without noise.",
    bullets: [
      "Executive relationship building",
      "Stakeholder mapping and analysis",
      "Communication strategy development",
      "Influence and persuasion techniques",
      "Conflict resolution and mediation",
      "Partnership and alliance management"
    ],
    framework: {
      title: "Quiet Influence Loop",
      description: "Listen, Align, Deliver – subtle but powerful engagement"
    },
    quickWin: "Pre-meeting briefs to preempt objections",
    edgyInsight: "True engagement turns adversaries to allies.",
    artifacts: [
      {
        title: "Stakeholder Mapping Toolkit",
        description: "Comprehensive framework for identifying and categorizing key stakeholders"
      },
      {
        title: "Executive Engagement Playbook",
        description: "Strategies and tactics for building relationships with C-level executives"
      },
      {
        title: "Influence Strategy Framework",
        description: "Systematic approach to building influence and driving alignment"
      }
    ],
    approach: [
      "Stakeholder analysis and relationship mapping",
      "Communication strategy development and customization",
      "Engagement plan implementation and relationship building",
      "Continuous feedback and relationship optimization"
    ],
    outcomes: [
      "Improved stakeholder buy-in by 90%+",
      "Enhanced executive relationships and access",
      "Faster decision-making and project approval",
      "Reduced resistance and increased collaboration"
    ]
  }
];