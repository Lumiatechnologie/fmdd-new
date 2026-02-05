import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Building, Search, Filter, TrendingUp, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function InsertionPage() {
  const { t, i18n } = useTranslation();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    search: "",
    location: "",
  });
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    isRemote: "all"
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.title = "Insertion Pro - Emploi et Recrutement au Maroc | FMDD";
    fetchJobs();
    fetchRecommendations();
  }, [searchParams, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/jobs", { 
        params: { 
          search: searchParams.search,
          location: searchParams.location,
          type: filters.type === "all" ? undefined : filters.type,
          category: filters.category === "all" ? undefined : filters.category,
          isRemote: filters.isRemote === "all" ? undefined : filters.isRemote === "true"
        } 
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const res = await api.get("/jobs/recommended");
      setRecommendations(res.data);
    } catch (e) { /* ignore */ }
  };

  const handleApply = async (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!localStorage.getItem('token')) {
      toast.error("Veuillez vous connecter pour postuler");
      return;
    }
    try {
      await api.post(`/jobs/${jobId}/apply`);
      toast.success("Candidature envoyée avec succès !");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Erreur lors de la candidature");
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main itemScope itemType="https://schema.org/WebPage">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 font-bold shadow-soft animate-pulse">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">
                   Le futur de l'emploi durable au Maroc
                </span>
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-primary-foreground mb-8 leading-tight">
                Découvrez votre <span className="text-accent">prochain défi</span>
              </h1>
              
              {/* Search Bar */}
              <div className="max-w-4xl mx-auto mt-12 bg-white/95 backdrop-blur-md rounded-[2.5rem] p-4 shadow-2xl border border-white/20">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className={`absolute ${isRTL ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 text-primary w-5 h-5`} />
                    <Input 
                      placeholder="Recrutement, Stage PFE..."
                      className={`h-16 border-none bg-muted/30 rounded-2xl text-lg font-medium ${isRTL ? "pr-14" : "pl-14"}`}
                      value={searchParams.search}
                      onChange={(e) => setSearchParams({...searchParams, search: e.target.value})}
                    />
                  </div>
                  <div className="relative flex-1">
                    <MapPin className={`absolute ${isRTL ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 text-primary w-5 h-5`} />
                    <Input 
                      placeholder="Ville (Marrakech, Rabat...)"
                      className={`h-16 border-none bg-muted/30 rounded-2xl text-lg font-medium ${isRTL ? "pr-14" : "pl-14"}`}
                      value={searchParams.location}
                      onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                    />
                  </div>
                  <Button variant="accent" size="lg" className="h-16 px-12 rounded-2xl text-lg font-bold shadow-glow" onClick={() => fetchJobs()}>
                    Chercher
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Personalized Matching Section */}
        {recommendations.length > 0 && (
           <section className="py-12 bg-muted/30 border-y border-border">
              <div className="container mx-auto px-4 lg:px-8">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center">
                       <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-bold">Matching Intelligent (IA)</h2>
                       <p className="text-muted-foreground font-medium">Offres basées sur vos compétences</p>
                    </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map(job => (
                      <Link to={`/insertion/${job.id}`} key={job.id}>
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-card p-6 rounded-3xl border border-primary/20 shadow-sm shadow-primary/5 group"
                        >
                           <div className="flex justify-between items-start mb-4">
                              <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded-full tracking-wider">
                                 {job.score > 1 ? "Top Match" : "Recommandé"}
                              </span>
                              <span className="text-xs text-muted-foreground">{job.type}</span>
                           </div>
                           <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{job.title}</h4>
                           <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{job.company}</p>
                           <div className="flex items-center gap-2 text-xs font-bold text-primary">
                              Postuler <ChevronRight className="w-3 h-3" />
                           </div>
                        </motion.div>
                      </Link>
                    ))}
                 </div>
              </div>
           </section>
        )}

        {/* Job Listings with filters */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
              <h2 className="text-4xl font-display font-bold text-foreground">
                Opportunités <span className="text-primary italic">récentes</span>
              </h2>
              
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-4">
                 <select 
                    className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium focus:ring-2 ring-primary outline-none"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="all">Tous types</option>
                    <option value="CDI">CDI</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                 </select>

                 <select 
                    className="h-11 px-4 rounded-xl border border-border bg-card text-sm font-medium focus:ring-2 ring-primary outline-none"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="all">Tous domaines</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Tech">Tech</option>
                    <option value="Business">Business</option>
                 </select>

                 <Button 
                    variant={filters.isRemote === "true" ? "accent" : "outline"} 
                    className="rounded-xl font-bold h-11"
                    onClick={() => setFilters({...filters, isRemote: filters.isRemote === "true" ? "all" : "true"})}
                  >
                    Télétravail
                 </Button>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-muted animate-pulse rounded-[2rem] h-40" />
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <Link to={`/insertion/${job.id}`} key={job.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-[2rem] p-8 shadow-soft hover:shadow-glow transition-all border border-border group relative overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-primary font-bold text-3xl shrink-0 group-hover:scale-105 transition-transform">
                          {job.company?.[0]}
                        </div>
                      
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                              {job.type}
                            </span>
                            {job.isRemote && (
                              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Remote
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                            <span className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-primary" />
                              {job.company}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              Il y a {Math.floor(Math.random() * 5) + 1}j
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.skills?.split(',').map((skill: string) => (
                              <span key={skill} className="px-3 py-1.5 rounded-xl bg-muted/50 text-xs font-medium text-muted-foreground border border-border">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                      <div className="flex flex-col sm:items-end justify-between self-stretch gap-6">
                        <span className="text-3xl font-bold text-foreground tracking-tight">{job.salary || "A discuter"}</span>
                        <div className="flex gap-3">
                           <Button 
                              variant="outline"
                              className="rounded-xl px-6 h-12 font-bold group-hover:bg-primary group-hover:text-white transition-all"
                           >
                             Voir l'offre
                           </Button>
                           <Button 
                              onClick={(e) => handleApply(job.id, e)}
                              className="w-full sm:w-auto px-10 h-12 transition-all hover:scale-105 rounded-xl font-bold shadow-glow"
                           >
                              Postuler
                           </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                ))
              ) : (
                <div className="text-center py-20 text-muted-foreground">
                  Aucune offre trouvée pour vos critères.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}