import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const SkillsConstellation = lazy(() => import("../three/SkillsConstellation"));

const skillCategories = [
  {
    name: "Backend",
    color: "primary",
    skills: ["Node.js", "GraphQL", "REST APIs", "WebSockets"],
  },
  {
    name: "Frontend",
    color: "accent",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    name: "Database",
    color: "destructive",
    skills: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch"],
  },
  {
    name: "DevOps",
    color: "primary",
    skills: ["Docker", "GitHub Actions"],
  },
];

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: "bg-primary/20", text: "text-primary", border: "border-primary" },
    accent: { bg: "bg-accent/20", text: "text-accent", border: "border-accent" },
    destructive: { bg: "bg-destructive/20", text: "text-destructive", border: "border-destructive" },
  };

  const colors = colorClasses[category.color] || colorClasses.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`border-4 ${colors.border} p-6 bg-card`}
      style={{ boxShadow: `6px 6px 0px hsl(var(--${category.color}))` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${colors.bg} ${colors.text} animate-pulse-glow`} />
        <h3 className={`font-display text-xl ${colors.text}`}>{category.name}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
            viewport={{ once: true }}
            className={`px-3 py-1.5 ${colors.bg} ${colors.text} text-sm font-mono hover:scale-105 transition-transform cursor-default`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-brutal bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// TECH STACK</span>
          <h2 className="section-header">
            <span className="text-foreground">SKILLS</span>{" "}
            <span className="text-primary">CONSTELLATION</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Interactive 3D visualization of my technology expertise.
            Drag to explore, hover for details.
          </p>
        </motion.div>

        {/* 3D Constellation */}
        <div className="mb-16 border-4 border-foreground bg-background relative overflow-hidden" style={{ boxShadow: "10px 10px 0px hsl(var(--primary))" }}>
          <Suspense
            fallback={
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-primary animate-pulse-glow">Loading 3D visualization...</div>
              </div>
            }
          >
            <SkillsConstellation />
          </Suspense>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Database</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffff00" }} />
              <span className="text-muted-foreground">DevOps</span>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
