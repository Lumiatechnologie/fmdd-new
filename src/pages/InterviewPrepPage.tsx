import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Play, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  Video, 
  FileText,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function InterviewPrepPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [prepContent, setPrepContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrepContent();
  }, []);

  const fetchPrepContent = async () => {
    try {
      // In a real app, this would be a dedicated endpoint
      const response = await api.get("/interview-prep");
      setPrepContent(response.data);
    } catch (e) {
      // Manual fallback for demo
      setPrepContent([
        {
          id: 1,
          title: "Réussir son Entretien dans le DD",
          description: "Conseils spécifiques pour les métiers de l'impact au Maroc.",
          category: "Entretien",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { title: "Le CV Impact", icon: FileText, items: ["Optimiser son profil LinkedIn", "Valoriser ses engagements DD", "Structures de CV modernes"] },
    { title: "L'Entretien", icon: Users, items: ["Préparer le pitch de 2 min", "Questions types du secteur", "Postures & Soft Skills"] },
    { title: "Simulations", icon: HelpCircle, items: ["Quiz technique DD", "Études de cas réelles", "Tests de personnalité"] },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-4xl mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                <Sparkles className="w-5 h-5" />
                Préparation Carrière
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Préparez-vous à <span className="text-accent">propulser</span> votre carrière
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Accédez à nos ressources exclusives pour briller lors de vos futurs entretiens dans le secteur du développement durable au Maroc.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
             {sections.map((section, idx) => (
               <motion.div
                 key={section.title}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-card p-10 rounded-3xl border border-border shadow-soft hover:border-primary transition-all group"
               >
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <section.icon className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
                 <ul className="space-y-4">
                    {section.items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-success/60" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                 </ul>
                 <Button variant="ghost" className="w-full mt-10 gap-2 font-bold group-hover:text-primary">
                    Explorer <ChevronRight className="w-4 h-4" />
                 </Button>
               </motion.div>
             ))}
          </div>

          {/* Video Training Section */}
          <div className="bg-muted p-12 rounded-[3rem] border border-border overflow-hidden relative">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full" />
             <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                   <h2 className="text-4xl font-display font-bold">Vidéos & Tutoriels</h2>
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     Apprenez des meilleurs experts RH spécialisés dans l'impact. Nos simulations d'entretien par l'intelligence artificielle arrivent bientôt !
                   </p>
                   <div className="flex gap-4">
                      <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                         <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                            <Video className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block font-bold">15+ Heures</span>
                            <span className="text-xs text-muted-foreground italic">Contenu vidéo</span>
                         </div>
                      </div>
                      <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4">
                         <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <MessageCircle className="w-6 h-6" />
                         </div>
                         <div>
                            <span className="block font-bold">Live Q&A</span>
                            <span className="text-xs text-muted-foreground italic">Tous les jeudis</span>
                         </div>
                      </div>
                   </div>
                   <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold">Commencer à regarder</Button>
                </div>
                
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer">
                   <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" 
                    alt="Video Preview" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
