import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  Header 
} from "@/components/layout/Header";
import { 
  Footer 
} from "@/components/layout/Footer";
import api from "@/lib/api";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Building, 
  Globe, 
  Calendar,
  Share2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function JobDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJob();
    checkApplicationStatus();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      toast.error("Failed to load job offer");
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      // Logic to check if user already applied
      // For now we'll fetch from a dashboard endpoint if exists
    } catch (e) { /* ignore */ }
  };

  const handleApply = async () => {
    if (!localStorage.getItem('token')) {
      toast.error("Veuillez vous connecter pour postuler");
      return;
    }
    try {
      await api.post(`/jobs/${id}/apply`);
      setHasApplied(true);
      toast.success("Candidature envoyée avec succès !");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erreur lors de la candidature");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-4">Offre non trouvée</h1>
        <Link to="/insertion">
          <Button>Retour aux offres</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/insertion" className="hover:text-primary transition-colors font-medium">Insertion Pro</Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-bold">{job.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">
              {/* Job Header Card */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-soft relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-3xl font-bold font-display shadow-lg group-hover:rotate-3 transition-transform">
                    {job.company?.[0]}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-display font-bold text-foreground">{job.title}</h1>
                      <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span>Posté il y a {Math.floor(Math.random() * 5) + 1}j</span>
                      </div>
                      {job.isRemote && (
                         <div className="flex items-center gap-2 text-success font-medium">
                            <Globe className="w-5 h-5" />
                            <span>Télétravail</span>
                         </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-3">
                   {job.skills?.split(',').map((skill: string) => (
                     <span key={skill} className="px-3 py-1.5 rounded-xl bg-muted text-sm font-medium text-muted-foreground border border-border">
                        {skill.trim()}
                     </span>
                   ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card p-10 rounded-3xl border border-border shadow-soft space-y-8">
                <section>
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Description du poste
                  </h2>
                  <div className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>
                </section>

                <section className="pt-8 border-t border-border">
                  <h2 className="text-2xl font-display font-bold mb-6">Missions principales</h2>
                  <ul className="grid gap-4">
                    {["Participer à la mise en œuvre de la stratégie", "Assurer le suivi opérationnel", "Analyser les indicateurs de performance"].map((m, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </div>
                        <span className="text-lg text-muted-foreground">{m}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Application CTA Card */}
              <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <span className="text-primary-foreground/60 text-sm font-bold uppercase tracking-widest block mb-2">Salaire proposé</span>
                    <div className="text-4xl font-display font-bold flex items-center gap-2">
                       <DollarSign className="w-8 h-8" />
                       {job.salary || "A discuter"}
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="space-y-4">
                     <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/60">Type de contrat</span>
                        <span className="font-bold">{job.type}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/60">Durée</span>
                        <span className="font-bold">{job.duration || "N/A"}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-primary-foreground/60">Catégorie</span>
                        <span className="font-bold">{job.category || "Général"}</span>
                     </div>
                  </div>

                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.02]"
                    onClick={handleApply}
                    disabled={hasApplied}
                  >
                    {hasApplied ? "Candidature envoyée" : "Postuler maintenant"}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full h-12 text-white hover:bg-white/10 gap-2 font-bold"
                  >
                    <Share2 className="w-5 h-5" />
                    Partager l'offre
                  </Button>
                </div>
              </div>

              {/* Interview Prep Widget */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-soft group hover:border-primary transition-colors">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Préparez votre entretien
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Augmentez vos chances en consultant nos guides et simulations d'entretien.
                </p>
                <Link to="/interview-prep">
                   <Button variant="outline" className="w-full rounded-xl hover:bg-primary hover:text-white transition-all font-bold group-hover:translate-y-1">
                      Accéder aux ressources
                   </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { ChevronRight } from "lucide-react";
