import { jsPDF } from "jspdf";

/**
 * CV layout, built for ATS parsing.
 *
 * ATS RULES THIS FILE FOLLOWS — do not "improve" these without checking:
 *  - No character spacing (charSpace). Letterspaced text extracts as
 *    "G R A C I O U S" in several parsers and destroys name matching.
 *  - Plain separators only. Commas and hyphens between role/company/date;
 *    no middots, em-dashes or pipes in parsed fields.
 *  - Standard section headings ("Professional Summary", "Technical Skills",
 *    "Professional Experience", "Certifications") — parsers match on these
 *    exact strings.
 *  - Single column, no tables, no text boxes, no header/footer regions.
 *  - Dates as "Mon YYYY - Mon YYYY" on the same line as the role.
 *
 * Tuned to hold at two pages — see PAGE BUDGET on the constants below.
 */

const MARGIN = 18;
const PAGE_TOP = 18;

// PAGE BUDGET: these are what keep the CV at 2 pages. Raising BODY_SIZE or
// the *_LINE values by even 0.5 pushes the last entry onto page 3.
const BODY_SIZE = 9;
const BULLET_LINE = 4.1;
const SKILL_LINE = 4.4;
const SUMMARY_LINE = 4.3;
const TITLE_ADVANCE = 5.2;
const ENTRY_GAP = 3.2;
const SECTION_GAP = 5.5;

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGIN * 2;

  let currentY = 0;

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - MARGIN) {
      doc.addPage();
      currentY = PAGE_TOP;
    }
  };

  const sectionHeading = (label: string) => {
    checkPageBreak(14);
    currentY += SECTION_GAP;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    doc.text(label.toUpperCase(), MARGIN, currentY);
    currentY += 2.2;
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.35);
    doc.line(MARGIN, currentY, pageWidth - MARGIN, currentY);
    currentY += 4.5;
    doc.setTextColor(0, 0, 0);
  };

  /**
   * Bold lead-in followed by inline body text. The first line starts after the
   * bold part; wrapped lines return to the left edge of the block. Kept as real
   * text (not a table) so parsers read "Label: value" as one continuous string.
   *
   * Used for both the skill rows and the freelance sub-bullets.
   */
  const wrapLabelled = (label: string, value: string, x: number) => {
    const blockWidth = pageWidth - MARGIN - x;
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    const labelW = doc.getTextWidth(label);
    doc.setFont("helvetica", "normal");

    const lines: Array<{ text: string; indent: number }> = [];
    let current = "";
    let indent = labelW;
    let available = blockWidth - labelW;

    value.split(/\s+/).forEach((word) => {
      const candidate = current ? `${current} ${word}` : word;
      if (current && doc.getTextWidth(candidate) > available) {
        lines.push({ text: current, indent });
        current = word;
        indent = 0;
        available = blockWidth;
      } else {
        current = candidate;
      }
    });
    if (current) lines.push({ text: current, indent });
    return lines;
  };

  /** Height this block will occupy, without drawing it. */
  const measureLabelled = (
    label: string,
    value: string,
    x: number,
    lineHeight: number
  ) => wrapLabelled(label, value, x).length * lineHeight;

  /**
   * Draws the block at the current position. Does NOT page-break — callers that
   * need a break must do it first, otherwise a bullet marker drawn beforehand
   * gets stranded on the previous page while its text moves to the next.
   */
  const drawLabelled = (
    label: string,
    value: string,
    x: number,
    lineHeight: number
  ) => {
    const lines = wrapLabelled(label, value, x);
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(label, x, currentY);
    doc.setFont("helvetica", "normal");
    lines.forEach((line, i) => {
      doc.text(line.text, x + line.indent, currentY + i * lineHeight);
    });
    currentY += lines.length * lineHeight;
  };

  const labelledRow = (
    label: string,
    value: string,
    x = MARGIN,
    lineHeight = SKILL_LINE
  ) => {
    checkPageBreak(measureLabelled(label, value, x, lineHeight));
    drawLabelled(label, value, x, lineHeight);
  };

  // --- HEADER ---
  // Name is plain text at full size: no charSpace, so it extracts cleanly.
  currentY = 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("GRACIOUS KINGSLEY", pageWidth / 2, currentY, { align: "center" });
  currentY += 6.5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(60, 60, 60);
  doc.text("Full-Stack & Mobile Engineer", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 5.5;

  doc.setFontSize(8.8);
  doc.text(
    "Lagos, Nigeria | +234 8106261665 | kingsleygracious@gmail.com",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  currentY += 4.2;
  doc.text(
    "github.com/Gracious17 | linkedin.com/in/gracious-kingsley",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  doc.setTextColor(0, 0, 0);

  // --- PROFESSIONAL SUMMARY ---
  sectionHeading("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  const summary =
    "Full-Stack and Mobile Engineer with 4+ years building production web and mobile applications across fintech, SaaS, e-commerce and edtech. Frontend depth in React.js, Next.js and TypeScript; backend experience in Node.js, Express and REST API design over PostgreSQL, MongoDB and Redis. Ships cross-platform React Native applications to Google Play and the App Store, leads frontend teams, and delivers multi-tenant platforms with role-based access control, real-time features and payment integrations.";
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, MARGIN, currentY);
  currentY += summaryLines.length * SUMMARY_LINE;

  // --- TECHNICAL SKILLS ---
  // Ordered so the highest-frequency job-description terms appear first.
  sectionHeading("Technical Skills");
  const skillRows: Array<[string, string]> = [
    ["Languages", "JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3"],
    [
      "Frontend",
      "React.js, Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion, responsive design, component architecture",
    ],
    ["Mobile", "React Native, Expo, cross-platform iOS and Android development"],
    ["Backend and APIs", "Node.js, Express.js, REST API design, Next.js API Routes"],
    ["Databases", "PostgreSQL, MongoDB, Redis, Prisma ORM, Supabase, schema design"],
    ["State Management", "Zustand, TanStack Query (React Query), Redux"],
    ["Auth and Security", "JWT, RBAC, session management, multi-tenant isolation"],
    ["Real-time", "WebRTC, Socket.IO"],
    ["Payments", "Paystack, Flutterwave"],
    ["Testing and Tools", "Jest, Postman, Git, GitHub, Jira, Trello, Notion"],
  ];
  skillRows.forEach(([label, value]) => labelledRow(`${label}: `, value));

  // --- PROFESSIONAL EXPERIENCE ---
  sectionHeading("Professional Experience");

  /**
   * Employment-level entries, not one-per-project. Smaller engagements live as
   * sub-bullets under the freelance umbrella (see `subItems`), which is what
   * keeps this readable as a career rather than eight jobs in two years.
   */
  const experiences: Array<{
    role: string;
    company: string;
    date: string;
    points: string[];
    subItems?: Array<[string, string]>;
  }> = [
    {
      role: "Frontend Lead Engineer",
      company: "Vintran (Fintech), Remote",
      date: "Jan 2025 - Present",
      points: [
        "Lead technical implementation for a fintech mobile application built with React Native and Expo, directing a frontend team across onboarding, KYC verification and transaction workflows.",
        "Spearheaded core modules: 6-step onboarding, 8-step signup and secure passcode recovery flows.",
        "Implemented secure API integrations for transaction processing and real-time dashboard synchronization.",
        "Contributed to the wider Vintran platform of ~14 microservices communicating over gRPC/Protobuf with REST at the gateway, within a 15-person product team.",
      ],
    },
    {
      role: "Frontend Engineer",
      company: "Pamela (AI Business Operations Platform), Remote",
      date: "2026",
      points: [
        "Built a multi-tenant SaaS platform serving 10+ business domains (finance, legal, sales, marketing, operations) behind a two-layer role-based permission system spanning platform and per-company access tiers.",
        "Implemented a Nigerian tax engine (VAT, PAYE, WHT, CIT) matching FIRS statutory rules, including progressive payroll brackets and per-expense withholding overrides.",
        "Engineered a race-condition-safe embedded wallet using Postgres row locking and idempotency keys, integrated with Paystack for live transactions.",
        "Delivered the platform back-office: a cross-tenant staff workspace for registrations, compliance review and payment reconciliation, over a guarded six-state lifecycle with a customer-360 support view.",
        "Architected a three-layer data access stack (transport, typed services, React Query hooks) with in-memory JWT handling and de-duplicated 401 refresh-and-retry.",
      ],
    },
    {
      role: "Full-Stack Engineer",
      company: "StayOps ERP (Hotel Operations SaaS), Remote",
      date: "2026",
      points: [
        "Built a multi-tenant hotel operations platform spanning 50+ feature domains including front desk, POS, housekeeping and accounting/payroll under strict tenant isolation.",
        "Implemented a double-entry accounting engine enforcing debits-equal-credits in code with Decimal arithmetic, eliminating ledger drift.",
        "Engineered an immutable guest ledger with atomic materialized-balance updates in the same transaction, plus three-layer JWT revocation and tiered rate limiting.",
        "Ran a self-directed security audit that identified and fixed a cross-tenant IDOR vulnerability before release.",
      ],
    },
    {
      role: "Freelance & Contract Software Engineer",
      company: "Nigerian & international clients, Remote",
      date: "2022 - Present",
      points: [],
      subItems: [
        [
          "Horizon QA Platform: ",
          "Led frontend architecture for a scalable software QA testing platform (Next.js, TypeScript, Zustand); built multi-role dashboards for Admin, Tester and Client with distinct RBAC workflows, modular component systems and real-time state synchronization.",
        ],
        [
          "Hallos - Learning & Livestreaming Platform: ",
          "Built and scaled a responsive learning platform serving 5,000+ learners; implemented real-time live classes over WebRTC and Socket.IO; shipped gamification (quizzes, tournaments, reward points) lifting engagement 35%+.",
        ],
        [
          "LatterWorld School Management Platform: ",
          "Independently developed the frontend with role-based dashboards for admins, teachers, students and parents, covering scheduling, examinations, attendance and academic results over REST APIs.",
        ],
        [
          "MORESTORE - Multi-Vendor E-Commerce: ",
          "Architected a multi-vendor marketplace (Next.js, Zustand) with an advanced product catalog and complex search filtering, secure cart and checkout over transaction APIs, and a scalable PostgreSQL schema.",
        ],
        [
          "Mobile applications: ",
          "Contributed to 14 published React Native applications on Google Play and the App Store across consumer AI, agritech, marketplace and enterprise domains, including the Emerj LLC product suite, Farmex, iKook and PTML Management.",
        ],
      ],
    },
  ];

  experiences.forEach((exp) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    const wrapped = exp.points.map((point) =>
      doc.splitTextToSize(`-  ${point}`, contentWidth - 5)
    );
    const bulletHeight = wrapped.reduce(
      (sum: number, lines: string[]) => sum + lines.length * BULLET_LINE,
      0
    );

    // Keep the entry header with its first bullet or sub-bullet, so a heading
    // never renders alone at the foot of a page.
    const firstSubHeight = exp.subItems?.length
      ? measureLabelled(
          exp.subItems[0][0],
          exp.subItems[0][1],
          MARGIN + 7,
          BULLET_LINE
        )
      : 0;
    checkPageBreak(TITLE_ADVANCE + bulletHeight + firstSubHeight + ENTRY_GAP);

    // "Role, Company" then the date right-aligned, all on one baseline.
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.8);
    doc.text(exp.role, MARGIN, currentY);
    const roleWidth = doc.getTextWidth(exp.role);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(55, 55, 55);
    doc.text(`, ${exp.company}`, MARGIN + roleWidth, currentY);

    doc.setFontSize(8.8);
    doc.setTextColor(90, 90, 90);
    doc.text(exp.date, pageWidth - MARGIN, currentY, { align: "right" });
    doc.setTextColor(0, 0, 0);
    currentY += TITLE_ADVANCE;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    wrapped.forEach((lines: string[]) => {
      doc.text(lines, MARGIN + 3, currentY);
      currentY += lines.length * BULLET_LINE;
    });

    // Freelance umbrella: each client is a bolded lead-in with its own body.
    // Break before drawing the marker so marker and text stay together.
    exp.subItems?.forEach(([name, detail]) => {
      checkPageBreak(measureLabelled(name, detail, MARGIN + 7, BULLET_LINE));
      doc.setFontSize(BODY_SIZE);
      doc.setFont("helvetica", "normal");
      doc.text("-", MARGIN + 3, currentY);
      drawLabelled(name, detail, MARGIN + 7, BULLET_LINE);
      currentY += 1.2;
    });

    currentY += ENTRY_GAP;
  });

  // --- CERTIFICATIONS ---
  sectionHeading("Certifications");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  const certifications = [
    "Frontend Development, CodeTech IT Solutions (2024)",
    "CS50x: Introduction to Computer Science, Harvard University via edX (2024)",
  ];
  certifications.forEach((cert) => {
    checkPageBreak(BULLET_LINE);
    doc.text(`-  ${cert}`, MARGIN + 3, currentY);
    currentY += BULLET_LINE;
  });

  return doc;
};
