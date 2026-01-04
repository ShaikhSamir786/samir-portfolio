import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", formState);
    setFormState({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <section id="contact" className="section-brutal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// LET'S CONNECT</span>
          <h2 className="section-header">
            <span className="text-foreground">GET IN</span>{" "}
            <span className="text-primary">TOUCH</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-destructive" />
                <div className="terminal-dot bg-accent" />
                <div className="terminal-dot bg-primary" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">contact.json</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-muted-foreground">{"{"}</p>
                <p className="ml-4">
                  <span className="text-accent">"status"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-primary">"Available for opportunities"</span>
                  <span className="text-foreground">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-accent">"response_time"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-primary">"&lt; 24 hours"</span>
                  <span className="text-foreground">,</span>
                </p>
                <p className="ml-4">
                  <span className="text-accent">"timezone"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-primary">"UTC-5 (EST)"</span>
                </p>
                <p className="text-muted-foreground">{"}"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 border-2 border-primary text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-foreground font-bold">Location</p>
                  <p className="text-muted-foreground text-sm">Remote / Anywhere</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 border-2 border-accent text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-foreground font-bold">Availability</p>
                  <p className="text-muted-foreground text-sm">Full-time / Contract / Consulting</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl text-foreground mb-4">FIND ME ONLINE</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-4 border-foreground hover:border-primary hover:text-primary transition-all duration-200 hover:shadow-brutal-sm"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-4 bg-card border-4 border-foreground text-foreground font-mono focus:border-primary focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-4 bg-card border-4 border-foreground text-foreground font-mono focus:border-primary focus:outline-none transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-4 bg-card border-4 border-foreground text-foreground font-mono focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Let's build something amazing together..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brutal w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
