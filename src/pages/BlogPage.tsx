 import { useState } from "react";
 import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion";
 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Calendar, Clock, ArrowRight, Search, Newspaper, TrendingUp, BookOpen, Lightbulb } from "lucide-react";
 
 const blogPosts = [
   {
     id: 1,
     title: "L'IA au service de l'emploi des jeunes au Maroc",
     excerpt: "Comment l'intelligence artificielle transforme le matching entre candidats et recruteurs. Découvrez les innovations FMDD en matière de placement.",
     content: "",
     author: { name: "Dr. Ahmed Bennani", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", role: "Directeur Innovation FMDD" },
     category: "innovation",
     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
     date: "2025-01-28",
     readTime: 8,
     featured: true
   },
   {
     id: 2,
     title: "5 compétences clés pour 2025 sur le marché marocain",
     excerpt: "Analyse des tendances du marché de l'emploi et les compétences les plus recherchées par les recruteurs cette année.",
     content: "",
     author: { name: "Fatima Zahra Alami", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", role: "Responsable Insertion Pro" },
     category: "career",
     image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
     date: "2025-01-22",
     readTime: 6,
     featured: false
   },
   {
     id: 3,
     title: "Success Story : EcoMaroc lève 2M MAD",
     excerpt: "Portrait de Youssef Benali, lauréat de notre programme d'incubation, qui vient de boucler sa première levée de fonds.",
     content: "",
     author: { name: "Sara Idrissi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", role: "Journaliste FMDD" },
     category: "success",
     image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
     date: "2025-01-18",
     readTime: 5,
     featured: true
   },
   {
     id: 4,
     title: "Partenariat FMDD x Ministère de l'Emploi",
     excerpt: "Signature d'une convention pour former 10,000 jeunes aux métiers du digital d'ici 2026.",
     content: "",
     author: { name: "Communication FMDD", avatar: "", role: "Équipe FMDD" },
     category: "news",
     image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
     date: "2025-01-15",
     readTime: 4,
     featured: false
   },
   {
     id: 5,
     title: "Guide complet : Créer sa startup au Maroc en 2025",
     excerpt: "Toutes les étapes, démarches administratives et conseils pour lancer votre entreprise au Maroc.",
     content: "",
     author: { name: "Omar Benjelloun", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100", role: "Expert Entrepreneuriat" },
     category: "guide",
     image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
     date: "2025-01-10",
     readTime: 12,
     featured: false
   },
   {
     id: 6,
     title: "Les formations les plus demandées en 2024",
     excerpt: "Bilan de l'année écoulée : quelles formations ont attiré le plus de candidats et pourquoi.",
     content: "",
     author: { name: "Équipe Academy", avatar: "", role: "FMDD Academy" },
     category: "academy",
     image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
     date: "2025-01-05",
     readTime: 7,
     featured: false
   }
 ];
 
 const categories = [
   { id: "all", label: { fr: "Tous", ar: "الكل", en: "All" }, icon: Newspaper },
   { id: "news", label: { fr: "Actualités", ar: "الأخبار", en: "News" }, icon: TrendingUp },
   { id: "career", label: { fr: "Carrière", ar: "المسار المهني", en: "Career" }, icon: BookOpen },
   { id: "innovation", label: { fr: "Innovation", ar: "الابتكار", en: "Innovation" }, icon: Lightbulb },
   { id: "success", label: { fr: "Success Stories", ar: "قصص نجاح", en: "Success Stories" }, icon: TrendingUp },
   { id: "guide", label: { fr: "Guides", ar: "دلائل", en: "Guides" }, icon: BookOpen }
 ];
 
 const BlogPage = () => {
   const { t, i18n } = useTranslation();
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [searchQuery, setSearchQuery] = useState("");
 
   const filteredPosts = blogPosts.filter(post => {
     const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
     return matchesCategory && matchesSearch;
   });
 
   const featuredPosts = blogPosts.filter(p => p.featured);
 
   const getCategoryLabel = (category: typeof categories[0]) => {
     return category.label[i18n.language as keyof typeof category.label] || category.label.fr;
   };
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString(i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-US' : 'fr-FR', {
       day: 'numeric',
       month: 'long',
       year: 'numeric'
     });
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
                 <Newspaper className="w-4 h-4 mr-2" />
                 {t('pages.blog.title')}
               </Badge>
               <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                 {t('pages.blog.title')}
               </h1>
               <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                 {t('pages.blog.subtitle')}
               </p>
             </motion.div>
           </div>
         </section>
 
         {/* Search & Categories */}
         <section className="py-8 border-b border-border">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
               <div className="relative w-full md:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                 <Input
                   placeholder={t('common.search') + '...'}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-10"
                 />
               </div>
               <div className="flex flex-wrap justify-center gap-2">
                 {categories.map((category) => {
                   const Icon = category.icon;
                   return (
                     <Button
                       key={category.id}
                       variant={selectedCategory === category.id ? "default" : "ghost"}
                       size="sm"
                       onClick={() => setSelectedCategory(category.id)}
                       className="gap-1"
                     >
                       <Icon className="w-4 h-4" />
                       {getCategoryLabel(category)}
                     </Button>
                   );
                 })}
               </div>
             </div>
           </div>
         </section>
 
         {/* Featured Posts */}
         {selectedCategory === "all" && searchQuery === "" && (
           <section className="py-12 bg-muted/30">
             <div className="container mx-auto px-4 lg:px-8">
               <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                 {i18n.language === 'ar' ? 'مقالات مميزة' : i18n.language === 'en' ? 'Featured Articles' : 'Articles à la une'}
               </h2>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {featuredPosts.map((post, index) => (
                   <motion.div
                     key={post.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                   >
                     <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group cursor-pointer">
                       <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                         <div className="relative h-48 md:h-full overflow-hidden">
                           <img
                             src={post.image}
                             alt={post.title}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           />
                           <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                             {i18n.language === 'ar' ? 'مميز' : i18n.language === 'en' ? 'Featured' : 'À la une'}
                           </Badge>
                         </div>
                         <CardContent className="p-6 flex flex-col justify-center">
                           <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                             {post.title}
                           </h3>
                           <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                             {post.excerpt}
                           </p>
                           <div className="flex items-center gap-3 mb-4">
                             <Avatar className="w-8 h-8">
                               <AvatarImage src={post.author.avatar} />
                               <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                             </Avatar>
                             <div className="text-xs">
                               <p className="font-medium text-foreground">{post.author.name}</p>
                               <p className="text-muted-foreground">{post.author.role}</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-4 text-xs text-muted-foreground">
                             <span className="flex items-center gap-1">
                               <Calendar className="w-3 h-3" />
                               {formatDate(post.date)}
                             </span>
                             <span className="flex items-center gap-1">
                               <Clock className="w-3 h-3" />
                               {post.readTime} min
                             </span>
                           </div>
                         </CardContent>
                       </div>
                     </Card>
                   </motion.div>
                 ))}
               </div>
             </div>
           </section>
         )}
 
         {/* All Posts */}
         <section className="py-12">
           <div className="container mx-auto px-4 lg:px-8">
             <h2 className="font-display text-2xl font-bold text-foreground mb-8">
               {t('pages.blog.recentPosts')}
             </h2>
             
             {filteredPosts.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">
                   {i18n.language === 'ar' ? 'لا توجد مقالات' : i18n.language === 'en' ? 'No articles found' : 'Aucun article trouvé'}
                 </p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredPosts.map((post, index) => (
                   <motion.div
                     key={post.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.05 }}
                   >
                     <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group cursor-pointer">
                       <div className="relative h-48 overflow-hidden">
                         <img
                           src={post.image}
                           alt={post.title}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                       </div>
                       <CardContent className="p-5">
                         <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                           {post.title}
                         </h3>
                         <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                           {post.excerpt}
                         </p>
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             <Avatar className="w-6 h-6">
                               <AvatarImage src={post.author.avatar} />
                               <AvatarFallback className="text-xs">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                             </Avatar>
                             <span className="text-xs text-muted-foreground">{post.author.name}</span>
                           </div>
                           <span className="text-xs text-muted-foreground flex items-center gap-1">
                             <Clock className="w-3 h-3" />
                             {post.readTime} min
                           </span>
                         </div>
                       </CardContent>
                     </Card>
                   </motion.div>
                 ))}
               </div>
             )}
 
             {/* Load More */}
             <div className="text-center mt-12">
               <Button variant="outline" size="lg" className="gap-2">
                 {i18n.language === 'ar' ? 'تحميل المزيد' : i18n.language === 'en' ? 'Load More' : 'Charger plus'}
                 <ArrowRight className="w-4 h-4" />
               </Button>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default BlogPage;