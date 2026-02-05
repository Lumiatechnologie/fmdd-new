import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Header 
} from "@/components/layout/Header";
import { 
  Footer 
} from "@/components/layout/Footer";
import api from "@/lib/api";
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  HelpCircle,
  Trophy,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function CourseDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/formations/${id}`);
      setCourse(response.data);
      
      // Fetch user progress if logged in
      try {
        const progressRes = await api.get("/progressions");
        const currentProg = progressRes.data.find((p: any) => p.formationId === id);
        if (currentProg) {
          // Simplification: logic to determine active module based on percentage
          // In a real app, we'd store exact module progress
        }
      } catch (e) { /* ignore if not logged in */ }
      
    } catch (error) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleModuleComplete = async () => {
    const activeModule = course.modules[activeModuleIndex];
    if (!completedModules.includes(activeModule.id)) {
      const newCompleted = [...completedModules, activeModule.id];
      setCompletedModules(newCompleted);
      
      // Update progress on backend
      const progressPercent = Math.round((newCompleted.length / course.modules.length) * 100);
      try {
        await api.post(`/formations/${id}/progress`, { progress: progressPercent });
      } catch (e) { console.error("Failed to sync progress"); }
    }

    if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else {
      toast.success("Félicitations ! Vous avez terminé tous les modules.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-4">Formation non trouvée</h1>
        <Link to="/academy">
          <Button>Retour à l'académie</Button>
        </Link>
      </div>
    );
  }

  const activeModule = course.modules[activeModuleIndex];
  const progress = Math.round((completedModules.length / course.modules.length) * 100);

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/academy" className="hover:text-primary transition-colors">Academy</Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="font-medium text-foreground line-clamp-1">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Media Player Container */}
              <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                {activeModule.content?.startsWith('http') ? (
                  <iframe 
                    src={activeModule.content} 
                    className="w-full h-full" 
                    allowFullScreen 
                    title={activeModule.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-12 text-center">
                    <FileText className="w-20 h-20 mb-6 opacity-20" />
                    <h3 className="text-2xl font-bold mb-4">{activeModule.title}</h3>
                    <p className="text-white/60 max-w-md">{activeModule.content || "Ce module contient du texte et des ressources à lire."}</p>
                  </div>
                )}
              </div>

              {/* Module Info */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">
                      Module {activeModuleIndex + 1}
                    </span>
                    <h1 className="text-3xl font-display font-bold">{activeModule.title}</h1>
                  </div>
                  <div className="flex items-center gap-4">
                    {progress === 100 && (
                      <Button variant="accent" className="rounded-full gap-2 px-6 shadow-glow animate-pulse">
                        <Award className="w-5 h-5" />
                        Télécharger mon certificat
                      </Button>
                    )}
                    <Button size="lg" className="rounded-full px-8" onClick={handleModuleComplete}>
                      {activeModuleIndex === course.modules.length - 1 ? "Terminer la formation" : "Module suivant"}
                    </Button>
                  </div>
                </div>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     Cette section vous guidera à travers les concepts clés du module. 
                     N'oubliez pas de consulter les ressources complémentaires et de passer le quiz final.
                   </p>
                </div>
              </div>

              {/* Quiz Section (Placeholder logic) */}
              {activeModule.quizzes?.length > 0 && (
                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <HelpCircle className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Quiz de validation</h2>
                  </div>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Testez vos connaissances sur ce module avant de passer à la suite.
                  </p>
                  <Button variant="outline" className="h-12 px-8 font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    Démarrer le quiz
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar: Navigation & Progress */}
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Votre progression
                  </h3>
                  <span className="text-sm font-bold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {completedModules.length} sur {course.modules.length} modules terminés
                </p>
              </div>

              {/* Modules List */}
              <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border bg-muted/30">
                  <h3 className="font-bold">Contenu de la formation</h3>
                </div>
                <div className="divide-y divide-border">
                  {course.modules.map((mod: any, index: number) => (
                    <button
                      key={mod.id}
                      onClick={() => setActiveModuleIndex(index)}
                      className={`w-full p-5 text-left flex items-center gap-4 transition-colors hover:bg-muted/50 ${
                        activeModuleIndex === index ? "bg-primary/5 text-primary" : ""
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        completedModules.includes(mod.id) 
                          ? "bg-success/10 border-success text-success" 
                          : activeModuleIndex === index 
                            ? "bg-primary border-primary text-white" 
                            : "bg-muted border-border text-muted-foreground"
                      }`}>
                        {completedModules.includes(mod.id) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className={`font-bold text-sm truncate ${activeModuleIndex === index ? "text-primary" : "text-foreground"}`}>
                          {mod.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
                           <PlayCircle className="w-3 h-3" />
                           <span>VIDEO • 12:45</span>
                        </div>
                      </div>
                    </button>
                  ))}
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
