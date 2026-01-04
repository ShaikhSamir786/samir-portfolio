import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

const navLinks = [
  { href: "#metrics", label: "Metrics" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-sm border-b-4 border-primary" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="p-2 border-2 border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-display text-xl text-foreground hidden sm:block">DEV.PORTFOLIO</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a
                href="#contact"
                className="px-4 py-2 bg-primary text-primary-foreground font-mono text-sm border-2 border-primary hover:bg-transparent hover:text-primary transition-all"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 border-2 border-foreground hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                y: isMobileMenuOpen ? 0 : 20 
              }}
              transition={{ delay: index * 0.1 }}
              className="font-display text-4xl text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0, 
              y: isMobileMenuOpen ? 0 : 20 
            }}
            transition={{ delay: navLinks.length * 0.1 }}
            className="btn-brutal mt-4"
          >
            Hire Me
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
