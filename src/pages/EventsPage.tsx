import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ArrowRight, CalendarDays } from "lucide-react";
import { InscriptionDialog } from "@/components/events/InscriptionDialog";

const EventsPage = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("upcoming");
    const [dbEvents, setDbEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setDbEvents(response.data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const upcomingEvents = dbEvents.filter(e => {
        const eventDate = new Date(e.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
    });

    const pastEvents = dbEvents.filter(e => {
        const eventDate = new Date(e.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate < today;
    });

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-US' : 'fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    const getCategoryLabel = (category: string) => {
      return t(`common.categories.${category}`, { defaultValue: category });
    };

    const EventCard = ({ event, isPast = false }: { event: any, isPast?: boolean }) => (
      <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${isPast ? 'opacity-75' : ''}`}>
        <Link to={`/evenements/${event.id}`} className="relative h-48 overflow-hidden block">
           <img
             src={event.image_path ? (event.image_path.startsWith('http') ? event.image_path : `http://localhost:8000/${event.image_path}`) : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
             alt={event.title}
             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
           />
          <div className={`absolute top-4 ${i18n.language === 'ar' ? 'right-4' : 'left-4'} flex gap-2`}>
             <Badge variant="secondary" className="bg-primary text-primary-foreground">
               {getCategoryLabel(event.category || 'career')}
             </Badge>
            {event.isFree && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {t('pages.events.free')}
              </Badge>
            )}
          </div>
          {isPast && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="outline" className="bg-white/90 text-foreground border-none text-lg px-4 py-2">
                {t('pages.events.ended')}
              </Badge>
            </div>
          )}
        </Link>
        <CardContent className="p-6">
          <Link to={`/evenements/${event.id}`}>
            <h3 className={`font-display text-lg font-bold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
              {event.title}
            </h3>
          </Link>
          <p className={`text-sm text-muted-foreground mb-4 line-clamp-2 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            {event.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className={`flex items-center gap-2 text-sm text-muted-foreground ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(event.date)}{event.endDate && ` - ${formatDate(event.endDate)}`}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm text-muted-foreground ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm text-muted-foreground ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.location}</span>
            </div>
             <div className={`flex items-center gap-2 text-sm text-muted-foreground ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Users className="w-4 h-4 text-primary" />
                 <span>{ (event.inscriptions_count || 0).toLocaleString()} {t('pages.events.attendees')}</span>
             </div>
          </div>

          {!isPast && (
            <div className={`flex items-center justify-between ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              {event.price && (
                <span className="font-bold text-primary">
                  {i18n.language === 'ar' ? `${event.price} ${t('common.currency')}` : `${event.price} ${t('common.currency')}`}
                </span>
              )}
              <InscriptionDialog 
                 eventId={String(event.id)} 
                 eventTitle={event.title}
                 trigger={
                   <Button variant={event.isFree ? "accent" : "default"} className={`${i18n.language === 'ar' ? 'mr-auto' : 'ml-auto'} gap-2`}>
                     {t('pages.events.registerNow')}
                     <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
                   </Button>
                 }
               />
            </div>
          )}
        </CardContent>
      </Card>
    );

    return (
      <div className="min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent border-accent/30">
                  <CalendarDays className={`w-4 h-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('pages.events.title')}
                </Badge>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {t('pages.events.title')}
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                  {t('pages.events.subtitle')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Events Tabs */}
          <section className="py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="upcoming" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('pages.events.upcoming')} ({upcomingEvents.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="gap-2">
                    <Clock className="w-4 h-4" />
                    {t('pages.events.past')} ({pastEvents.length})
                  </TabsTrigger>
                </TabsList>

                 <TabsContent value="upcoming">
                   {loading ? (
                     <div className="text-center py-20 text-muted-foreground">{t('pages.events.loading')}</div>
                   ) : upcomingEvents.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {upcomingEvents.map((event, index) => (
                         <motion.div
                           key={event.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.1 }}
                         >
                           <EventCard event={event} />
                         </motion.div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-20 text-muted-foreground">{t('pages.events.noUpcoming')}</div>
                   )}
                 </TabsContent>
   
                 <TabsContent value="past">
                    {loading ? (
                      <div className="text-center py-20 text-muted-foreground">{t('pages.events.loading')}</div>
                    ) : pastEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastEvents.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <EventCard event={event} isPast />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 text-muted-foreground">{t('pages.events.noPast')}</div>
                    )}
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t('pages.events.newsletterTitle')}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('pages.events.newsletterSub')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  placeholder={t('pages.events.newsletterEmailPlaceholder')}
                  className={`flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary w-full sm:w-auto sm:flex-1 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                />
                <Button variant="accent" size="lg">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
};

export default EventsPage;