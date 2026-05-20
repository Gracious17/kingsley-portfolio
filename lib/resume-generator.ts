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
      title: "Hallos Platform | Frontend Developer",
      date: "Oct 2025 – Dec 2026",
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
        "Designed scalable PostgreSQL database architecture using Prisma ORM."
      ]
    }
  ];

  experiences.forEach(exp => {
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
