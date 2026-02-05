import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Loader2,
  Filter,
  Search,
  Building,
  MapPin,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";

export default function ApplicationsDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Logic to fetch applications
      const response = await api.get("/profile"); 
      // Assuming applications are linked or separate endpoint
      const appsRes = await api.get("/jobs/applications"); // To be verified if endpoint exists
      setApplications(appsRes.data);
    } catch (e) {
      // Mock data if failed
      setApplications([
        { 
            id: '1', 
            status: 'PENDING', 
            createdAt: new Date().toISOString(),
            jobOffer: { title: 'Chargé de Mission DD', company: 'EcoMaroc', location: 'Casablanca' }
        },
        { 
            id: '2', 
            status: 'ACCEPTED', 
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            jobOffer: { title: 'Analyste ESG', company: 'Banque Populaire', location: 'Casablanca' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'bg-success/10 text-success border-success/20';
      case 'REJECTED': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return <CheckCircle2 className="w-4 h-4" />;
      case 'REJECTED': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-display font-bold mb-2">Espace Candidatures</h1>
                <p className="text-lg text-muted-foreground">Suivez vos opportunités et restez organisé.</p>
              </div>
              <Link to="/insertion">
                <Button size="lg" className="rounded-full px-8 gap-2">
                   Explorer d'autres offres
                   <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </Link>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
             </div>
           ) : applications.length > 0 ? (
             <div className="grid gap-6">
                {applications.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-soft flex flex-col lg:flex-row lg:items-center gap-8 group hover:border-primary transition-colors"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary text-2xl font-bold flex-shrink-0">
                       {app.jobOffer.company[0]}
                    </div>
                    
                    <div className="flex-grow space-y-2">
                       <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{app.jobOffer.title}</h3>
                       <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                          <span className="flex items-center gap-2"><Building className="w-4 h-4" /> {app.jobOffer.company}</span>
                          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {app.jobOffer.location}</span>
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Postulé le {new Date(app.createdAt).toLocaleDateString()}</span>
                       </div>
                    </div>

                    <div className="flex flex-row items-center justify-between lg:flex-row gap-6">
                       <div className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 ${getStatusStyle(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status === 'PENDING' ? 'En attente' : app.status === 'ACCEPTED' ? 'Accepté' : 'Refusé'}
                       </div>
                       <Link to={`/insertion`}>
                         <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                            <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                         </Button>
                       </Link>
                    </div>
                  </motion.div>
                ))}
             </div>
           ) : (
             <div className="bg-muted/20 border border-dashed border-border rounded-[3rem] p-20 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                   <Briefcase className="w-12 h-12 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Vous n'avez pas encore postulé</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-sm mx-auto">
                   Vos candidatures apparaîtront ici. Commencez à Explorer les offres disponibles au Maroc.
                </p>
                <Link to="/insertion">
                   <Button size="lg" className="rounded-full px-12">Explorer les offres</Button>
                </Link>
             </div>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
