import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Clock, Users, Award, Play, BookOpen, TrendingUp, Search, Filter, ChevronRight, Sparkles, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AcademyPage() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    domain: "",
    level: "",
    isPaid: "all",
  });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.title = "FMDD Academy - Formations Certifiantes au Maroc | Développement Durable";
    fetchCourses();
    fetchRecommendations();
  }, [filters.domain, filters.level, filters.isPaid]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/formations", { 
        params: { 
          search: filters.search,
          domain: filters.domain,
          level: filters.level,
          isPaid: filters.isPaid === "all" ? undefined : filters.isPaid
        } 
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await api.get("/formations");
      const profileRes = await api.get("/profile");
      const userSkills = (profileRes.data.skills || "").toLowerCase().split(',').map((s: string) => s.trim());
      
      const suggested = response.data.filter((c: any) => 
        userSkills.some((skill: string) => c.title.toLowerCase().includes(skill) || c.description.toLowerCase().includes(skill))
      ).slice(0, 3);
      
      setRecommendations(suggested);
    } catch (e) { /* ignore */ }
  };

  const categories = [
    { id: "Environnement", name: "Développement Durable", icon: TrendingUp },
    { id: "Business", name: "Business & Entrepreneuriat", icon: BookOpen },
    { id: "Soft Skills", name: "Soft Skills", icon: Users },
    { id: "Digital", name: "Compétences Numériques", icon: GraduationCap },
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main itemScope itemType="https://schema.org/EducationalOrganization">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">
                  FMDD Academy
                </span>
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                Formez-vous aux métiers de <span className="text-accent">demain</span>
              </h1>
              
              <div className="max-w-2xl mx-auto mt-10">
                <div className="relative">
                  <Search className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5`} />
                  <Input 
                    placeholder={t("common.search")} 
                    className={`h-14 ${isRTL ? "pr-12" : "pl-12"} bg-white/95 backdrop-blur-sm border-none shadow-xl text-lg`}
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    onKeyDown={(e) => e.key === 'Enter' && fetchCourses()}
                  />
                  <Button 
                    className={`absolute ${isRTL ? "left-2" : "right-2"} top-2 bg-primary text-primary-foreground px-6`}
                    onClick={fetchCourses}
                  >
                    {t("common.search")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Personalized Recommendations */}
        {recommendations.length > 0 && (
          <section className="py-12 bg-muted/30 border-b border-border overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Parcours Recommandé</h2>
                  <p className="text-sm text-muted-foreground">Basé sur votre profil et vos compétences</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.map((course, idx) => (
                  <motion.div
                    key={`rec-${course.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card p-4 rounded-2xl border border-accent/20 shadow-sm flex items-center gap-4 group hover:border-accent transition-colors transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={course.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{course.title}</h3>
                      <Link to={`/academy/${course.id}`} className="text-xs text-accent font-bold flex items-center gap-1 mt-1">
                        Démarrer <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter Bar */}
        <section className="py-8 bg-card border-b border-border sticky top-20 z-40 shadow-sm bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  variant={filters.domain === "" ? "default" : "outline"} 
                  onClick={() => setFilters({...filters, domain: ""})}
                  className="rounded-full"
                >
                  Tout
                </Button>
                {categories.map((cat) => (
                  <Button 
                    key={cat.id}
                    variant={filters.domain === cat.id ? "default" : "outline"}
                    onClick={() => setFilters({...filters, domain: cat.id})}
                    className="rounded-full gap-2"
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <Select value={filters.level} onValueChange={(val) => setFilters({...filters, level: val})}>
                  <SelectTrigger className="w-[140px] rounded-full">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="Débutant">Débutant</SelectItem>
                    <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                    <SelectItem value="Avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.isPaid} onValueChange={(val) => setFilters({...filters, isPaid: val})}>
                  <SelectTrigger className="w-[140px] rounded-full">
                    <SelectValue placeholder="Prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="false">Gratuit</SelectItem>
                    <SelectItem value="true">Payant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Listing */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-muted animate-pulse rounded-2xl h-[400px]" />
                ))}
              </div>
            ) : courses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-border group cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.image || `https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=250&fit=crop`}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                      />
                      <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} flex gap-2`}>
                        <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                          {course.category}
                        </span>
                        {course.isPaid ? (
                          <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase">Pro</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-success text-white text-[10px] font-bold uppercase">Gratuit</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">{course.level}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration || '8h'}</span>
                        </div>
                      </div>
                      
                      <Link to={`/academy/${course.id}`}>
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                          {course.title}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mb-8 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex items-center gap-1 text-primary font-display font-bold text-xl">
                          {course.isPaid ? `${course.price || 499} DH` : "Gratuit"}
                        </div>
                        <Link to={`/academy/${course.id}`}>
                          <Button variant="ghost" className="gap-2 p-0 h-auto font-bold text-primary group-hover:translate-x-1 transition-transform">
                            {t("common.learnMore")} 
                            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-muted/20 rounded-3xl border border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Aucune formation trouvée</h3>
                <p className="text-muted-foreground mb-8">Essayez de modifier vos filtres ou votre recherche.</p>
                <Button 
                  variant="outline" 
                  className="rounded-full px-8" 
                  onClick={() => setFilters({search: "", domain: "", level: "all", isPaid: "all"})}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}