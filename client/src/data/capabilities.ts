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

  // ─── Expanded fields used by /practice/:slug ────────────────────────────
  headlineMetric?: { value: string; label: string };
  painSignals?: string[];
  methodology?: Array<{ step: string; title: string; description: string; duration?: string }>;
  metrics?: Array<{ value: string; label: string }>;
  bestAs?: "Sprint" | "Retainer" | "Advisory";
  typicalDuration?: string;
  faqs?: Array<{ q: string; a: string }>;
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
      description: "Predict, Engage, Evolve. A systematic approach to customer lifecycle."
    },
    quickWin: "Segment clients by AI signals for 20% uplift",
    edgyInsight: "Loyalty outlives politics. Build it proactively.",
    artifacts: [
      { title: "Retention Cycle Guide", description: "5-step PDF with templates for predicting and preventing churn" },
      { title: "Customer Health Score Model", description: "Predictive scoring system based on usage, engagement, and outcome metrics" },
      { title: "Churn Prevention Framework", description: "Early warning system with automated intervention triggers" }
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
    ],
    headlineMetric: { value: "95%+", label: "Portfolio retention target" },
    painSignals: [
      "Churn creeping past your acceptable threshold and you don't know why",
      "Onboarding takes longer than 60 days and TTV keeps slipping",
      "CSMs are firefighting instead of growing accounts",
      "No reliable signal for which customers are about to leave"
    ],
    methodology: [
      { step: "01", title: "Diagnose the churn engine", description: "Map the actual customer journey, segment cohorts, and find where value is leaking.", duration: "Week 1-2" },
      { step: "02", title: "Build the health model", description: "Stand up a scoring framework that combines usage, engagement, and outcome signals.", duration: "Week 3-5" },
      { step: "03", title: "Wire the playbooks", description: "Translate health signals into CSM motions, automated triggers, and exec escalations.", duration: "Week 6-9" },
      { step: "04", title: "Hand over and compound", description: "Train the team, transfer the dashboards, and set the quarterly review rhythm.", duration: "Week 10-12" }
    ],
    metrics: [
      { value: "95%+", label: "Gross retention" },
      { value: "20%+", label: "CLV uplift" },
      { value: "<60 days", label: "Time to first value" },
      { value: "15-25%", label: "Churn reduction" }
    ],
    bestAs: "Retainer",
    typicalDuration: "3-6 month retainer with quarterly review cadence after",
    faqs: [
      { q: "Do you build the health-scoring model from scratch or use Gainsight / similar?", a: "Both. If you already run Gainsight, Planhat, or ChurnZero I build on top. If you don't, I'll build a lean model in your existing data stack (Snowflake, BigQuery, even Sheets to start) and add tooling only when it's earning its keep." },
      { q: "What does success look like in the first 90 days?", a: "First measurable win: a working churn-risk signal flowing to CSMs with at least one save story to point at. By day 90 you should have a calibrated health model, a documented intervention playbook, and the first cohort of high-risk accounts actively being worked." },
      { q: "Will you replace our CS leader or work alongside?", a: "Always alongside. The work has to live inside your team after I leave. If you don't have a CS leader yet I can play that role in an interim capacity, but the goal is to hire and hand over." },
      { q: "Which industries does this work best for?", a: "B2B SaaS first. Also strong fit for tech-enabled services and any subscription business with a real renewal motion. Less of a fit for transactional businesses with no expansion potential." },
      { q: "How do you measure your own impact?", a: "Three numbers: gross retention rate, net retention rate, and time-to-first-value. We agree on the baseline in week one and review the trend monthly." }
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
      description: "Micro-segment, Optimize, Scale. A precision marketing approach."
    },
    quickWin: "A/B test AI headlines for instant conversions",
    edgyInsight: "Data strikes win wars. Broad nets lose.",
    artifacts: [
      { title: "Marketing Attribution Model", description: "Multi-touch attribution framework with custom conversion scoring" },
      { title: "Growth Loop Framework", description: "Systematic approach to identifying and optimizing growth levers" },
      { title: "Campaign Operations Playbook", description: "Standardized processes for campaign setup, monitoring, and optimization" }
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
    ],
    headlineMetric: { value: "40%+", label: "Lead growth on managed campaigns" },
    painSignals: [
      "MQL volume is flat or declining despite increased spend",
      "CAC keeps climbing and you can't tell where the leakage is",
      "Attribution is broken, so you can't defend marketing investment",
      "Paid channels and SEO operate as silos with no growth loop"
    ],
    methodology: [
      { step: "01", title: "Audit the funnel", description: "Stack audit, attribution check, channel-mix diagnostic, and conversion teardown.", duration: "Week 1-2" },
      { step: "02", title: "Find the unlock", description: "Identify the single biggest CAC or conversion lever, prioritised by ROI and time-to-value.", duration: "Week 2-3" },
      { step: "03", title: "Ship the test", description: "AI-personalised campaign, CRO sprint, or attribution rebuild. Measurable result inside 30 days.", duration: "Week 3-8" },
      { step: "04", title: "Operationalise growth", description: "Hand over the playbook, dashboards, and an experiment cadence the team can run without me.", duration: "Week 8-12" }
    ],
    metrics: [
      { value: "40%+", label: "MQL growth" },
      { value: "15-30%", label: "CAC reduction" },
      { value: "<30 days", label: "First win" },
      { value: "AI-first", label: "Personalisation default" }
    ],
    bestAs: "Sprint",
    typicalDuration: "4-6 week sprint, optional retainer for execution",
    faqs: [
      { q: "Do you take over our paid media or work with our agency?", a: "Either. I can run paid in-house as part of a retainer, or work as a strategic layer on top of your existing agency to fix the targeting, attribution, and creative testing logic without disrupting the buying." },
      { q: "What if our attribution is broken or non-existent?", a: "Then we start there. Without attribution you can't optimise anything, so the first sprint output is a working multi-touch model in whatever stack you already use (HubSpot, GA4, Mixpanel, a custom data warehouse)." },
      { q: "How AI-heavy is the work?", a: "AI is the default for personalisation, creative variant generation, and lookalike segmentation. But the lever is always the funnel logic, not the model. We use AI where it compresses time-to-result, not because it's on the brief." },
      { q: "What's the smallest engagement that makes sense?", a: "A 4-week diagnostic sprint with a single quick-win pilot. You get a prioritised roadmap, a fixed-fee deliverable, and a clear go/no-go on a deeper engagement." }
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
      description: "Assess, Pilot, Iterate. Systematic digital evolution."
    },
    quickWin: "Integrate one tool in a bottleneck for quick ROI",
    edgyInsight: "Stagnation is the real risk. Burst through.",
    artifacts: [
      { title: "Digital Transformation Roadmap", description: "Phased implementation plan with clear milestones and ROI projections" },
      { title: "Process Automation Framework", description: "Standardized approach to identifying and implementing workflow automation" },
      { title: "Integration Architecture", description: "Technical blueprint for connecting disparate systems and data sources" }
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
    ],
    headlineMetric: { value: "35%+", label: "Operational efficiency lift" },
    painSignals: [
      "Teams burning hours on manual, repetitive work that should be automated",
      "Data trapped in silos, slowing every decision down",
      "Systems don't talk to each other and integration debt is growing",
      "You've tried 'transformation' before and it stalled at the slide deck stage"
    ],
    methodology: [
      { step: "01", title: "Map the current state", description: "Stack audit, process inventory, integration debt assessment, decision-latency mapping.", duration: "Week 1-3" },
      { step: "02", title: "Design the future state", description: "Target architecture, prioritised intervention list, ROI projections, change-management plan.", duration: "Week 3-5" },
      { step: "03", title: "Pilot the highest-ROI move", description: "Ship one integration or automation that proves the model. Measurable lift inside 90 days.", duration: "Week 5-12" },
      { step: "04", title: "Scale and stabilise", description: "Roll out across the org with continuous optimisation. Team owns it by quarter end.", duration: "Quarter 2+" }
    ],
    metrics: [
      { value: "35-60%", label: "Manual time reduction" },
      { value: "<90 days", label: "First measurable win" },
      { value: "AI-first", label: "Automation default" },
      { value: "Quarter 2", label: "Team operating independently" }
    ],
    bestAs: "Retainer",
    typicalDuration: "6-12 month retainer with clear quarterly milestones",
    faqs: [
      { q: "How is this different from a Big 4 transformation engagement?", a: "Three things: senior operator does the work (not analysts), first measurable win inside 90 days (not month 9), and the methodology lives inside your team after I leave (no perpetual dependency)." },
      { q: "Do I need to commit to a specific tech stack first?", a: "No. I work with what you have wherever possible and only recommend new tooling when the ROI is clear. The bias is toward solving with process and data before solving with software." },
      { q: "What if our last transformation effort failed?", a: "Most do, and usually for the same reason: too much architecture before any value. We invert that. First pilot ships inside 90 days, then we scale what works." },
      { q: "How do you handle change management?", a: "Embedded from day one, not bolted on. The pilot includes the people who'll own it operationally, so adoption is built in rather than fought for." }
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
      description: "Validate, Execute, Adapt. Market entry mastery."
    },
    quickWin: "Map competitor gaps with AI for first-mover advantage",
    edgyInsight: "Decider access = unbeatable foresight.",
    artifacts: [
      { title: "GTM Strategy Blueprint", description: "Comprehensive market entry plan with timing and resource allocation" },
      { title: "Competitive Intelligence Framework", description: "Systematic approach to market analysis and positioning" },
      { title: "Launch Execution Playbook", description: "Step-by-step guide for successful product and service launches" }
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
    ],
    headlineMetric: { value: "25-40%", label: "Time-to-market acceleration" },
    painSignals: [
      "New product launches that fizzle three months in",
      "Sales and marketing chasing different ICPs",
      "Pricing decisions made on gut feel, not value-anchoring",
      "Competitive positioning that sounds like everyone else"
    ],
    methodology: [
      { step: "01", title: "Validate the bet", description: "Market sizing, ICP sharpening, competitive teardown, pricing logic.", duration: "Week 1-3" },
      { step: "02", title: "Build the launch plan", description: "Positioning, messaging, channel strategy, sales enablement, launch sequence.", duration: "Week 3-6" },
      { step: "03", title: "Execute the launch", description: "Coordinated launch across channels with pre-built measurement and reaction protocols.", duration: "Week 6-10" },
      { step: "04", title: "Adapt and scale", description: "Post-launch retro, iteration playbook, hand-over to the in-house GTM team.", duration: "Week 10-14" }
    ],
    metrics: [
      { value: "25-40%", label: "Faster TTM" },
      { value: "CEO-synced", label: "Stakeholder alignment" },
      { value: "ICP-precise", label: "Targeting discipline" },
      { value: "Value-anchored", label: "Pricing logic" }
    ],
    bestAs: "Sprint",
    typicalDuration: "6-12 week launch sprint, optional advisory after",
    faqs: [
      { q: "Do you do the launch execution or just the strategy?", a: "Both, depending on what you need. Sprint mode delivers strategy + launch plan with your team executing. Retainer mode includes embedded launch execution." },
      { q: "How early should we engage you in a product cycle?", a: "Earlier than you think. The biggest GTM mistakes are baked in during product definition, not at launch. Engaging at the product-market-fit stage costs less than fixing positioning post-launch." },
      { q: "Do you work with consumer launches or only B2B?", a: "Primarily B2B and B2B SaaS. I've worked with consumer products but the playbook is sharpest where sales cycles involve multiple stakeholders and considered purchase." },
      { q: "How do you handle pricing strategy?", a: "Value-based first, always. We anchor pricing to outcomes the product unlocks for the customer, then triangulate against competitive context and willingness-to-pay research. Cost-plus only when there's literally no other reference point." }
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
      description: "Train, Empower, Measure. Sustainable team growth."
    },
    quickWin: "Weekly growth huddles to boost morale 15%",
    edgyInsight: "Shoulder loads; watch stars emerge.",
    artifacts: [
      { title: "Leadership Development Framework", description: "Structured approach to building high-performing leaders" },
      { title: "Team Scaling Playbook", description: "Best practices for growing teams while maintaining culture and performance" },
      { title: "Performance Management System", description: "Comprehensive framework for measuring and improving team effectiveness" }
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
    ],
    headlineMetric: { value: "25%+", label: "Team productivity gain" },
    painSignals: [
      "You're the bottleneck on every decision and burning out",
      "Hiring is fast but onboarding is broken; new hires take 6 months to be productive",
      "Your team is talented but operates as individuals, not as a system",
      "Senior people are leaving and you don't know why"
    ],
    methodology: [
      { step: "01", title: "Map the team system", description: "Org assessment, talent inventory, decision-flow mapping, culture diagnostic.", duration: "Week 1-3" },
      { step: "02", title: "Design the operating model", description: "Roles, rituals, decision rights, performance system, and leadership development plan.", duration: "Week 3-5" },
      { step: "03", title: "Install and coach", description: "Roll out the operating model with leadership coaching for the people who'll run it.", duration: "Quarter 1-2" },
      { step: "04", title: "Measure and refine", description: "Quarterly review on productivity, engagement, and pipeline. Adjust what's not working.", duration: "Quarter 2+" }
    ],
    metrics: [
      { value: "25%+", label: "Productivity lift" },
      { value: "5-50+", label: "Teams scaled" },
      { value: "Faster", label: "Onboarding time" },
      { value: "Stronger", label: "Leadership pipeline" }
    ],
    bestAs: "Retainer",
    typicalDuration: "6-month retainer with monthly leadership coaching after",
    faqs: [
      { q: "Do you coach the founder or the leadership team?", a: "Usually both. Founder coaching is 1:1 and confidential; leadership team work is structured around the operating model. The two reinforce each other." },
      { q: "What if my team is fully remote / distributed?", a: "Most engagements are distributed by default. The operating model adapts (more async, more written, more deliberate rituals) but the underlying logic is the same." },
      { q: "Do you handle hiring or just retention?", a: "Both. Hiring decisions get easier once the operating model is clear, because you know exactly what role and what archetype to hire for." },
      { q: "Is this just executive coaching with extra steps?", a: "No. Executive coaching focuses on the individual. This engagement focuses on the team-as-a-system. Coaching is one of the tools, but the deliverable is a working operating model, not a coaching relationship." }
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
      description: "Observe, Blend, Innovate. Versatility in action."
    },
    quickWin: "Cross-pollinate tactics from one sector to another",
    edgyInsight: "Versatility crushes silos. Evolve unbound.",
    artifacts: [
      { title: "Industry Adaptation Framework", description: "Systematic approach to applying best practices across sectors" },
      { title: "Cross-Pollination Playbook", description: "Guide for identifying and adapting successful strategies between industries" },
      { title: "Cultural Navigation Toolkit", description: "Resources for understanding and adapting to different organizational cultures" }
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
    ],
    headlineMetric: { value: "8", label: "Industries served" },
    painSignals: [
      "Entering a new sector and the playbook from the last one isn't translating",
      "Acquired a company in a different industry and integration is stalling",
      "Trying to import enterprise rigour into a startup or startup speed into an enterprise",
      "Your competitive edge in one market is invisible in the next one"
    ],
    methodology: [
      { step: "01", title: "Decode the new domain", description: "Industry landscape, competitive dynamics, customer behaviour, regulatory texture.", duration: "Week 1-3" },
      { step: "02", title: "Identify the transferable", description: "Map which of your existing playbooks travel and which need re-architecture for the new context.", duration: "Week 3-5" },
      { step: "03", title: "Blend and test", description: "Adapted strategy implemented in a pilot, with industry-specific customisation.", duration: "Week 5-10" },
      { step: "04", title: "Scale with judgement", description: "Roll out across the new domain with continuous adjustment. Avoid wholesale copy-paste.", duration: "Quarter 2+" }
    ],
    metrics: [
      { value: "8", label: "Industries served" },
      { value: "Startup to Fortune 500", label: "Org range" },
      { value: "APAC, EMEA, US", label: "Geos" },
      { value: "Translatable", label: "Methodology" }
    ],
    bestAs: "Advisory",
    typicalDuration: "Monthly advisory; sprint for specific cross-over moves",
    faqs: [
      { q: "Which industries have you worked across?", a: "Manufacturing, B2B SaaS, e-commerce, financial services, healthcare, logistics, retail, and education. Deep in SaaS and manufacturing-aligned services; meaningful in the rest." },
      { q: "Is this really a capability or just experience?", a: "Experience without a framework is just anecdote. The capability is the explicit method for deciding what travels between domains and what doesn't, so you don't re-import what won't work." },
      { q: "Best for startups going enterprise, or enterprises going nimble?", a: "Both, and they're closer to the same problem than they look. Both require shedding context-specific habits and rebuilding around the new domain's actual constraints." },
      { q: "How is this different from generic strategy consulting?", a: "Strategy consulting tells you where to go. This focuses on how to operate once you're there, in a domain whose rhythms are unfamiliar." }
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
      description: "Ideate, Prototype, Deploy. Innovation acceleration."
    },
    quickWin: "Automate one repetitive task for 30% time save",
    edgyInsight: "AI is your nova. Harness it early.",
    artifacts: [
      { title: "AI SOW Generator", description: "Automated statement of work creation with AI-driven templates" },
      { title: "AI Implementation Roadmap", description: "Strategic plan for AI adoption and integration across business functions" },
      { title: "AI Governance Framework", description: "Policies and procedures for ethical AI implementation and management" }
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
    ],
    headlineMetric: { value: "30-70%", label: "Manual time eliminated" },
    painSignals: [
      "AI is on every slide deck but nothing has actually shipped",
      "You've tried OpenAI/Claude pilots that didn't make it past the demo",
      "Teams are using ChatGPT individually with no governance or shared playbook",
      "You can't tell which workflows are AI-ready and which are noise"
    ],
    methodology: [
      { step: "01", title: "Find the real opportunities", description: "Audit workflows for AI-readiness; rank by ROI, time-to-value, and governance risk.", duration: "Week 1-3" },
      { step: "02", title: "Prototype the highest-ROI use case", description: "Build a working PoC, not a slide. Test against real users and real data.", duration: "Week 3-6" },
      { step: "03", title: "Deploy with governance", description: "Production rollout with monitoring, evaluation, and the policy guardrails to keep it safe.", duration: "Week 6-12" },
      { step: "04", title: "Build the AI muscle", description: "Train the team on how to identify, scope, and ship AI workflows independently.", duration: "Quarter 2+" }
    ],
    metrics: [
      { value: "30-70%", label: "Manual work cut" },
      { value: "<6 weeks", label: "First production AI" },
      { value: "Governed", label: "By design, not afterthought" },
      { value: "Augmented", label: "Decision quality" }
    ],
    bestAs: "Sprint",
    typicalDuration: "6-12 week build, optional retainer for the next cohort",
    faqs: [
      { q: "Do you build the AI tools or just strategize?", a: "I build. Strategy without a shipped prototype is the failure mode for most AI engagements. The default deliverable is a working tool, not a roadmap." },
      { q: "Which models / providers do you use?", a: "Whatever fits the use case. Claude and GPT-4 class models for reasoning; embedding-based retrieval for grounding; smaller fine-tuned models where latency or cost matters. Provider-agnostic, with vendor lock-in as an explicit risk to manage." },
      { q: "How do you handle AI ethics and governance?", a: "Built into the prototype, not bolted on. Every shipped tool has explicit guardrails, evaluation criteria, and a human-in-the-loop where the stakes warrant it." },
      { q: "What if our data isn't ready?", a: "It rarely is. We start with the use case that needs the least data work, ship that, then justify the data investment with the results." }
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
      description: "Listen, Align, Deliver. Subtle but powerful engagement."
    },
    quickWin: "Pre-meeting briefs to preempt objections",
    edgyInsight: "True engagement turns adversaries to allies.",
    artifacts: [
      { title: "Stakeholder Mapping Toolkit", description: "Comprehensive framework for identifying and categorizing key stakeholders" },
      { title: "Executive Engagement Playbook", description: "Strategies and tactics for building relationships with C-level executives" },
      { title: "Influence Strategy Framework", description: "Systematic approach to building influence and driving alignment" }
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
    ],
    headlineMetric: { value: "90%+", label: "Stakeholder buy-in" },
    painSignals: [
      "Projects keep stalling at executive sign-off even when the work is sound",
      "You can't get on the CEO's calendar for the meeting that matters",
      "Internal politics is consuming more cycles than the actual work",
      "Different stakeholders give you contradictory direction and won't align"
    ],
    methodology: [
      { step: "01", title: "Map the stakeholder graph", description: "Who decides, who influences, who blocks, and what each one actually cares about.", duration: "Week 1-2" },
      { step: "02", title: "Design the engagement plan", description: "Per-stakeholder narrative, cadence, and channel. Pre-meeting briefs and alignment work.", duration: "Week 2-4" },
      { step: "03", title: "Run the loop", description: "Execute engagements with structured prep, debrief, and adjustment after each touchpoint.", duration: "Quarter 1" },
      { step: "04", title: "Hand over the muscle", description: "Train your team to run the same loop for the next quarter without me.", duration: "Quarter 2+" }
    ],
    metrics: [
      { value: "90%+", label: "Buy-in achieved" },
      { value: "Faster", label: "Approval cycles" },
      { value: "Quieter", label: "Politics overhead" },
      { value: "Aligned", label: "Cross-functional motion" }
    ],
    bestAs: "Advisory",
    typicalDuration: "Monthly advisory with intensive prep for key moments",
    faqs: [
      { q: "Is this just stakeholder management coaching?", a: "No. The deliverable is alignment, not a skill upgrade. You can keep doing what you're doing on stakeholder management; the engagement specifically moves a logjam." },
      { q: "What if the deadlock is between me and my own CEO?", a: "That's the most common case, actually. The work is reading what your CEO actually wants vs. what they're saying, and engineering the next three conversations to surface and resolve the gap." },
      { q: "Can you sit in on the actual meetings?", a: "Sometimes, in advisory capacity. More often I prep the meeting and debrief it. The goal is your authority in the room, not mine." },
      { q: "How do you measure success on something this soft?", a: "Hard outcomes: decisions actually made, projects actually approved, cycles spent on alignment vs. execution. We agree on three specific deadlocked or stalled items in week one and track resolution." }
    ]
  }
];
