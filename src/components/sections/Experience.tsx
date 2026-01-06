import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "1",
    role: "Senior Backend Engineer",
    company: "TechScale Inc.",
    location: "Remote",
    period: "2023 - Present",
    description: "Leading backend architecture for high-traffic microservices handling 10M+ daily requests.",
    achievements: [
      "Reduced API latency by 60% through Redis caching strategies",
      "Designed event-driven architecture using Kafka",
      "Mentored team of 5 junior developers",
    ],
    technologies: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Kubernetes"],
    companyUrl: "https://example.com",
  },
  {
    id: "2",
    role: "Full Stack Developer",
    company: "StartupHub",
    location: "Berlin, Germany",
    period: "2021 - 2023",
    description: "Built and maintained multiple client-facing applications from scratch.",
    achievements: [
      "Launched 3 production applications serving 50k+ users",
      "Implemented CI/CD pipelines reducing deployment time by 80%",
      "Integrated payment systems processing $2M+ monthly",
    ],
    technologies: ["React", "TypeScript", "Python", "AWS", "Docker"],
  },
  {
    id: "3",
    role: "Backend Developer",
    company: "DataFlow Systems",
    location: "London, UK",
    period: "2019 - 2021",
    description: "Developed data processing pipelines and REST APIs for enterprise clients.",
    achievements: [
      "Built ETL pipelines processing 1TB+ daily data",
      "Optimized database queries improving performance by 40%",
      "Developed internal tooling used by 200+ employees",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Elasticsearch", "RabbitMQ"],
  },
  {
    id: "4",
    role: "Junior Developer",
    company: "WebAgency Pro",
    location: "Paris, France",
    period: "2017 - 2019",
    description: "Started career building websites and web applications for small businesses.",
    achievements: [
      "Delivered 20+ client projects on time and budget",
      "Learned agile methodologies and version control",
      "Transitioned from frontend to full-stack development",
    ],
    technologies: ["JavaScript", "PHP", "MySQL", "WordPress", "jQuery"],
  },
];

function TimelineItem({ experience, index }: { experience: ExperienceItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary border-4 border-background z-10 hidden md:block" />
      
      {/* Content card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`w-full md:w-[calc(50%-2rem)] p-6 border-4 border-primary bg-card hover:shadow-brutal transition-all ${
          isEven ? "md:text-right" : "md:text-left"
        }`}
      >
        {/* Period badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground font-mono text-xs mb-4 ${
          isEven ? "md:ml-auto" : ""
        }`}>
          <Calendar className="w-3 h-3" />
          {experience.period}
        </div>

        {/* Role & Company */}
        <h3 className="font-display text-2xl text-foreground mb-1">{experience.role}</h3>
        <div className={`flex items-center gap-2 text-muted-foreground mb-3 ${isEven ? "md:justify-end" : ""}`}>
          <Briefcase className="w-4 h-4" />
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              {experience.company}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span>{experience.company}</span>
          )}
          <span className="text-muted-foreground/50">•</span>
          <MapPin className="w-4 h-4" />
          <span>{experience.location}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 font-mono text-sm">{experience.description}</p>

        {/* Achievements */}
        <ul className={`space-y-2 mb-4 ${isEven ? "md:text-right" : ""}`}>
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="text-sm text-foreground/80 font-mono flex items-start gap-2">
              <span className="text-primary mt-1 shrink-0">▸</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono border border-accent text-accent bg-accent/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Empty space for timeline alignment */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary/20 rotate-45" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border-4 border-accent/20 -rotate-12" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground font-mono text-sm mb-6">
            CAREER JOURNEY
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-6">
            EXPERIENCE
          </h2>
          <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
            A timeline of my professional growth, from junior developer to senior backend engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30 -translate-x-1/2 hidden md:block" />

          {/* Experience items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.id} experience={experience} index={index} />
            ))}
          </div>

          {/* Timeline end dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-8 w-8 h-8 bg-accent border-4 border-background items-center justify-center"
          >
            <span className="text-accent-foreground font-mono text-xs">NOW</span>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "7+", label: "Years Experience" },
            { value: "50+", label: "Projects Delivered" },
            { value: "4", label: "Companies" },
            { value: "100%", label: "Remote Ready" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 border-4 border-primary/50 bg-card/50 text-center hover:border-primary transition-colors"
            >
              <div className="font-display text-4xl text-primary mb-2">{stat.value}</div>
              <div className="font-mono text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
