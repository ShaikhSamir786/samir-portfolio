import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MetricsDashboard from "@/components/sections/MetricsDashboard";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Architecture from "@/components/sections/Architecture";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import ResumeDownload from "@/components/resume/ResumeDownload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <MetricsDashboard />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <Contact />
        {/* Resume Download floating widget */}
        <div className="fixed bottom-6 left-6 z-40 hidden lg:block w-72">
          <ResumeDownload />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
