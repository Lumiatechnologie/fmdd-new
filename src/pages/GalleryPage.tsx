 import { useState } from "react";
 import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion";
 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Play, Image, X, Calendar, MapPin } from "lucide-react";
 
 const galleryItems = [
   {
     id: 1,
     type: "image",
     category: "events",
     title: "Cérémonie de remise des diplômes 2024",
     description: "Plus de 500 lauréats célèbrent leur réussite",
     image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
     date: "2024-06-15",
     location: "Rabat"
   },
   {
     id: 2,
     type: "image",
     category: "training",
     title: "Formation Marketing Digital",
     description: "Session pratique avec des experts du secteur",
     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
     date: "2024-05-20",
     location: "Casablanca"
   },
   {
     id: 3,
     type: "image",
     category: "entrepreneurship",
     title: "Demo Day Startups FMDD",
     description: "10 startups présentent leurs projets innovants",
     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
     date: "2024-04-10",
     location: "Marrakech"
   },
   {
     id: 4,
     type: "video",
     category: "events",
     title: "Forum Emploi Jeunes 2024",
     description: "Plus de 50 entreprises et 2000 candidats",
     image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
     videoUrl: "https://www.youtube.com/watch?v=example",
     date: "2024-03-25",
     location: "Tanger"
   },
   {
     id: 5,
     type: "image",
     category: "training",
     title: "Atelier Développement Personnel",
     description: "Techniques de leadership et communication",
     image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
     date: "2024-02-18",
     location: "Fès"
   },
   {
     id: 6,
     type: "image",
     category: "community",
     title: "Rencontre Alumni FMDD",
     description: "Networking entre anciens bénéficiaires",
     image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
     date: "2024-01-30",
     location: "Rabat"
   },
   {
     id: 7,
     type: "video",
     category: "entrepreneurship",
     title: "Success Story - GreenTech Maroc",
     description: "De l'idée à la levée de fonds",
     image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
     videoUrl: "https://www.youtube.com/watch?v=example2",
     date: "2024-01-15",
     location: "Casablanca"
   },
   {
     id: 8,
     type: "image",
     category: "community",
     title: "Journée Portes Ouvertes",
     description: "Découverte des programmes FMDD",
     image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
     date: "2023-12-10",
     location: "Agadir"
   }
 ];
 
 const categories = [
   { id: "all", label: { fr: "Tout", ar: "الكل", en: "All" } },
   { id: "events", label: { fr: "Événements", ar: "الفعاليات", en: "Events" } },
   { id: "training", label: { fr: "Formations", ar: "التكوينات", en: "Training" } },
   { id: "entrepreneurship", label: { fr: "Entrepreneuriat", ar: "ريادة الأعمال", en: "Entrepreneurship" } },
   { id: "community", label: { fr: "Communauté", ar: "المجتمع", en: "Community" } }
 ];
 
 const GalleryPage = () => {
   const { t, i18n } = useTranslation();
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
 
   const filteredItems = selectedCategory === "all" 
     ? galleryItems 
     : galleryItems.filter(item => item.category === selectedCategory);
 
   const getCategoryLabel = (category: typeof categories[0]) => {
     return category.label[i18n.language as keyof typeof category.label] || category.label.fr;
   };
 
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
                 <Image className="w-4 h-4 mr-2" />
                 {t('pages.gallery.title')}
               </Badge>
               <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                 {t('pages.gallery.title')}
               </h1>
               <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                 {t('pages.gallery.subtitle')}
               </p>
             </motion.div>
           </div>
         </section>
 
         {/* Category Filter */}
         <section className="py-8 border-b border-border">
           <div className="container mx-auto px-4 lg:px-8">
             <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
               <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto">
                 {categories.map((category) => (
                   <TabsTrigger
                     key={category.id}
                     value={category.id}
                     className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-full"
                   >
                     {getCategoryLabel(category)}
                   </TabsTrigger>
                 ))}
               </TabsList>
             </Tabs>
           </div>
         </section>
 
         {/* Gallery Grid */}
         <section className="py-12">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredItems.map((item, index) => (
                 <motion.div
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <Card 
                     className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                     onClick={() => setSelectedItem(item)}
                   >
                     <div className="relative aspect-square overflow-hidden">
                       <img
                         src={item.image}
                         alt={item.title}
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                       
                       {item.type === "video" && (
                         <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Play className="w-8 h-8 text-accent-foreground fill-current" />
                           </div>
                         </div>
                       )}
 
                       <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                         <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                         <div className="flex items-center gap-3 text-xs text-white/80">
                           <span className="flex items-center gap-1">
                             <Calendar className="w-3 h-3" />
                             {new Date(item.date).toLocaleDateString(i18n.language)}
                           </span>
                           <span className="flex items-center gap-1">
                             <MapPin className="w-3 h-3" />
                             {item.location}
                           </span>
                         </div>
                       </div>
                     </div>
                   </Card>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
       </main>
 
       {/* Lightbox Dialog */}
       <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
         <DialogContent className="max-w-4xl p-0 overflow-hidden">
           <DialogTitle className="sr-only">{selectedItem?.title}</DialogTitle>
           {selectedItem && (
             <div>
               <div className="relative aspect-video">
                 <img
                   src={selectedItem.image}
                   alt={selectedItem.title}
                   className="w-full h-full object-cover"
                 />
                 <Button
                   variant="ghost"
                   size="icon"
                   className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                   onClick={() => setSelectedItem(null)}
                 >
                   <X className="w-5 h-5" />
                 </Button>
               </div>
               <div className="p-6">
                 <h2 className="font-display text-xl font-bold mb-2">{selectedItem.title}</h2>
                 <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                   <span className="flex items-center gap-1">
                     <Calendar className="w-4 h-4" />
                     {new Date(selectedItem.date).toLocaleDateString(i18n.language)}
                   </span>
                   <span className="flex items-center gap-1">
                     <MapPin className="w-4 h-4" />
                     {selectedItem.location}
                   </span>
                 </div>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
 
       <Footer />
     </div>
   );
 };
 
 export default GalleryPage;