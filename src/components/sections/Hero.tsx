import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const FloatingTerminal = lazy(() => import("../three/FloatingTerminal"));

const GlitchText = ({ text, className }: { text: string; className?: string }) => (
  <span className={`glitch relative ${className}`} data-text={text}>
    {text}
  </span>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <FloatingTerminal />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Visually hidden to preserve layout spacing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 invisible"
        >
          <span className="inline-block px-4 py-2 border-2 border-primary text-primary font-mono text-sm tracking-wider mb-8">
            <span className="animate-terminal-blink">▌</span> FULL-STACK DEVELOPER
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] mb-8"
        >
          <span className="text-foreground">I BUILD</span>
          <br />
          <GlitchText text="BACKENDS" className="text-primary text-glow" />
          <br />
          <span className="text-foreground">THAT</span>{" "}
          <span className="text-accent">SCALE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary">{">"}</span> And frontends that don't suck.
          <span className="animate-terminal-blink ml-1">▌</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#projects" className="btn-brutal">
            View Projects
          </a>
          <a href="#contact" className="btn-brutal-outline">
            Get In Touch
          </a>
          <a
            href="/resume/Samir_Shaikh_Resume.pdf"
            download="Samir_Shaikh_Resume.pdf"
            className="btn-brutal-outline inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/ShaikhSamir786", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/samir-shaikh-760b932a8/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:22amtics312@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all duration-200 hover:shadow-brutal-sm"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>


    </section>
  );
}
