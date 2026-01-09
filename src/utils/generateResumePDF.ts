import { jsPDF } from "jspdf";

interface ResumeData {
  enabledSections: string[];
}

const COLORS = {
  primary: [0, 255, 136] as [number, number, number],
  text: [17, 17, 17] as [number, number, number],
  muted: [102, 102, 102] as [number, number, number],
  accent: [255, 107, 107] as [number, number, number],
};

export function generateResumePDF({ enabledSections }: ResumeData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = margin;

  // Helper functions
  const addSectionHeader = (title: string) => {
    doc.setFillColor(...COLORS.primary);
    doc.rect(margin, yPos, contentWidth, 8, "F");
    doc.setTextColor(...COLORS.text);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 3, yPos + 5.5);
    yPos += 14;
  };

  const addText = (text: string, indent = 0, fontSize = 10) => {
    doc.setTextColor(...COLORS.text);
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    doc.text(lines, margin + indent, yPos);
    yPos += lines.length * (fontSize * 0.4) + 2;
  };

  const addBullet = (text: string) => {
    doc.setTextColor(...COLORS.muted);
    doc.text("•", margin + 3, yPos);
    doc.setTextColor(...COLORS.text);
    const lines = doc.splitTextToSize(text, contentWidth - 10);
    doc.text(lines, margin + 8, yPos);
    yPos += lines.length * 4 + 2;
  };

  // Header
  doc.setFillColor(...COLORS.text);
  doc.rect(0, 0, pageWidth, 45, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("SAMIR SHAIKH", margin, 22);
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.primary);
  doc.text("Full-Stack & Backend Developer", margin, 32);
  
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text("22amtics312@gmail.com | github.com/ShaikhSamir786 | linkedin.com/in/samir-shaikh-760b932a8", margin, 40);
  
  yPos = 55;

  // Professional Summary
  if (enabledSections.includes("summary")) {
    addSectionHeader("PROFESSIONAL SUMMARY");
    addText(
      "Results-driven Full-Stack Developer with expertise in building scalable, high-performance web applications. Specialized in Node.js, React, and modern backend architectures. Proven track record of delivering production-ready solutions for startups and enterprises, with deep experience in API development, microservices, and database optimization.",
      0,
      10
    );
    yPos += 6;
  }

  // Work Experience
  if (enabledSections.includes("experience")) {
    addSectionHeader("WORK EXPERIENCE");

    const experiences = [
      {
        title: "Senior Backend Engineer",
        company: "TechScale Inc.",
        period: "2023 - Present",
        bullets: [
          "Led backend architecture for microservices handling 10M+ daily requests",
          "Reduced API latency by 60% through Redis caching strategies",
          "Designed event-driven architecture using Kafka for real-time data processing",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "StartupHub",
        period: "2021 - 2023",
        bullets: [
          "Launched 3 production applications serving 50k+ active users",
          "Implemented CI/CD pipelines reducing deployment time by 80%",
          "Integrated payment systems processing $2M+ monthly transactions",
        ],
      },
    ];

    experiences.forEach((exp) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.text);
      doc.text(exp.title, margin, yPos);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.muted);
      doc.text(` | ${exp.company} | ${exp.period}`, margin + doc.getTextWidth(exp.title) + 2, yPos);
      yPos += 6;

      exp.bullets.forEach((bullet) => addBullet(bullet));
      yPos += 4;
    });
  }

  // Technical Skills
  if (enabledSections.includes("skills")) {
    addSectionHeader("TECHNICAL SKILLS");

    const skills = [
      { category: "Languages", items: "JavaScript, TypeScript, Python, Go, SQL" },
      { category: "Backend", items: "Node.js, Express, Fastify, Django, REST, GraphQL" },
      { category: "Databases", items: "PostgreSQL, MongoDB, Redis, Elasticsearch" },
      { category: "DevOps", items: "Docker, Kubernetes, AWS, GCP, CI/CD, Terraform" },
      { category: "Frontend", items: "React, Next.js, Vue.js, Tailwind CSS" },
    ];

    skills.forEach((skill) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.primary);
      doc.text(`${skill.category}:`, margin, yPos);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.text);
      doc.text(skill.items, margin + 28, yPos);
      yPos += 6;
    });
    yPos += 4;
  }

  // Featured Projects
  if (enabledSections.includes("projects")) {
    addSectionHeader("FEATURED PROJECTS");

    const projects = [
      {
        name: "RAG Platform",
        description: "Retrieval Augmented Generation system for intelligent document querying",
        tech: "Next.js, Node.js, PostgreSQL, MongoDB",
      },
      {
        name: "2FA MERN Auth",
        description: "Production-ready 2FA system with TOTP and secure session storage",
        tech: "React, Node.js, Express, MongoDB",
      },
      {
        name: "TypeScript SDK",
        description: "Production-ready SDK with clean architecture and robust error handling",
        tech: "TypeScript, Node.js, Axios",
      },
    ];

    projects.forEach((project) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.text);
      doc.text(project.name, margin, yPos);
      yPos += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.muted);
      doc.text(project.description, margin, yPos);
      yPos += 4;

      doc.setTextColor(...COLORS.primary);
      doc.text(`Tech: ${project.tech}`, margin, yPos);
      yPos += 8;
    });
  }

  // Footer
  doc.setFillColor(...COLORS.text);
  doc.rect(0, doc.internal.pageSize.getHeight() - 12, pageWidth, 12, "F");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.primary);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} | samir-portfolio-mauve.vercel.app`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 5,
    { align: "center" }
  );

  // Download
  doc.save("Samir_Shaikh_Resume.pdf");
}
