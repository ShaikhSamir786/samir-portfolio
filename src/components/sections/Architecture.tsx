import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Server, Database, Cloud, Layers, ArrowRight, ArrowDown, Zap } from "lucide-react";

interface Layer {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
}

const architectureLayers: Layer[] = [
  {
    id: "frontend",
    name: "FRONTEND LAYER",
    icon: <Globe className="w-6 h-6" />,
    color: "accent",
    description: "Client-side applications with optimized rendering and state management",
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    metrics: [
      { label: "First Paint", value: "<1.5s" },
      { label: "Bundle Size", value: "<200KB" },
    ],
  },
  {
    id: "api",
    name: "API GATEWAY",
    icon: <Server className="w-6 h-6" />,
    color: "primary",
    description: "Rate limiting, authentication, request routing, and API versioning",
    technologies: ["Node.js", "Express", "GraphQL", "REST", "WebSockets"],
    metrics: [
      { label: "Throughput", value: "10K rps" },
      { label: "Latency p99", value: "<50ms" },
    ],
  },
  {
    id: "services",
    name: "MICROSERVICES",
    icon: <Layers className="w-6 h-6" />,
    color: "primary",
    description: "Domain-driven design with event sourcing and CQRS patterns",
    technologies: ["Python", "Go", "Docker", "Kubernetes", "Kafka"],
    metrics: [
      { label: "Instances", value: "Auto-scaled" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: "data",
    name: "DATA LAYER",
    icon: <Database className="w-6 h-6" />,
    color: "accent",
    description: "Distributed databases with replication and intelligent caching",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch"],
    metrics: [
      { label: "Read Latency", value: "<5ms" },
      { label: "Write Latency", value: "<10ms" },
    ],
  },
  {
    id: "infrastructure",
    name: "CLOUD INFRASTRUCTURE",
    icon: <Cloud className="w-6 h-6" />,
    color: "primary",
    description: "Infrastructure as code with multi-region deployment",
    technologies: ["AWS", "Terraform", "GitHub Actions", "Datadog"],
    metrics: [
      { label: "Regions", value: "3" },
      { label: "DR Time", value: "<30min" },
    ],
  },
];

function LayerCard({ layer, index, isExpanded, onToggle }: { 
  layer: Layer; 
  index: number; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colorClasses = {
    primary: {
      border: "border-primary",
      bg: "bg-primary/10",
      text: "text-primary",
      shadow: "shadow-brutal",
    },
    accent: {
      border: "border-accent",
      bg: "bg-accent/10",
      text: "text-accent",
      shadow: "shadow-brutal-accent",
    },
  }[layer.color] || { border: "border-primary", bg: "bg-primary/10", text: "text-primary", shadow: "shadow-brutal" };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        className={`border-4 ${colorClasses.border} bg-card p-6 cursor-pointer transition-all duration-300 ${colorClasses.shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${colorClasses.bg} ${colorClasses.text}`}>
              {layer.icon}
            </div>
            <div>
              <h3 className="font-display text-xl text-foreground">{layer.name}</h3>
              <p className="text-muted-foreground text-sm">{layer.description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowDown className={`w-5 h-5 ${colorClasses.text}`} />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-6 mt-6 border-t-2 border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs text-muted-foreground mb-3 font-mono">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.text} text-xs font-mono`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground mb-3 font-mono">METRICS</h4>
                <div className="space-y-2">
                  {layer.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <span className={`text-sm font-bold ${colorClasses.text}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Connection arrow */}
      {index < architectureLayers.length - 1 && (
        <div className="flex justify-center py-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-8 bg-gradient-to-b from-primary to-accent" />
            <Zap className="w-4 h-4 text-primary animate-pulse-glow" />
            <div className="w-px h-8 bg-gradient-to-b from-accent to-primary" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default function Architecture() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  return (
    <section id="architecture" className="section-brutal">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// SYSTEM DESIGN</span>
          <h2 className="section-header">
            <span className="text-foreground">HOW I</span>{" "}
            <span className="text-primary">ARCHITECT</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Production-ready systems built on solid foundations. 
            Click each layer to explore the technology stack.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {architectureLayers.map((layer, index) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              index={index}
              isExpanded={expandedLayer === layer.id}
              onToggle={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
