const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const DEMO_PROJECTS = [
  {
    id: "demo-1",
    title: "E-commerce Platform Redesign",
    description: "Migrating legacy storefront to a modern headless architecture with Next.js and Shopify API.",
    status: "active",
    progress: 78,
    project_members: [{}, {}, {}, {}, {}],
    created_at: daysAgo(45),
    ai_intelligence: { execution_score: 96, project_health: "healthy" }
  },
  {
    id: "demo-2",
    title: "Mobile App MVP (v1.0)",
    description: "Developing cross-platform React Native application for real-time logistics tracking.",
    status: "at_risk",
    progress: 34,
    project_members: [{}, {}, {}],
    created_at: daysAgo(20),
    ai_intelligence: { execution_score: 42, project_health: "critical" }
  },
  {
    id: "demo-3",
    title: "AI Automation Workflow",
    description: "Setting up automated lead enrichment and CRM synchronization using LLM agents.",
    status: "delayed",
    progress: 92,
    project_members: [{}, {}],
    created_at: daysAgo(60),
    ai_intelligence: { execution_score: 64, project_health: "degrading" }
  },
  {
    id: "demo-4",
    title: "Q3 Marketing Campaign",
    description: "Executing multi-channel acquisition strategy including SEO overhaul and PPC optimization.",
    status: "active",
    progress: 55,
    project_members: [{}, {}, {}, {}, {}, {}],
    created_at: daysAgo(12),
    ai_intelligence: { execution_score: 88, project_health: "healthy" }
  },
  {
    id: "demo-5",
    title: "Internal CRM Dashboard",
    description: "Building a custom management portal for tracking client relationships and sales pipeline.",
    status: "active",
    progress: 15,
    project_members: [{}, {}, {}],
    created_at: daysAgo(5),
    ai_intelligence: { execution_score: 92, project_health: "healthy" }
  },
  {
    id: "demo-6",
    title: "Legacy System Migration",
    description: "Database normalization and API refactoring for the 2018 core monolith service.",
    status: "at_risk",
    progress: 62,
    project_members: [{}, {}, {}, {}],
    created_at: daysAgo(90),
    ai_intelligence: { execution_score: 58, project_health: "stable" }
  },
];

export const DEMO_ACTIVITIES = [
  {
    id: "act-1",
    activity_type: "UPDATE_SUBMITTED",
    created_at: hoursAgo(1),
    users: { full_name: "Sarah Chen" },
    projects: { title: "E-commerce Platform Redesign" }
  },
  {
    id: "act-2",
    activity_type: "MEMBER_ADDED",
    created_at: hoursAgo(4),
    users: { full_name: "Marcus Aurelius" },
    projects: { title: "Internal CRM Dashboard" }
  },
  {
    id: "act-3",
    activity_type: "STATUS_CHANGED",
    created_at: hoursAgo(8),
    users: { full_name: "System" },
    projects: { title: "Legacy System Migration" }
  },
  {
    id: "act-4",
    activity_type: "UPDATE_SUBMITTED",
    created_at: hoursAgo(12),
    users: { full_name: "David Zhang" },
    projects: { title: "Mobile App MVP (v1.0)" }
  },
  {
    id: "act-5",
    activity_type: "PROJECT_CREATED",
    created_at: daysAgo(1),
    users: { full_name: "Elena Rodriguez" },
    projects: { title: "Internal CRM Dashboard" }
  },
  {
    id: "act-6",
    activity_type: "UPDATE_SUBMITTED",
    created_at: daysAgo(1.2),
    users: { full_name: "Jordan Smith" },
    projects: { title: "AI Automation Workflow" }
  },
  {
    id: "act-7",
    activity_type: "MEMBER_ADDED",
    created_at: daysAgo(1.5),
    users: { full_name: "Sarah Chen" },
    projects: { title: "E-commerce Platform Redesign" }
  },
  {
    id: "act-8",
    activity_type: "UPDATE_SUBMITTED",
    created_at: daysAgo(2),
    users: { full_name: "Michael Scott" },
    projects: { title: "Q3 Marketing Campaign" }
  },
  {
    id: "act-9",
    activity_type: "UPDATE_SUBMITTED",
    created_at: daysAgo(2.1),
    users: { full_name: "Sarah Chen" },
    projects: { title: "E-commerce Platform Redesign" }
  },
  {
    id: "act-10",
    activity_type: "STATUS_CHANGED",
    created_at: daysAgo(2.5),
    users: { full_name: "System" },
    projects: { title: "Mobile App MVP (v1.0)" }
  },
];

export const DEMO_REPORTS = [
  {
    id: "rep-1",
    summary: "Sprint velocity is optimal. Headless storefront migration is 12% ahead of original schedule.",
    risk_level: "low",
    ai_confidence: 0.98,
    projects: { title: "E-commerce Platform Redesign" },
    metadata: {
      execution_score: 96,
      reliability_score: 99,
      delay_probability: 0.02,
      project_health: "healthy",
      completed_work: ["Headless storefront architecture baseline", "Shopify API integration verified", "CI/CD pipeline established"],
      pending_work: ["Cart logic implementation", "Product page styling"],
      behavioral_patterns: ["consistent daily updates", "high-detail reporting"],
      recommendations: ["Approve additional scope for SEO", "Schedule client demo early"]
    }
  },
  {
    id: "rep-2",
    summary: "API integration blockers detected. Logistics tracking service hasn't received a code signal in 96 hours.",
    risk_level: "high",
    ai_confidence: 0.91,
    projects: { title: "Mobile App MVP (v1.0)" },
    metadata: {
      execution_score: 42,
      reliability_score: 35,
      delay_probability: 0.65,
      project_health: "critical",
      completed_work: ["Basic project scaffolding", "Initial UI wireframes"],
      pending_work: ["Real-time GPS tracking module (BLOCKER)", "Push notification service"],
      behavioral_patterns: ["vague reporting", "prolonged inactivity", "missed delivery signals"],
      recommendations: ["Direct developer intervention", "Review third-party API documentation"]
    }
  },
  {
    id: "rep-3",
    summary: "Communication frequency is decreasing. Milestone 'Lead Enrichment' is now 4 days overdue.",
    risk_level: "medium",
    ai_confidence: 0.85,
    projects: { title: "AI Automation Workflow" },
    metadata: {
      execution_score: 64,
      reliability_score: 52,
      delay_probability: 0.40,
      project_health: "degrading",
      behavioral_patterns: ["declining update volume", "low-detail technical descriptions"],
      recommendations: ["Request detailed blocker list", "Sync with automation lead"]
    }
  },
  {
    id: "rep-4",
    summary: "Content production is on track. PPC optimization shows vigorous activity levels.",
    risk_level: "low",
    ai_confidence: 0.94,
    projects: { title: "Q3 Marketing Campaign" },
    metadata: {
      execution_score: 88,
      reliability_score: 92,
      delay_probability: 0.08,
      project_health: "healthy",
      behavioral_patterns: ["frequent small commits", "high team collaboration signals"],
      recommendations: ["Scale high-performing ad sets", "Prepare interim progress report"]
    }
  },
];
