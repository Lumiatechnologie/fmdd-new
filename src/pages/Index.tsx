 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { HeroSection } from "@/components/home/HeroSection";
 import { SolutionsSection } from "@/components/home/SolutionsSection";
 import { StatsSection } from "@/components/home/StatsSection";
 import { TestimonialsSection } from "@/components/home/TestimonialsSection";
 import { PartnersSection } from "@/components/home/PartnersSection";
 import { CTASection } from "@/components/home/CTASection";
 
 const Index = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main>
         <HeroSection />
         <SolutionsSection />
         <StatsSection />
         <TestimonialsSection />
         <PartnersSection />
         <CTASection />
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Index;
