import { TrendingUp, BarChart3, Zap, Users } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  icon: any;
  description: string;
  bullets: string[];
  artifacts: Array<{
    title: string;
    description: string;
  }>;
  approach: string[];
  outcomes: string[];
}

export const services: Service[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    description: "Full-funnel measurement, CRO sprints, paid media systems, SEO diagnostics.",
    bullets: [
      "Growth loop design and optimization",
      "Conversion rate optimization programs",
      "Marketing measurement and attribution",
      "Campaign operations and automation",
      "Paid media strategy and execution",
      "SEO technical audits and content strategy"
    ],
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
      "Growth hypothesis development and testing framework",
      "Implementation of measurement and optimization systems"
    ],
    outcomes: [
      "Increased marketing qualified leads (MQLs) by 25-50%",
      "Reduced customer acquisition cost (CAC) by 15-30%",
      "Improved marketing ROI visibility and attribution accuracy",
      "Enhanced campaign performance through systematic testing"
    ]
  },
  {
    id: "manufacturing-analytics",
    title: "Manufacturing Analytics",
    icon: BarChart3,
    description: "OEE dashboards, anomaly detection, line telemetry pipelines, SPC alerts.",
    bullets: [
      "Overall Equipment Effectiveness (OEE) monitoring",
      "Real-time production line telemetry",
      "Statistical Process Control (SPC) implementation",
      "Predictive maintenance algorithms",
      "Quality analytics and defect tracking",
      "Production planning optimization"
    ],
    artifacts: [
      {
        title: "OEE Dashboard Suite",
        description: "Real-time visibility into availability, performance, and quality metrics"
      },
      {
        title: "Predictive Maintenance Model",
        description: "ML-powered system for equipment failure prediction and scheduling"
      },
      {
        title: "Quality Control Framework",
        description: "Automated defect detection and root cause analysis system"
      }
    ],
    approach: [
      "Manufacturing process mapping and data source identification",
      "Sensor installation and telemetry pipeline development",
      "Analytics platform design and dashboard implementation",
      "Training and change management for operations teams"
    ],
    outcomes: [
      "Improved OEE scores by 8-15 percentage points",
      "Reduced unplanned downtime by 20-35%",
      "Decreased defect rates through early detection",
      "Enhanced production planning accuracy and efficiency"
    ]
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    icon: Zap,
    description: "Tooling audit, process mapping, integration roadmaps, change enablement.",
    bullets: [
      "Technology stack assessment and optimization",
      "Business process reengineering",
      "System integration and API development",
      "Change management and adoption programs",
      "Digital workflow automation",
      "Cloud migration and modernization"
    ],
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
      "Reduced manual processing time by 40-60%",
      "Improved data accuracy and accessibility",
      "Enhanced employee productivity and satisfaction",
      "Faster decision-making through automated workflows"
    ]
  },
  {
    id: "customer-success",
    title: "Customer Success",
    icon: Users,
    description: "Health scoring, onboarding playbooks, churn early-warning, lifecycle ops.",
    bullets: [
      "Customer health scoring and segmentation",
      "Onboarding process optimization",
      "Churn prediction and prevention",
      "Customer lifecycle management",
      "Success metrics and KPI frameworks",
      "Account expansion strategies"
    ],
    artifacts: [
      {
        title: "Customer Health Score Model",
        description: "Predictive scoring system based on usage, engagement, and outcome metrics"
      },
      {
        title: "Onboarding Playbook",
        description: "Systematic approach to customer activation and early value realization"
      },
      {
        title: "Churn Prevention Framework",
        description: "Early warning system with automated intervention triggers"
      }
    ],
    approach: [
      "Customer journey analysis and touchpoint mapping",
      "Health scoring model development and calibration",
      "Playbook creation and team training",
      "Continuous monitoring and optimization"
    ],
    outcomes: [
      "Reduced customer churn rate by 15-25%",
      "Improved customer lifetime value (CLV)",
      "Faster time to value for new customers",
      "Increased expansion revenue from existing accounts"
    ]
  }
];
