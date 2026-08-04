import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // --- HEADER ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("GRACIOUS KINGSLEY", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Lagos, Nigeria | +234 8106261665 | kingsleygracious@gmail.com", pageWidth / 2, 28, { align: "center" });
  doc.text("Portfolio | GitHub | LinkedIn", pageWidth / 2, 34, { align: "center" });
  
  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 38, pageWidth - 20, 38);

  let currentY = 48;

  // --- PROFESSIONAL SUMMARY ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PROFESSIONAL SUMMARY", 20, currentY);
  currentY += 8;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const summary = "Frontend Engineer with 4+ years of experience building scalable, data-driven web applications using React.js, Next.js, and TypeScript. Specialized in developing responsive, high-performance user interfaces including dashboards, complex forms, real-time systems, and modern web platforms.";
  const splitSummary = doc.splitTextToSize(summary, pageWidth - 40);
  doc.text(splitSummary, 20, currentY);
  currentY += splitSummary.length * 5 + 5;

  // --- SKILLS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SKILLS", 20, currentY);
  currentY += 8;

  const skills = [
    ["Frontend", "React.js, Next.js, React Native, Expo, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS"],
    ["Backend & APIs", "Node.js, Express.js, REST API Development, Next.js API Routes"],
    ["State Management", "Zustand, React Query, Redux"],
    ["Tools & Others", "PostgreSQL, Prisma ORM, Git, GitHub, Jest, Jira, Trello, Notion"]
  ];

  (doc as any).autoTable({
    startY: currentY,
    head: [],
    body: skills,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 1 },
    columnStyles: { 0: { fontStyle: 'bold', width: 40 } },
    margin: { left: 20 }
  });

  currentY = (doc as any).lastAutoTable.finalY + 10;

  // --- EXPERIENCE ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PROFESSIONAL EXPERIENCE", 20, currentY);
  currentY += 8;

  const experiences = [
    {
      title: "StayOps ERP (Hotel Operations SaaS) | Full-Stack Engineer",
      date: "2025 - 2026",
      points: [
        "Built a multi-tenant hotel operations platform spanning 50+ feature domains including front desk, POS, housekeeping, and accounting/payroll under strict tenant isolation.",
        "Implemented a double-entry accounting engine enforcing debits-equal-credits in code with Decimal arithmetic, eliminating ledger drift.",
        "Engineered an immutable guest ledger with atomic materialized-balance updates in the same transaction, plus three-layer JWT revocation and tiered rate limiting.",
        "Ran a self-directed security audit that identified and fixed a cross-tenant IDOR vulnerability before release."
      ]
    },
    {
      title: "Pamela Business Operations Platform | Frontend Engineer",
      date: "2025 - 2026",
      points: [
        "Built a multi-tenant SaaS platform serving 10+ business domains (finance, legal, sales, marketing, operations) behind a unified role-based permission system.",
        "Implemented a Nigerian tax engine (VAT, PAYE, WHT, CIT) matching FIRS statutory rules, including progressive payroll brackets and per-expense withholding overrides.",
        "Engineered a race-condition-safe embedded wallet using Postgres row locking and idempotency keys, integrated with Paystack for live transactions.",
        "Designed a rule-based and LLM-hybrid decision layer that surfaces financial risks with AI reasoning, enforcing human-approval-only execution as a safety boundary."
      ]
    },
    {
      title: "Pamela Platform Back-Office | Frontend Engineer",
      date: "2025 - 2026",
      points: [
        "Built the internal back-office giving staff a single cross-tenant workspace to process business registrations, review compliance submissions, and reconcile payments.",
        "Modelled a guarded six-state registration lifecycle with server-mirrored rules (payment gating, certificate-gated completion, mandatory rejection reasons) surfaced as self-explaining UI affordances.",
        "Architected a three-layer data access stack (transport, typed services, React Query hooks) with in-memory JWT handling and de-duplicated 401 refresh-and-retry.",
        "Delivered a customer-360 support surface aggregating company, wallet, derived financials, registrations, and payments into a single screen."
      ]
    },
    {
      title: "Vintran Mobile App | Frontend Lead Engineer",
      date: "Jan 2025 – 2026",
      points: [
        "Leading technical implementation for a fintech mobile application using React Native and Expo.",
        "Directing a frontend team in delivering onboarding, KYC verification, and financial transaction workflows.",
        "Spearheaded core modules: 6-step onboarding, 8-step signup, and secure passcode recovery flows.",
        "Architected reusable component-driven architecture improving development scalability and efficiency.",
        "Implemented secure API integrations for transaction processing and real-time dashboard synchronization."
      ]
    },
    {
      title: "LatterWorld School Management Platform | Frontend Engineer",
      date: "Jan 2025 ",
      points: [
        "Independently developed a comprehensive School Management System frontend using Next.js and TypeScript.",
        "Architected role-based dashboards for admins, teachers, students, and parents with RBAC workflows.",
        "Built high-performance interfaces for scheduling, examinations, attendance, and academic results.",
        "Engineered reusable modular component architecture to ensure consistency and rapid feature delivery.",
        "Integrated RESTful APIs for academic management, communication systems, and real-time reporting."
      ]
    },
    {
      title: "Horizon QA Platform | Frontend Lead Engineer",
      date: "Jan 2025 – 2026",
      points: [
        "Spearheaded frontend architecture for a scalable Software QA Testing Platform using Next.js, TypeScript, and Zustand.",
        "Led the development of complex multi-role dashboards (Admin, Tester, Client) with distinct workflows and RBAC.",
        "Architected scalable, modular component systems improving maintainability and development efficiency.",
        "Implemented advanced state management for real-time UI updates and dashboard synchronization.",
        "Optimized performance and interactive animations using Framer Motion and modern Next.js best practices."
      ]
    },
    {
      title: "Hallos Platform | Frontend Developer",
      date: "Oct 2025 –  2026",
      points: [
        "Built and scaled a responsive learning platform using Next.js and Zustand, serving 5,000+ learners.",
        "Implemented real-time live class functionality using WebRTC and Socket.io.",
        "Improved user engagement by 35%+ through interactive learning features.",
        "Built gamification systems including quizzes, tournaments, and reward points."
      ]
    },
    {
      title: "MORESTORE | Frontend Developer",
      date: "August 2024",
      points: [
        "Architected a multi-vendor e-commerce platform using Next.js and Zustand.",
        "Engineered advanced product catalog and search systems with complex filtering.",
        "Developed secure cart and checkout workflows with transaction APIs.",
        "Designed scalable PostgreSQL database architecture."
      ]
    }
  ];

  const checkPageBreak = (neededHeight: number) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
      return true;
    }
    return false;
  };

  // Layout constants. Tuned so the CV holds at two pages.
  const BODY_SIZE = 9.5;
  const BULLET_LINE = 4.4;
  const TITLE_ADVANCE = 5.5;
  const ENTRY_GAP = 3.5;

  experiences.forEach(exp => {
    // Wrap first, at the exact size the bullets render at, so the page-break
    // estimate matches real height instead of guessing a flat 7mm per point.
    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    const wrapped = exp.points.map(point =>
      doc.splitTextToSize("• " + point, pageWidth - 45)
    );
    const bulletHeight = wrapped.reduce(
      (sum: number, lines: string[]) => sum + lines.length * BULLET_LINE,
      0
    );

    checkPageBreak(TITLE_ADVANCE + bulletHeight + ENTRY_GAP);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(exp.title, 20, currentY);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(BODY_SIZE);
    doc.text(exp.date, pageWidth - 20, currentY, { align: "right" });
    currentY += TITLE_ADVANCE;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    wrapped.forEach((lines: string[]) => {
      doc.text(lines, 25, currentY);
      currentY += lines.length * BULLET_LINE;
    });
    currentY += ENTRY_GAP;
  });

  // --- CERTIFICATIONS ---
  checkPageBreak(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CERTIFICATIONS", 20, currentY);
  currentY += 8;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("• Frontend Development — CodeTech IT Solutions (2024)", 20, currentY);
  currentY += 5;
  doc.text("• Introduction to Computer Science — Harvard University, edX (2024)", 20, currentY);

  return doc;
};
