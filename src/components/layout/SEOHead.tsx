import { useEffect } from 'react';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
    author?: string;
    structuredData?: Record<string, any>;
}

export default function SEOHead({
    title = "Hire Samir Shaikh | Freelance Full-Stack, AI & Backend Developer (Node.js, MERN, APIs)",
    description = "Hire a trusted freelance Full-Stack & Backend Developer specializing in Node.js, MERN stack, secure REST & GraphQL APIs, AI chatbot integration, and scalable microservices. Helping startups and enterprises build production-ready SaaS platforms for US, India, and Middle East clients.",
    keywords = "Hire Node.js Developer, Freelance Backend Developer, Freelance Full-Stack Developer, MERN Stack Consultant, API Development Expert, Microservices Architecture, AI Chatbot Developer, Secure Web Application Development, SaaS Backend Development, Database Optimization, Remote Software Developer, Tech Consultant US Middle East India, Samir Shaikh Portfolio",
    ogImage = "/img/samir-profile-image.jpg",
    ogUrl = "https://github.com/ShaikhSamir786",
    author = "Samir Shaikh",
    structuredData,
}: SEOHeadProps) {
    useEffect(() => {
        // Set document title
        document.title = title;

        // Helper function to set or update meta tags
        const setMetaTag = (attribute: string, key: string, content: string) => {
            let element = document.querySelector(`meta[${attribute}="${key}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Helper function to set or update link tags
        const setLinkTag = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        // Primary Meta Tags
        setMetaTag('name', 'title', title);
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'keywords', keywords);
        setMetaTag('name', 'author', author);
        setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

        // Geographic Meta Tags
        setMetaTag('name', 'geo.region', 'US-IN-AE-SA-QA-OM-KW-CA-MA');
        setMetaTag('name', 'geo.placename', 'Worldwide, Remote, United States, India, Middle East, Bahrain, Qatar, Oman, Kuwait, Saudi Arabia, Surat, Gujarat, Maharashtra, Bangalore, Karnataka, Hyderabad, Telangana , Vadodara, Ahmedabad, Vapi, Rajkot, Valsad ');

        // Open Graph / Profile
        setMetaTag('property', 'og:type', 'profile');
        setMetaTag('property', 'og:url', ogUrl);
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:image', ogImage);
        setMetaTag('property', 'og:image:alt', 'Samir Shaikh – Freelance Full-Stack & AI Developer');
        setMetaTag('property', 'profile:first_name', 'Samir');
        setMetaTag('property', 'profile:last_name', 'Shaikh');
        setMetaTag('property', 'profile:username', 'ShaikhSamir786');

        // Social Profile Links
        const ogSeeAlsoLinks = [
            'https://github.com/ShaikhSamir786',
            'https://www.linkedin.com/in/samir-shaikh-760b932a8/'
        ];

        // Remove existing og:see_also tags
        document.querySelectorAll('meta[property="og:see_also"]').forEach(el => el.remove());

        // Add new og:see_also tags
        ogSeeAlsoLinks.forEach(link => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:see_also');
            meta.setAttribute('content', link);
            document.head.appendChild(meta);
        });

        // Twitter / X
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:url', ogUrl);
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', ogImage);
        setMetaTag('name', 'twitter:image:alt', 'Samir Shaikh – Freelance Backend, AI & Full-Stack Developer');

        // LinkedIn Specific
        setMetaTag('property', 'article:author', 'https://www.linkedin.com/in/samir-shaikh-760b932a8/');

        // Canonical
        setLinkTag('canonical', ogUrl);

        // GitHub Profile Verification
        const meLinks = [
            'https://github.com/ShaikhSamir786',
            'https://www.linkedin.com/in/samir-shaikh-760b932a8/'
        ];

        // Remove existing rel="me" tags
        document.querySelectorAll('link[rel="me"]').forEach(el => el.remove());

        // Add new rel="me" tags
        meLinks.forEach(link => {
            const linkEl = document.createElement('link');
            linkEl.setAttribute('rel', 'me');
            linkEl.setAttribute('href', link);
            document.head.appendChild(linkEl);
        });

        // Structured Data
        if (structuredData) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(structuredData);
        }
    }, [title, description, keywords, ogImage, ogUrl, author, structuredData]);

    return null;
}

// Default structured data for the portfolio
export const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://github.com/ShaikhSamir786/#person",
            "name": "Samir Shaikh",
            "url": "https://github.com/ShaikhSamir786",
            "jobTitle": "Freelance Full-Stack & AI Backend Developer",
            "description": "Freelance Full-Stack and AI Backend Developer specializing in scalable Node.js systems, MERN stack applications, secure REST and GraphQL APIs, cloud deployment, and AI-powered solutions for startups and growing businesses.",
            "worksFor": {
                "@type": "Organization",
                "name": "Independent Freelancer"
            },
            "sameAs": [
                "https://github.com/ShaikhSamir786",
                "https://www.linkedin.com/in/samir-shaikh-760b932a8/",
            ],
            "knowsAbout": [
                "Full-Stack Web Development",
                "Frontend Development with React and Next.js",
                "Node.js Backend Development",
                "MERN Stack Architecture and Best Practices",
                "RESTful API and GraphQL API Development",
                "Microservices Architecture and Distributed Systems",
                "Database Design, Indexing, and Performance Optimization",
                "MongoDB, PostgreSQL, and SQL Databases",
                "Authentication and Authorization Systems (JWT, OAuth, RBAC)",
                "Web Application Security and OWASP Top 10",
                "API Security and Secure System Design",
                "Cloud Infrastructure and Deployment (AWS, Docker, CI/CD)",
                "DevOps and Continuous Integration / Continuous Deployment",
                "AI Chatbot Development and LLM Integration",
                "Retrieval-Augmented Generation (RAG) Systems",
                "Performance Optimization and Technical SEO"
            ]
        },
        {
            "@type": "ProfessionalService",
            "@id": "https://github.com/ShaikhSamir786/#professional-service",
            "name": "Samir Shaikh – Freelance Full-Stack, AI & Backend Development Services",
            "description": "Professional freelance services specializing in full-stack web development, scalable Node.js backend systems, MERN stack applications, secure API development, AI chatbot integration, and cloud-ready architectures for startups and enterprises worldwide.",
            "url": "https://github.com/ShaikhSamir786",
            "image": "img/samir-profile-image.jpg",
            "priceRange": "$$$",
            "availableChannel": {
                "@type": "ServiceChannel",
                "serviceLocation": {
                    "@type": "Place",
                    "name": "Online / Remote"
                }
            },
            "areaServed": [
                { "@type": "AdministrativeArea", "name": "Worldwide", "description": "Remote freelance software development services available globally" },
                { "@type": "Country", "name": "India" },
                { "@type": "Country", "name": "United States" },
                { "@type": "Country", "name": "United Arab Emirates" },
                { "@type": "Country", "name": "Saudi Arabia" },
                { "@type": "Country", "name": "Qatar" },
                { "@type": "AdministrativeArea", "name": "Middle East" },
                { "@type": "AdministrativeArea", "name": "Maharashtra", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Gujarat", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Karnataka", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Tamil Nadu", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Kerala", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "West Bengal", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Haryana", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Uttar Pradesh", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Rajasthan", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "AdministrativeArea", "name": "Madhya Pradesh", "containedInPlace": { "@type": "Country", "name": "India" } },
                { "@type": "City", "name": "Surat", "containedInPlace": { "@type": "AdministrativeArea", "name": "Gujarat" } },
                { "@type": "City", "name": "Ahmedabad", "containedInPlace": { "@type": "AdministrativeArea", "name": "Gujarat" } },
                { "@type": "City", "name": "Vadodara", "containedInPlace": { "@type": "AdministrativeArea", "name": "Gujarat" } },
                { "@type": "City", "name": "Noida", "containedInPlace": { "@type": "AdministrativeArea", "name": "Uttar Pradesh" } },
                { "@type": "City", "name": "Vapi", "containedInPlace": { "@type": "AdministrativeArea", "name": "Gujarat" } }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Freelance Software Development, AI & Cyber Security Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Frontend Web Development (React & Next.js)",
                            "description": "Modern, responsive, and SEO-friendly frontend development using React.js, Next.js, Tailwind CSS, and TypeScript for high-performance web applications."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Full-Stack Web Application Development (MERN)",
                            "description": "End-to-end MERN stack development using MongoDB, Express, React, and Node.js for SaaS platforms, dashboards, admin panels, and MVPs."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Custom Node.js Backend & API Development",
                            "description": "Scalable backend systems with Node.js, Express, and NestJS, including secure REST and GraphQL APIs, authentication, and business logic."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "REST & GraphQL API Design and Integration",
                            "description": "Design and integration of RESTful and GraphQL APIs with RBAC, third-party services, microservices, and secure communication."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Database Design, Optimization & Migration",
                            "description": "Schema design, indexing, query optimization, and database migrations for PostgreSQL, MySQL, and MongoDB."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Web Application Security & Cyber Security Hardening",
                            "description": "Cyber security implementation following OWASP Top 10, secure authentication, vulnerability mitigation, and secure coding practices."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "API Security & Secure System Architecture",
                            "description": "API security with rate limiting, encryption, token validation, audit logging, and secure system architecture design."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI Chatbot Development (LLM, RAG & Automation)",
                            "description": "Custom AI chatbot development using LLMs, Retrieval-Augmented Generation (RAG), and workflow automation for websites, SaaS platforms, and internal tools."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "AI Integration & Intelligent Automation",
                            "description": "Integration of AI features such as content generation, semantic search, recommendation systems, and intelligent automation using modern AI APIs."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "DevOps, CI/CD & Cloud Deployment",
                            "description": "Automated CI/CD pipelines, containerization with Docker, and scalable cloud deployment to ensure reliable production systems."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Performance Optimization & Technical SEO",
                            "description": "Core Web Vitals optimization, performance tuning, and technical SEO improvements for better speed, usability, and search engine rankings."
                        }
                    }
                ]
            }
        }
    ]
};
