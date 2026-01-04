import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MetricsDashboard from "@/components/sections/MetricsDashboard";
import Projects from "@/components/sections/Projects";
import Architecture from "@/components/sections/Architecture";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <MetricsDashboard />
        <Projects />
        <Architecture />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
