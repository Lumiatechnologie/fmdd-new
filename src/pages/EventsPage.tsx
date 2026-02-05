 import { useState } from "react";
 import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion";
 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { Card, CardContent, CardHeader } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Calendar, MapPin, Clock, Users, ArrowRight, CalendarDays } from "lucide-react";
 
 const events = [
   {
     id: 1,
     title: "Forum National de l'Emploi des Jeunes 2025",
     description: "Le plus grand événement de recrutement au Maroc réunissant 100+ entreprises et 5000+ candidats. Ateliers CV, simulations d'entretien et offres d'emploi en direct.",
     date: "2025-03-15",
     endDate: "2025-03-17",
     time: "09:00 - 18:00",
     location: "Palais des Congrès, Marrakech",
     category: "career",
     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
     attendees: 5000,
     isFree: true,
     status: "upcoming"
   },
   {
     id: 2,
     title: "Masterclass IA & Transformation Digitale",
     description: "Formation intensive sur l'intelligence artificielle et son application dans les entreprises marocaines. Intervenants internationaux et locaux.",
     date: "2025-02-20",
     time: "14:00 - 18:00",
     location: "FMDD Academy, Casablanca",
     category: "training",
     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
     attendees: 150,
     price: 500,
     status: "upcoming"
   },
   {
     id: 3,
     title: "Demo Day Startups FMDD - Édition Printemps",
     description: "15 startups issues de notre programme d'incubation présentent leurs projets devant un jury d'investisseurs et de mentors.",
     date: "2025-04-10",
     time: "18:00 - 21:00",
     location: "Technopark, Rabat",
     category: "entrepreneurship",
     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
     attendees: 300,
     isFree: true,
     status: "upcoming"
   },
   {
     id: 4,
     title: "Atelier Leadership Féminin",
     description: "Programme dédié aux femmes entrepreneures et cadres. Développement personnel, networking et mentorat.",
     date: "2025-02-28",
     time: "09:00 - 17:00",
     location: "Sofitel, Rabat",
     category: "training",
     image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
     attendees: 80,
     price: 300,
     status: "upcoming"
   },
   {
     id: 5,
     title: "Cérémonie de Remise des Diplômes 2024",
     description: "Célébration des 800 lauréats des programmes FMDD Academy. Présence de ministres et partenaires institutionnels.",
     date: "2024-12-15",
     time: "16:00 - 20:00",
     location: "Théâtre Mohammed V, Rabat",
     category: "ceremony",
     image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
     attendees: 1200,
     isFree: true,
     status: "past"
   },
   {
     id: 6,
     title: "Hackathon Green Tech Maroc",
     description: "48h pour créer des solutions technologiques pour le développement durable. Prix total de 100,000 MAD.",
     date: "2024-11-22",
     endDate: "2024-11-24",
     time: "Toute la journée",
     location: "1337 Coding School, Khouribga",
     category: "entrepreneurship",
     image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
     attendees: 200,
     isFree: true,
     status: "past"
   }
 ];
 
 const categoryLabels: Record<string, Record<string, string>> = {
   career: { fr: "Emploi", ar: "التوظيف", en: "Career" },
   training: { fr: "Formation", ar: "تكوين", en: "Training" },
   entrepreneurship: { fr: "Entrepreneuriat", ar: "ريادة الأعمال", en: "Entrepreneurship" },
   ceremony: { fr: "Cérémonie", ar: "حفل", en: "Ceremony" }
 };
 
 const EventsPage = () => {
   const { t, i18n } = useTranslation();
   const [activeTab, setActiveTab] = useState("upcoming");
 
   const upcomingEvents = events.filter(e => e.status === "upcoming");
   const pastEvents = events.filter(e => e.status === "past");
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-US' : 'fr-FR', {
       day: 'numeric',
       month: 'long',
       year: 'numeric'
     });
   };
 
   const getCategoryLabel = (category: string) => {
     return categoryLabels[category]?.[i18n.language] || categoryLabels[category]?.fr || category;
   };
 
   const EventCard = ({ event, isPast = false }: { event: typeof events[0], isPast?: boolean }) => (
     <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${isPast ? 'opacity-75' : ''}`}>
       <div className="relative h-48 overflow-hidden">
         <img
           src={event.image}
           alt={event.title}
           className="w-full h-full object-cover"
         />
         <div className="absolute top-4 left-4 flex gap-2">
           <Badge variant="secondary" className="bg-primary text-primary-foreground">
             {getCategoryLabel(event.category)}
           </Badge>
           {event.isFree && (
             <Badge variant="secondary" className="bg-accent text-accent-foreground">
               {i18n.language === 'ar' ? 'مجاني' : i18n.language === 'en' ? 'Free' : 'Gratuit'}
             </Badge>
           )}
         </div>
         {isPast && (
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <Badge variant="outline" className="bg-white/90 text-foreground border-none text-lg px-4 py-2">
               {i18n.language === 'ar' ? 'انتهى' : i18n.language === 'en' ? 'Ended' : 'Terminé'}
             </Badge>
           </div>
         )}
       </div>
       <CardContent className="p-6">
         <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
           {event.title}
         </h3>
         <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
           {event.description}
         </p>
         
         <div className="space-y-2 mb-4">
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Calendar className="w-4 h-4 text-primary" />
             <span>{formatDate(event.date)}{event.endDate && ` - ${formatDate(event.endDate)}`}</span>
           </div>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Clock className="w-4 h-4 text-primary" />
             <span>{event.time}</span>
           </div>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <MapPin className="w-4 h-4 text-primary" />
             <span>{event.location}</span>
           </div>
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Users className="w-4 h-4 text-primary" />
             <span>{event.attendees.toLocaleString()} {i18n.language === 'ar' ? 'مشارك' : i18n.language === 'en' ? 'attendees' : 'participants'}</span>
           </div>
         </div>
 
         {!isPast && (
           <div className="flex items-center justify-between">
             {event.price && (
               <span className="font-bold text-primary">{event.price} MAD</span>
             )}
             <Button variant={event.isFree ? "accent" : "default"} className="ml-auto gap-2">
               {i18n.language === 'ar' ? 'سجل الآن' : i18n.language === 'en' ? 'Register Now' : "S'inscrire"}
               <ArrowRight className="w-4 h-4" />
             </Button>
           </div>
         )}
       </CardContent>
     </Card>
   );
 
   return (
     <div className="min-h-screen bg-background">
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
                 <CalendarDays className="w-4 h-4 mr-2" />
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
               </TabsContent>
 
               <TabsContent value="past">
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
               </TabsContent>
             </Tabs>
           </div>
         </section>
 
         {/* Newsletter CTA */}
         <section className="py-16 bg-muted/50">
           <div className="container mx-auto px-4 lg:px-8 text-center">
             <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
               {i18n.language === 'ar' ? 'لا تفوت أي حدث' : i18n.language === 'en' ? "Don't Miss Any Event" : 'Ne manquez aucun événement'}
             </h2>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
               {i18n.language === 'ar' 
                 ? 'اشترك في نشرتنا الإخبارية لتلقي تنبيهات الأحداث والدعوات الحصرية.'
                 : i18n.language === 'en'
                 ? 'Subscribe to our newsletter to receive event alerts and exclusive invitations.'
                 : 'Inscrivez-vous à notre newsletter pour recevoir les alertes événements et invitations exclusives.'}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
               <input
                 type="email"
                 placeholder={i18n.language === 'ar' ? 'بريدك الإلكتروني' : i18n.language === 'en' ? 'Your email' : 'Votre email'}
                 className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
               />
               <Button variant="accent" size="lg">
                 {i18n.language === 'ar' ? 'اشترك' : i18n.language === 'en' ? 'Subscribe' : "S'abonner"}
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