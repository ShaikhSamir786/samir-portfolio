import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Loader2, Check, Code, Briefcase, GraduationCap } from "lucide-react";

interface ResumeSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function ResumeDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sections, setSections] = useState<ResumeSection[]>([
    { id: "summary", label: "Professional Summary", icon: <FileText className="w-4 h-4" />, enabled: true },
    { id: "experience", label: "Work Experience", icon: <Briefcase className="w-4 h-4" />, enabled: true },
    { id: "skills", label: "Technical Skills", icon: <Code className="w-4 h-4" />, enabled: true },
    { id: "projects", label: "Featured Projects", icon: <GraduationCap className="w-4 h-4" />, enabled: true },
  ]);

  const toggleSection = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    setIsComplete(false);

    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create resume content
    const resumeContent = generateResumeText(sections.filter(s => s.enabled).map(s => s.id));
    
    // Create and download the file
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "samir-resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsGenerating(false);
    setIsComplete(true);
    setTimeout(() => setIsComplete(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-6 border-4 border-primary bg-card"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-xl text-foreground">Download Resume</h3>
          <p className="text-sm font-mono text-muted-foreground">Customize and download</p>
        </div>
      </div>

      {/* Section toggles */}
      <div className="space-y-3 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => toggleSection(section.id)}
            className={`w-full flex items-center gap-3 p-3 border-2 transition-all ${
              section.enabled
                ? "border-primary bg-primary/10 text-foreground"
                : "border-muted bg-transparent text-muted-foreground"
            }`}
          >
            <div className={`w-5 h-5 border-2 flex items-center justify-center ${
              section.enabled ? "border-primary bg-primary" : "border-muted"
            }`}>
              {section.enabled && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            {section.icon}
            <span className="font-mono text-sm">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Download button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateResume}
        disabled={isGenerating || sections.filter(s => s.enabled).length === 0}
        className={`w-full py-4 font-mono text-sm flex items-center justify-center gap-2 transition-all ${
          isComplete
            ? "bg-green-500 text-white"
            : "bg-primary text-primary-foreground hover:shadow-brutal"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : isComplete ? (
          <>
            <Check className="w-5 h-5" />
            Downloaded!
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download Resume
          </>
        )}
      </motion.button>

      <p className="mt-4 text-xs font-mono text-muted-foreground text-center">
        Generated dynamically with latest information
      </p>
    </motion.div>
  );
}

function generateResumeText(enabledSections: string[]): string {
  const sections: Record<string, string> = {
    summary: `
================================================================================
                              SAMIR - BACKEND ENGINEER
================================================================================

PROFESSIONAL SUMMARY
--------------------
Senior Backend Engineer with 7+ years of experience building scalable, 
high-performance systems. Specialized in microservices architecture, 
distributed systems, and API development. Proven track record of reducing 
latency, improving system reliability, and mentoring development teams.

Contact: hello@samir.dev | GitHub: github.com/samir | LinkedIn: linkedin.com/in/samir
`,
    experience: `
WORK EXPERIENCE
---------------

SENIOR BACKEND ENGINEER | TechScale Inc. | 2023 - Present
• Led backend architecture for microservices handling 10M+ daily requests
• Reduced API latency by 60% through Redis caching strategies
• Designed event-driven architecture using Kafka
• Mentored team of 5 junior developers
Technologies: Node.js, PostgreSQL, Redis, Kafka, Kubernetes

FULL STACK DEVELOPER | StartupHub | 2021 - 2023
• Launched 3 production applications serving 50k+ users
• Implemented CI/CD pipelines reducing deployment time by 80%
• Integrated payment systems processing $2M+ monthly
Technologies: React, TypeScript, Python, AWS, Docker

BACKEND DEVELOPER | DataFlow Systems | 2019 - 2021
• Built ETL pipelines processing 1TB+ daily data
• Optimized database queries improving performance by 40%
• Developed internal tooling used by 200+ employees
Technologies: Python, Django, PostgreSQL, Elasticsearch, RabbitMQ

JUNIOR DEVELOPER | WebAgency Pro | 2017 - 2019
• Delivered 20+ client projects on time and budget
• Transitioned from frontend to full-stack development
Technologies: JavaScript, PHP, MySQL, WordPress
`,
    skills: `
TECHNICAL SKILLS
----------------

Languages:        JavaScript/TypeScript, Python, Go, PHP, SQL
Backend:          Node.js, Express, Fastify, Django, Flask
Databases:        PostgreSQL, MongoDB, Redis, Elasticsearch
Message Queues:   Kafka, RabbitMQ, AWS SQS
Cloud & DevOps:   AWS, GCP, Docker, Kubernetes, Terraform
Frontend:         React, Next.js, Vue.js, Tailwind CSS
Tools:            Git, GitHub Actions, Jenkins, Grafana, Prometheus
`,
    projects: `
FEATURED PROJECTS
-----------------

AUTHFLOW PRO - Authentication Microservice
Enterprise-grade auth service with OAuth2, JWT, and multi-tenant support.
Tech: Node.js, PostgreSQL, Redis | Stars: 1.2k | Used by 50+ companies

DATAPIPE ENGINE - Real-time Data Processing
High-throughput data pipeline handling 100k+ events/second.
Tech: Python, Kafka, ClickHouse | Processing: 1TB+ daily

CLOUDSCALE API - Serverless API Gateway
Auto-scaling API gateway with rate limiting and caching.
Tech: Go, AWS Lambda, DynamoDB | Requests: 10M+ monthly
`,
  };

  let resume = "";
  enabledSections.forEach(sectionId => {
    if (sections[sectionId]) {
      resume += sections[sectionId];
    }
  });

  resume += `
================================================================================
                         Generated on ${new Date().toLocaleDateString()}
================================================================================
`;

  return resume;
}
