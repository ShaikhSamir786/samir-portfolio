import { motion } from "framer-motion";
import { Award, ExternalLink, ArrowRight } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

const certificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    credentialUrl: "https://aws.amazon.com/certification/",
  },
  {
    id: "2",
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2023",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    credentialUrl: "https://openjsf.org/certification/",
  },
  {
    id: "3",
    title: "MongoDB Database Administrator",
    issuer: "MongoDB University",
    date: "2023",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    credentialUrl: "https://university.mongodb.com/",
  },
];

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="card-brutal overflow-hidden h-full transition-all duration-300 hover:shadow-brutal-lg">
        {/* Certificate Image */}
        <div className="relative h-40 overflow-hidden border-b-4 border-foreground -mx-6 -mt-6 mb-4">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute top-3 right-3 p-2 bg-primary">
            <Award className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Certificate Details */}
        <div className="space-y-2">
          <h3 className="font-display text-lg text-foreground leading-tight">
            {certificate.title}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            {certificate.issuer}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-primary font-mono">{certificate.date}</span>
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Verify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const GITHUB_CERTIFICATES_REPO = "https://github.com/ShaikhSamir786/certificates";

  return (
    <section id="certificates" className="section-brutal bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider">// CREDENTIALS</span>
          <h2 className="section-header">
            <span className="text-foreground">PROFESSIONAL</span>{" "}
            <span className="text-primary">CERTIFICATES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mt-4">
            Industry-recognized certifications demonstrating expertise in cloud architecture,
            backend development, and database management.
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard key={certificate.id} certificate={certificate} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={GITHUB_CERTIFICATES_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-outline inline-flex items-center gap-2"
          >
            View All Certificates
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
