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

  experiences.forEach(exp => {
    const titleLines = doc.splitTextToSize(exp.title, pageWidth - 60);
    const neededHeight = (titleLines.length * 6) + (exp.points.length * 7) + 10;
    
    checkPageBreak(neededHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(exp.title, 20, currentY);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(exp.date, pageWidth - 20, currentY, { align: "right" });
    currentY += 6;

    doc.setFont("helvetica", "normal");
    exp.points.forEach(point => {
      const splitPoint = doc.splitTextToSize("• " + point, pageWidth - 45);
      doc.text(splitPoint, 25, currentY);
      currentY += splitPoint.length * 5;
    });
    currentY += 5;
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
