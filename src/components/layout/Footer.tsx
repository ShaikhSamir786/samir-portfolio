import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Download } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-primary bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 border-2 border-primary text-primary">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-display text-xl text-foreground">Samir.PORTFOLIO</span>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Building scalable systems<br />one commit at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8"
          >
            {["Projects", "Skills", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* Social Links & Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <div className="flex justify-center md:justify-end gap-4">
              {[
                { icon: Github, href: "https://github.com/ShaikhSamir786" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/samir-shaikh-760b932a8/" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-muted hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Resume Download Button */}
            <a
              href="/resume/Samir_Shaikh_Resume.pdf"
              download="Samir_Shaikh_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-mono text-sm"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground text-xs font-mono flex items-center justify-center gap-2">
            <span>© {currentYear}</span>
            <span className="text-primary">|</span>
            <span>created mindfully</span>
            {/* <Heart className="w-3 h-3 text-destructive inline" /> */}
            <span>with</span>
            <span className="text-primary">React + Three.js</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
