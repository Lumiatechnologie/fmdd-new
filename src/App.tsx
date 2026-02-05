import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
 import AcademyPage from "./pages/AcademyPage";
 import InsertionPage from "./pages/InsertionPage";
 import ProjectsPage from "./pages/ProjectsPage";
 import GalleryPage from "./pages/GalleryPage";
 import TestimonialsPage from "./pages/TestimonialsPage";
 import EventsPage from "./pages/EventsPage";
 import BlogPage from "./pages/BlogPage";
 import "@/lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
           <Route path="/academy" element={<AcademyPage />} />
           <Route path="/insertion" element={<InsertionPage />} />
           <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/temoignages" element={<TestimonialsPage />} />
            <Route path="/evenements" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
