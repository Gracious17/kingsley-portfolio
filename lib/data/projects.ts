/**
 * Project data for the portfolio.
 *
 * Descriptions support inline accent tokens: {{highlighted phrase|accent}}
 * where accent is one of: violet | sky | amber | emerald.
 * They are rendered by <HighlightedText /> in app/components/ui/highlighted-text.tsx.
 */

export type Accent = "violet" | "sky" | "amber" | "emerald";

export interface Metric {
  value: string;
  label: string;
}

export interface PlatformProject {
  id: string;
  title: string;
  /** Comma-separated stack line shown under the title. */
  stack: string;
  /** Keep to ~25 words so every card stays the same height; clamped at 4 lines on render. */
  description: string;
  /** First 4 are rendered. */
  tags: string[];
  /** Exactly three — the tuple keeps every card's footer identical. */
  metrics: [Metric, Metric, Metric];
  demoUrl?: string;
  codeUrl?: string;
}

export interface MobileApp {
  id: string;
  name: string;
  /** Owning org / product family, shown as the mono pill. */
  group: string;
  description: string;
  platforms: Array<"android" | "ios">;
  /** Live on a public app store. Drives the "N Published Apps" count. */
  published: boolean;
  /** Renders an amber "In Progress" badge on the card. */
  status?: "in-progress";
  playUrl?: string;
  appStoreUrl?: string;
  codeUrl?: string;
}

export const platformProjects: PlatformProject[] = [
  {
    id: "vintran",
    title: "Vintran — Fintech Payments & Inventory",
    stack: "C#/.NET · gRPC · Redis",
    description:
      "{{~14 microservices|violet}} over {{gRPC/Protobuf|violet}} with {{REST|sky}} at the gateway. Built {{idempotent payment sessions|amber}}, {{tenant/admin JWT separation|sky}} and {{double-entry ledger flows|sky}}; led pre-QA hardening.",
    tags: ["C#/.NET", "gRPC", "Redis", "Microservices"],
    metrics: [
      { value: "14", label: "Microservices" },
      { value: "15", label: "Person team" },
      { value: "gRPC", label: "Protobuf gateway" },
    ],
  },
  {
    id: "stayops",
    title: "StayOps ERP — Hotel Operations SaaS",
    stack: "Node.js · TypeScript · Prisma · PostgreSQL",
    description:
      "{{50+ feature domains|violet}} under {{strict tenant isolation|violet}}. Double-entry engine enforcing {{debits-equal-credits in code|sky}} with an {{immutable guest ledger|sky}}. Self-run audit {{fixed a cross-tenant IDOR|amber}} pre-release.",
    tags: ["Node.js", "Prisma", "PostgreSQL", "Multi-Tenant"],
    metrics: [
      { value: "50+", label: "Feature domains" },
      { value: "0", label: "Ledger drift" },
      { value: "IDOR", label: "Fixed pre-release" },
    ],
    demoUrl: "https://stayop-erp.vercel.app",
  },
  {
    id: "yourateme",
    title: "YouRateMe — Ratings & Discovery",
    stack: "NestJS · MongoDB · Redis · BullMQ",
    description:
      "One API serving web, mobile and admin clients. Trust-weighted scores recomputed in a {{single $facet aggregation|sky}}; {{BullMQ job-ID coalescing|sky}} collapses rating bursts into one pass.",
    tags: ["NestJS", "MongoDB", "BullMQ", "Socket.IO"],
    metrics: [
      { value: "221", label: "Endpoints" },
      { value: "41", label: "Modules" },
      { value: "25+", label: "Built indexes" },
    ],
  },
  {
    id: "healthcare-workforce",
    title: "Healthcare Workforce Platform (UK/NHS)",
    stack: "Node.js · TypeScript · MongoDB",
    description:
      "Staffing across NHS trusts. {{Single-use trust-selection token|sky}} ahead of the tenant JWT, {{per-membership RBAC|violet}}, {{blockchain-anchored audit trail|emerald}}, and {{all money in integer pence|amber}}.",
    tags: ["Node.js", "MongoDB", "RBAC", "Compliance"],
    metrics: [
      { value: "7", label: "RBAC roles" },
      { value: "28-day", label: "Shift horizon" },
      { value: "~14", label: "Analytics pipelines" },
    ],
  },
  {
    id: "pamela-platform",
    title: "Pamela — Business Operations Platform",
    stack: "Next.js · TypeScript · Supabase · Paystack",
    description:
      "{{AI-augmented multi-tenant SaaS|violet}} running finance, legal, sales and operations for African SMEs. {{From-scratch FIRS tax engine|sky}} (VAT/PAYE/WHT/CIT) and a {{race-safe embedded wallet|amber}} — the AI never auto-executes.",
    tags: ["Next.js", "TypeScript", "Supabase", "Paystack"],
    metrics: [
      { value: "10+", label: "Business domains" },
      { value: "4", label: "FIRS tax regimes" },
      { value: "3", label: "Countries supported" },
    ],
    demoUrl: "https://www.askpamela.ai",
  },
  {
    id: "pamela-backoffice",
    title: "Pamela — Platform Back-Office",
    stack: "Next.js · TypeScript · TanStack Query · Supabase",
    description:
      "{{Multi-tenant back-office|violet}} where staff work registrations, review compliance and reconcile payments across every tenant. {{Guarded state machines|sky}} explain why a transition is blocked; {{every action audited|amber}}.",
    tags: ["Next.js", "TypeScript", "TanStack Query", "Multi-Tenant"],
    metrics: [
      { value: "8", label: "Admin screens" },
      { value: "18", label: "Staff endpoints" },
      { value: "2", label: "State machines" },
    ],
  },
  {
    id: "hallos",
    title: "Hallos — Learning & Livestreaming Platform",
    stack: "Next.js · Zustand · WebRTC · Socket.io",
    description:
      "Responsive learning platform serving {{5,000+ learners|violet}}. {{Real-time live classes|sky}} over {{WebRTC and Socket.io|sky}}, plus gamification — quizzes, tournaments, reward points — lifting engagement {{35%+|amber}}.",
    tags: ["Next.js", "Zustand", "WebRTC", "Socket.io"],
    metrics: [
      { value: "5,000+", label: "Learners served" },
      { value: "35%+", label: "Engagement lift" },
      { value: "WebRTC", label: "Live classes" },
    ],
    demoUrl: "https://www.hallos.net",
  },
  {
    id: "horizon-qa",
    title: "Horizon — Software QA Testing Platform",
    stack: "Next.js · TypeScript · Zustand · Framer Motion",
    description:
      "Led frontend architecture for a scalable {{QA testing platform|violet}} — {{multi-role dashboards|sky}} for admin, tester and client, each with distinct RBAC workflows and real-time state sync.",
    tags: ["Next.js", "TypeScript", "Zustand", "RBAC"],
    metrics: [
      { value: "3", label: "Role dashboards" },
      { value: "RBAC", label: "Access control" },
      { value: "Zustand", label: "State architecture" },
    ],
    demoUrl: "https://test-horizon-frontend-service.vercel.app",
  },
  {
    id: "latterworld",
    title: "LatterWorld — School Management Platform",
    stack: "Next.js · TypeScript · Zustand · REST",
    description:
      "Independently built a {{school management frontend|violet}} with {{role-based dashboards|sky}} for admins, teachers, students and parents — scheduling, examinations, attendance and academic results.",
    tags: ["Next.js", "TypeScript", "Zustand", "RBAC"],
    metrics: [
      { value: "4", label: "Dashboard roles" },
      { value: "RBAC", label: "Role workflows" },
      { value: "REST", label: "API integration" },
    ],
  },
  {
    id: "morestore",
    title: "MORESTORE — Multi-Vendor E-Commerce",
    stack: "Next.js · Zustand · PostgreSQL",
    description:
      "{{Multi-vendor marketplace|violet}} with an advanced product catalog and {{complex search filtering|sky}}, {{secure cart and checkout|amber}} on transaction APIs, over a scalable PostgreSQL schema.",
    tags: ["Next.js", "Zustand", "PostgreSQL", "E-commerce"],
    metrics: [
      { value: "Multi", label: "Vendor marketplace" },
      { value: "Checkout", label: "Secure flow" },
      { value: "Postgres", label: "Schema design" },
    ],
  },
  {
    id: "areafada",
    title: "AreaFada OS — Creator-Economy SaaS",
    stack: "PostgreSQL · Render · Vercel",
    description:
      "{{AI-scaffolded prototype|violet}} taken to production for a Nigerian entertainment icon — infra migrated to {{Render/Vercel|amber}} with tuned pooling, plus a {{schema-integrity migration|sky}} adding foreign keys and indexes.",
    tags: ["PostgreSQL", "Render", "Vercel", "Migrations"],
    metrics: [
      { value: "AI→Prod", label: "Prototype hardened" },
      { value: "Render", label: "Infra migration" },
      { value: "FKs", label: "Schema integrity" },
    ],
  },
  {
    id: "findpeace",
    title: "FindPeace — Hospitality Management",
    stack: "Next.js 15 · TypeScript · NextAuth · Zustand",
    description:
      "{{Hotel booking platform|violet}} with preference filters, {{live availability|sky}} and {{secure Paystack checkout|amber}} with instant confirmation. NextAuth sessions, Zustand state, Google Maps search.",
    tags: ["Next.js", "TypeScript", "NextAuth", "Paystack"],
    metrics: [
      { value: "Paystack", label: "Secure checkout" },
      { value: "NextAuth", label: "Session auth" },
      { value: "Maps", label: "Location search" },
    ],
  },
  {
    id: "apple-landing",
    title: "Apple Landing Page",
    stack: "Vite · React · GSAP · Three.js",
    description:
      "Product-marketing page inspired by Apple Intelligence — {{3D interactive product views|violet}} in {{Three.js|sky}} with scroll-driven {{GSAP timelines|sky}} and a responsive layout.",
    tags: ["Vite", "Three.js", "GSAP", "Tailwind"],
    metrics: [
      { value: "3D", label: "Three.js views" },
      { value: "GSAP", label: "Scroll timelines" },
      { value: "Live", label: "Deployed demo" },
    ],
    demoUrl: "https://landing-page-kappa-two-81.vercel.app/",
  },
];

export const mobileApps: MobileApp[] = [
  {
    id: "vintran-mobile",
    name: "Vintran",
    group: "Fintech",
    description:
      "Fintech app led as {{Frontend Lead|violet}} — {{6-step onboarding|sky}}, 8-step signup, secure passcode recovery and transaction workflows.",
    platforms: ["android", "ios"],
    published: false,
    status: "in-progress",
  },
  {
    id: "safiox",
    name: "Safiox",
    group: "Emergency",
    description:
      "{{Real-time|violet}} SOS app linking people in danger to nearby responders, official services and personal contacts. {{Live GPS alerts|amber}} over Socket.IO.",
    platforms: ["android", "ios"],
    published: false,
  },
  {
    id: "delve",
    name: "Delve",
    group: "Emerj LLC",
    description:
      "{{AI language learning|violet}} via voice-driven quests with 3D characters; paid subscriptions.",
    platforms: ["ios"],
    published: true,
    appStoreUrl: "https://apps.apple.com/us/app/delve-ai-language-learning/id6745605474",
  },
  {
    id: "deen-ai",
    name: "Deen AI",
    group: "Emerj LLC",
    description: "Adhan, {{AI chat|violet}}, and Qur'an companion app.",
    platforms: ["android", "ios"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.deenai",
    appStoreUrl: "https://apps.apple.com/us/app/deen-ai-adhan-ai-chat-quran/id6756240670",
  },
  {
    id: "nora",
    name: "Nora",
    group: "Emerj LLC",
    description: "Motherhood AI companion app.",
    platforms: ["android", "ios"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.noramum",
    appStoreUrl: "https://apps.apple.com/us/app/nora-personal-mum-ai/id6756250549",
  },
  {
    id: "sitelytics",
    name: "Sitelytics",
    group: "Emerj LLC",
    description: "Part of the Emerj LLC consumer AI product suite.",
    platforms: ["android", "ios"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.sitelytics",
    appStoreUrl: "https://apps.apple.com/us/app/sitelytics/id6756032765",
  },
  {
    id: "contentq",
    name: "ContentQ",
    group: "Emerj LLC",
    description: "Part of the Emerj LLC consumer AI product suite.",
    platforms: ["android", "ios"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.contentq",
    appStoreUrl: "https://apps.apple.com/us/app/contentq/id6756614911",
  },
  {
    id: "storytime",
    name: "StoryTime",
    group: "Emerj LLC",
    description: "Part of the Emerj LLC consumer AI product suite.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.storytime",
  },
  {
    id: "manifesti",
    name: "Manifesti",
    group: "Emerj LLC",
    description: "Part of the Emerj LLC consumer AI product suite.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.manifesti",
  },
  {
    id: "rea",
    name: "REA",
    group: "Emerj LLC",
    description: "Part of the Emerj LLC consumer AI product suite.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=net.emerj.rea",
  },
  {
    id: "farmex-vendor",
    name: "Farmex — Vendor",
    group: "Farmex",
    description: "Two-sided {{agritech marketplace|violet}} app for vendors.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=com.farmex.vendor",
  },
  {
    id: "farmex-agent",
    name: "Farmex — Agent",
    group: "Farmex",
    description: "Two-sided {{agritech marketplace|violet}} app for field agents.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=com.afrifarmex.agent",
  },
  {
    id: "ikook",
    name: "iKook",
    group: "Marketplace",
    description: "Chef-booking marketplace app.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=com.ikook.ikook",
  },
  {
    id: "ptml",
    name: "PTML Management",
    group: "Enterprise",
    description:
      "Internal operations app for PTML, one of Lagos's major port terminals — monitoring, task assignment and management workflows. {{In production since 2020|sky}}.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=ptml.management",
  },
  {
    id: "keyguarde",
    name: "Keyguarde",
    group: "Utilities",
    description: "Android utility app.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=dev.logickoder.keyguarde",
  },
  {
    id: "fuelcheck",
    name: "FuelCheck",
    group: "Utilities",
    description: "Android utility app.",
    platforms: ["android"],
    published: true,
    playUrl: "https://play.google.com/store/apps/details?id=dev.logickoder.fuelcheck",
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    group: "Personal",
    description:
      "{{Expense tracking|violet}} with categorized spending and reports; Node/Express API on {{NeonDB and Redis|sky}}.",
    platforms: ["android", "ios"],
    published: false,
    codeUrl: "https://github.com/Gracious17/rn-wallet.git",
  },
];

export const publishedAppCount = mobileApps.filter((app) => app.published).length;
