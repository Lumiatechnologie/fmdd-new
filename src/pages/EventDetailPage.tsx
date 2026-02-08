import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import api from "@/lib/api";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft,
  Share2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Tag,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { InscriptionDialog } from "@/components/events/InscriptionDialog";
import { Badge } from "@/components/ui/badge";

export default function EventDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(isRTL ? "تم نسخ الرابط بنجاح!" : "Lien copié avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la copie du lien");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-foreground">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-4">{t('pages.events.notFound', { defaultValue: 'Événement non trouvé' })}</h1>
        <Link to="/evenements">
          <Button>{t('pages.events.backToEvents', { defaultValue: 'Retour aux événements' })}</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-US' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/evenements" className="hover:text-primary transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              {t('pages.events.title')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-bold line-clamp-1">{event.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-10">
              {/* Event Header Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft relative group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image_path ? (event.image_path.startsWith('http') ? event.image_path : `http://localhost:8000/${event.image_path}`) : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-sm py-1 px-4 rounded-full">
                      {t(`common.categories.${event.category}`, { defaultValue: event.category || 'Career' })}
                    </Badge>
                    {event.isFree && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground text-sm py-1 px-4 rounded-full">
                        {t('pages.events.free')}
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight">
                    {event.title}
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t('common.date', { defaultValue: 'Date' })}</p>
                        <p className="font-semibold">{formatDate(event.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t('common.time', { defaultValue: 'Heure' })}</p>
                        <p className="font-semibold">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t('common.location', { defaultValue: 'Lieu' })}</p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t('pages.events.attendees')}</p>
                        <p className="font-semibold">{ (event.inscriptions_count || 0).toLocaleString()} Participants</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Event Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-soft"
              >
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <Tag className="w-6 h-6 text-primary" />
                  {t('pages.events.details', { defaultValue: 'À propos de cet événement' })}
                </h2>
                <div className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                    {event.description}
                  </div>
                </div>

                {/* Specific Domains Mentioned by User */}
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="text-xl font-bold mb-6 text-foreground">🚀 Domaines & Opportunités</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "IT & Développement",
                      "Ressources Humaines",
                      "Gestion & Management",
                      "Marketing & Communication",
                      "Finance & Comptabilité"
                    ].map((d, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span className="font-medium">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Registration CTA Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 sticky top-24"
              >
                <div className="space-y-6 text-center lg:text-left">
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <span className="text-primary-foreground/60 text-sm font-bold uppercase tracking-widest block mb-1">
                      {event.isFree ? t('pages.events.free') : t('common.price', { defaultValue: 'Accès' })}
                    </span>
                    <div className="text-4xl font-display font-bold flex items-center gap-2">
                       {event.price ? `${event.price} ${t('common.currency')}` : "Gratuit"}
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  <div className="space-y-4">
                     <p className="text-sm text-primary-foreground/80 leading-relaxed font-medium">
                       Rejoignez-nous pour le Job Day IFIAG et boostez votre carrière professionnelle.
                     </p>
                  </div>

                  <InscriptionDialog 
                    eventId={String(event.id)} 
                    eventTitle={event.title}
                    trigger={
                      <Button 
                        variant="accent" 
                        size="lg" 
                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-transform hover:scale-[1.02]"
                      >
                        {t('pages.events.registerNow')}
                      </Button>
                    }
                  />
                  
                  <Button 
                    variant="ghost" 
                    className="w-full h-12 text-white hover:bg-white/10 gap-2 font-bold"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                    {t('common.share', { defaultValue: 'Partager' })}
                  </Button>
                </div>
              </motion.div>

              {/* Location Widget */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-soft">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5 text-accent" />
                  Localisation
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  L'événement se déroulera physiquement à l'IFIAG Casablanca. Nos équipes vous attendent pour l'accueil dès 15h00.
                </p>
                <Link to="/contact">
                   <Button variant="outline" className="w-full rounded-xl hover:bg-primary hover:text-white transition-all font-bold">
                      {t('nav.contact')}
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
