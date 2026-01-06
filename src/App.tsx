import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TerminalEasterEgg from "@/components/terminal/TerminalEasterEgg";
import SecretFeatureHint from "@/components/terminal/SecretFeatureHint";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import AIChatbot from "@/components/chat/AIChatbot";
import SEOHead, { defaultStructuredData } from "@/components/layout/SEOHead";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEOHead structuredData={defaultStructuredData} />
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <SmoothScroll />
      <TerminalEasterEgg />
      <SecretFeatureHint />
      <AIChatbot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
