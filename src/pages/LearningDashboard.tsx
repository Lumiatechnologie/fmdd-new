import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Clock, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  ChevronRight,
  LayoutDashboard,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function LearningDashboard() {
  const { t, i18n } = useTranslation();
  const [progressions, setProgressions] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [progRes, badgeRes] = await Promise.all([
        api.get("/progressions"),
        api.get("/profile") // Assuming badges might be in profile or separate endpoint
      ]);
      setProgressions(progRes.data);
      // Mock badges for now if endpoint not ready
      setBadges([
        { id: 1, name: 'Éclaireur', icon: Sparkles, earnedAt: '2024-02-05' },
        { id: 2, name: 'DD Expert', icon: GraduationCap, earnedAt: '2024-01-20' }
      ]);
    } catch (e) {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const ongoing = progressions.filter(p => !p.isCompleted);
  const completed = progressions.filter(p => p.isCompleted);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Mon Espace Apprenant</h1>
              <p className="text-muted-foreground text-lg">Suivez vos formations et vos réussites.</p>
            </div>
            <div className="flex items-center gap-4 bg-card p-2 rounded-2xl border border-border shadow-sm">
               <div className="px-6 py-2 border-r border-border">
                  <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider">Formations</span>
                  <span className="text-2xl font-bold text-primary">{progressions.length}</span>
               </div>
               <div className="px-6 py-2">
                  <span className="block text-xs text-muted-foreground uppercase font-bold tracking-wider">Certificats</span>
                  <span className="text-2xl font-bold text-accent">{completed.length}</span>
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: Ongoing & Completed */}
            <div className="lg:col-span-2 space-y-8">
               {/* Ongoing Formations */}
               <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Play className="w-6 h-6 text-primary fill-primary" />
                      En cours
                    </h2>
                    {ongoing.length > 0 && <span className="text-sm font-bold text-muted-foreground">{ongoing.length} actives</span>}
                  </div>
                  
                  {ongoing.length > 0 ? (
                    <div className="space-y-4">
                      {ongoing.map((prog) => (
                        <motion.div 
                          key={prog.id}
                          whileHover={{ y: -4 }}
                          className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row md:items-center gap-6 group"
                        >
                          <div className="w-full md:w-32 aspect-video rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={prog.formation.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{prog.formation.title}</h3>
                            <div className="flex items-center gap-4 mb-4">
                               <Progress value={prog.progress} className="flex-grow h-2" />
                               <span className="text-sm font-bold">{prog.progress}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  <span>Dernière activité: {new Date(prog.updatedAt).toLocaleDateString()}</span>
                               </div>
                               <Link to={`/academy/${prog.formationId}`}>
                                 <Button size="sm" className="rounded-full font-bold">Continuer</Button>
                               </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-muted/20 border border-dashed border-border rounded-3xl p-12 text-center">
                      <p className="text-muted-foreground">Vous n'avez aucune formation en cours.</p>
                      <Link to="/academy" className="inline-block mt-4 text-primary font-bold hover:underline">Découvrir le catalogue</Link>
                    </div>
                  )}
               </div>

               {/* Completed Formations */}
               <div className="pt-8">
                  <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    Terminées
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                     {completed.map((prog) => (
                       <div key={prog.id} className="bg-card p-5 rounded-2xl border border-border flex items-center gap-4">
                          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm truncate">{prog.formation.title}</h4>
                            <p className="text-xs text-muted-foreground">Certificat obtenu</p>
                          </div>
                          <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Col: Badges & Statistics */}
            <div className="space-y-8">
               {/* Badges Widget */}
               <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Badges & Trophées
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                     {badges.map((badge) => (
                       <div key={badge.id} className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-foreground/50 p-0.5 mb-2 shadow-lg">
                             <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                <badge.icon className="w-8 h-8 text-accent" />
                             </div>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{badge.name}</span>
                       </div>
                     ))}
                     <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted flex items-center justify-center opacity-40">
                        <span className="text-2xl">+</span>
                     </div>
                  </div>
                  <Button variant="outline" className="w-full mt-8 rounded-xl font-bold">Voir tous les badges</Button>
               </div>

               {/* Activity Stats */}
               <div className="bg-primary p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-6">Activité cette semaine</h3>
                    <div className="space-y-4">
                       <div className="flex justify-between text-sm mb-1">
                          <span>Temps d'apprentissage</span>
                          <span className="font-bold">4.5h / 8h</span>
                       </div>
                       <Progress value={55} className="bg-white/20 h-2" />
                       <p className="text-xs text-white/60">Vous êtes dans le top 15% des apprenants cette semaine !</p>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Play } from "lucide-react";
