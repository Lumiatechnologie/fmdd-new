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
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LearningDashboard from "./pages/LearningDashboard";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplicationsDashboard from "./pages/ApplicationsDashboard";
import InterviewPrepPage from "./pages/InterviewPrepPage";
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
          <Route path="/academy/:id" element={<CourseDetailPage />} />
          <Route path="/insertion" element={<InsertionPage />} />
          <Route path="/insertion/:id" element={<JobDetailPage />} />
          <Route path="/candidatures" element={<ApplicationsDashboard />} />
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/temoignages" element={<TestimonialsPage />} />
          <Route path="/evenements" element={<EventsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<LearningDashboard />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
