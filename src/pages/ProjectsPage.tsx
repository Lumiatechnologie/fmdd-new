import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Lightbulb, Users, TrendingUp, ArrowRight, CheckCircle, ChevronRight, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState({
    title: "",
    description: "",
    domain: "",
  });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.title = "Entrepreneuriat au Maroc - Incubateur de Startups | FMDD";
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await api.get("/users/mentors");
      setMentors(response.data);
    } catch (error) {
      console.error("Failed to fetch mentors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiagnosticSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      toast.error("Veuillez vous connecter pour soumettre votre projet");
      return;
    }
    try {
      await api.post("/incubation/diagnostic", diagnosticData);
      toast.success("Candidature envoyée ! Notre équipe analysera votre projet.");
      setShowDiagnostic(false);
      setDiagnosticData({ title: "", description: "", domain: "" });
    } catch (error: any) {
      toast.error("Erreur lors de l'envoi");
    }
  };

  const handleRequestMentoring = async (mentorId: string) => {
    if (!localStorage.getItem('token')) {
      toast.error("Connectez-vous pour demander un mentorat");
      return;
    }
    try {
      await api.post(`/incubation/mentoring/${mentorId}`);
      toast.success("Demande de mentorat envoyée !");
    } catch (error: any) {
      toast.error("Erreur lors de la demande");
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <Rocket className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">
                  Entrepreneuriat
                </span>
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                Créez votre startup <span className="text-accent">au Maroc</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                L'incubateur FMDD accompagne les jeunes entrepreneurs marocains : mentorat, 
                financement et réseau pour transformer vos idées en entreprises prospères.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="accent" size="xl" onClick={() => setShowDiagnostic(true)} className="gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Lancer mon projet
                </Button>
                <Button variant="hero-outline" size="xl">
                  Découvrir l'incubateur
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Diagnostic Modal / Section */}
        <AnimatePresence>
          {showDiagnostic && (
            <motion.section 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 border-b border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto shadow-2xl border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Diagnostic de Projet</CardTitle>
                    <CardDescription>Parlez-nous de votre vision entrepreneuriale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDiagnosticSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Nom de votre projet</label>
                        <Input 
                          placeholder="Ex: EcoMaroc Solutions"
                          value={diagnosticData.title}
                          onChange={(e) => setDiagnosticData({...diagnosticData, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Secteur d'activité</label>
                        <Input 
                          placeholder="Ex: Agriculture, FinTech, IA..."
                          value={diagnosticData.domain}
                          onChange={(e) => setDiagnosticData({...diagnosticData, domain: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Description courte</label>
                        <Textarea 
                          placeholder="Décrivez votre idée en quelques phrases..."
                          className="min-h-[120px]"
                          value={diagnosticData.description}
                          onChange={(e) => setDiagnosticData({...diagnosticData, description: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" type="button" onClick={() => setShowDiagnostic(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" className="gap-2">
                          <Send className="w-4 h-4" />
                          Soumettre le diagnostic
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Mentors Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Nos Mentors Experts
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bénéficiez de l'expérience d'entrepreneurs marocains aguerris
              </p>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-muted animate-pulse rounded-2xl h-64" />
                ))}
              </div>
            ) : mentors.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mentors.map((mentor, index) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      <div className="aspect-square bg-muted relative">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.email}`} 
                          alt={mentor.firstName}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleRequestMentoring(mentor.id)}
                          >
                            Demander un mentorat
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <CardTitle className="text-lg">{mentor.firstName} {mentor.lastName}</CardTitle>
                          <div className="flex items-center gap-1 text-accent">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-bold">4.9</span>
                          </div>
                        </div>
                        <CardDescription className="font-medium text-primary">
                          Expert {mentor.role === "MENTOR" ? "Entrepreneuriat" : "Coach"}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Aucun mentor disponible pour le moment.</p>
            )}
          </div>
        </section>

        {/* Benefits & How it works - Redacted for brevity as they are mostly static */}
      </main>

      <Footer />
    </div>
  );
}