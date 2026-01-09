import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight, Globe, Server, Database, Star, GitFork, Sparkles, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  frontend: string[];
  backend: string[];
  database?: string[];
  repoName: string;
  github: string;
  demo?: string;
  featured: boolean;
  aiSummary: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "RAG PLATFORM",
    description: "Retrieval Augmented Generation system for intelligent document querying and context-aware responses.",
    image: "/img/Screenshot 2026-01-04 094500.png",
    frontend: ["Next.js", "TypeScript"],
    backend: ["Node.js", "Express"],
    database: ["postgres", "timescaleDb", "MongoDB"],
    repoName: "rag",
    github: "https://github.com/ShaikhSamir786/rag",
    featured: true,
    aiSummary: "🚀 This RAG Platform revolutionizes document intelligence by combining vector embeddings with LLM capabilities. It enables semantic search across massive document repositories, delivering contextually accurate responses in milliseconds. Perfect for enterprise knowledge management and AI-powered customer support systems.",
  },
  {
    id: "2",
    title: "2FA MERN AUTH",
    description: "Production-ready 2FA system with TOTP, QR code setup, bcrypt hashing, and secure session storage.",
    image: "/img/twofactauth.png",
    frontend: ["React", "Vite", "TailwindCSS"],
    backend: ["Node.js", "Express", "Passport.js"],
    database: ["MongoDB"],
    repoName: "2FA-MERN",
    github: "https://github.com/ShaikhSamir786/2FA-MERN",
    featured: true,
    aiSummary: "🔐 Enterprise-grade authentication system implementing TOTP-based 2FA with military-grade encryption. Features include QR code provisioning, backup codes, rate limiting, and JWT refresh token rotation. Reduces account compromise risk by 99.9% compared to password-only auth.",
  },
  {
    id: "3",
    title: "TYPESCRIPT SDK",
    description: "Production-ready SDK for JSONPlaceholder API with clean architecture and robust error handling.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    frontend: [],
    backend: ["TypeScript", "Node.js", "Axios"],
    repoName: "TypeScript-SDK-for-JSONPlaceholder",
    github: "https://github.com/ShaikhSamir786/TypeScript-SDK-for-JSONPlaceholder",
    featured: true,
    aiSummary: "⚡ Developer-first SDK showcasing TypeScript best practices with full type safety and IntelliSense support. Implements retry logic, request caching, and comprehensive error handling. Reduces API integration time from hours to minutes with zero configuration required.",
  },
  {
    id: "4",
    title: "EVENTIFY PLATFORM",
    description: "Scalable event management platform for creating, managing, and collaborating on events seamlessly.",
    image: "https://images.unsplash.com/photo-1505373877741-e174b4cc1605?w=800&h=600&fit=crop",
    frontend: ["No frontend"],
    backend: ["Node.js", "express"],
    database: ["SQL"],
    repoName: "Eventify",
    github: "https://github.com/ShaikhSamir786/Eventify",
    featured: true,
    aiSummary: "🎉 Scalable event management backend handling 100k+ concurrent users with real-time updates via WebSockets. Features include ticketing, RSVP management, calendar sync, and analytics dashboard. Architected for horizontal scaling with Redis-backed session management.",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ stars: 0, forks: 0 });
  const [showAISummary, setShowAISummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/repos/ShaikhSamir786/${project.repoName}`)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStats({ stars: data.stargazers_count, forks: data.forks_count });
        }
      })
      .catch(err => console.error("Failed to fetch stats", err));
  }, [project.repoName]);

  const handleAISummary = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showAISummary) {
      setShowAISummary(false);
      setDisplayedText("");
      return;
    }

    setIsGenerating(true);
    setShowAISummary(true);
    setDisplayedText("");

    // Simulate AI generation with typewriter effect
    setTimeout(() => {
      setIsGenerating(false);
      let i = 0;
      const text = project.aiSummary;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 20);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-1000 h-[450px]"
    >
      <div
        className={`relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="card-brutal h-full flex flex-col overflow-hidden group">
            <div className="relative h-48 overflow-hidden border-b-4 border-foreground -mx-6 -mt-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              {project.featured && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold">
                  FEATURED
                </span>
              )}
              {/* AI Summary Button */}
              <button
                onClick={handleAISummary}
                className={`absolute top-4 left-4 p-2 border-2 transition-all duration-300 ${
                  showAISummary 
                    ? "bg-accent border-accent text-accent-foreground" 
                    : "bg-card/90 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
                title="AI Summary"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* AI Summary Overlay */}
            <AnimatePresence>
              {showAISummary && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-48 left-0 right-0 mx-4 z-10"
                >
                  <div className="bg-card border-2 border-accent p-4 shadow-brutal relative">
                    <button
                      onClick={handleAISummary}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-xs font-mono text-accent">AI ANALYSIS</span>
                    </div>
                    {isGenerating ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-xs">Analyzing project...</span>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed">
                        {displayedText}
                        <span className="animate-pulse">|</span>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col pt-4">
              <h3 className="font-display text-2xl text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm flex-1 line-clamp-3">{project.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-border">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="w-3 h-3" />
                    <span>{stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <GitFork className="w-3 h-3" />
                    <span>{stats.forks}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  Click to flip →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
          <div className="card-brutal-accent h-full flex flex-col">
            <h4 className="font-display text-xl text-foreground mb-4">TECH STACK</h4>

            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">FRONTEND</span>
                  <div className="flex flex-wrap gap-1">
                    {project.frontend.length > 0 ? project.frontend.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs">
                        {tech}
                      </span>
                    )) : <span className="text-xs text-muted-foreground/50">N/A</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Server className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">BACKEND</span>
                  <div className="flex flex-wrap gap-1">
                    {project.backend.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-primary/20 text-primary text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.database && (
                <div className="flex items-start gap-3">
                  <Database className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">DATABASE</span>
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs">
                      {project.database.map((tech) => tech).join(", ")}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground block mb-2">REPOSITORY STATS</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-secondary flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-primary font-bold block">{stats.stars}</span>
                      <span className="text-muted-foreground block text-[10px]">STARS</span>
                    </div>
                  </div>
                  <div className="p-2 bg-secondary flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-primary font-bold block">{stats.forks}</span>
                      <span className="text-muted-foreground block text-[10px]">FORKS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                <span className="text-xs font-bold">CODE</span>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-xs font-bold">DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-brutal bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// SELECTED WORK</span>
          <h2 className="section-header">
            <span className="text-foreground">FEATURED</span>{" "}
            <span className="text-primary">PROJECTS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Production-grade applications showcasing scalable architecture,
            clean code, and attention to performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/ShaikhSamir786"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-outline inline-flex items-center gap-2"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
