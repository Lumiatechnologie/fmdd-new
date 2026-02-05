 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { motion } from "framer-motion";
 import { GraduationCap, Clock, Users, Award, Play, BookOpen, TrendingUp } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useEffect } from "react";
 
 const featuredCourses = [
   {
     id: 1,
     title: "Développement Durable : Les Fondamentaux",
     instructor: "Dr. Ahmed Bennani",
     duration: "12h",
     students: 1250,
     rating: 4.9,
     image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=250&fit=crop",
     category: "Environnement",
     level: "Débutant",
   },
   {
     id: 2,
     title: "Marketing Digital au Maroc",
     instructor: "Sarah El Fassi",
     duration: "8h",
     students: 890,
     rating: 4.8,
     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
     category: "Business",
     level: "Intermédiaire",
   },
   {
     id: 3,
     title: "Leadership et Management d'Équipe",
     instructor: "Karim Alaoui",
     duration: "10h",
     students: 2100,
     rating: 4.9,
     image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
     category: "Soft Skills",
     level: "Tous niveaux",
   },
 ];
 
 const categories = [
   { name: "Développement Durable", count: 45, icon: TrendingUp, description: "Environnement, RSE, économie verte" },
   { name: "Business & Entrepreneuriat", count: 38, icon: BookOpen, description: "Création d'entreprise, gestion" },
   { name: "Soft Skills", count: 52, icon: Users, description: "Communication, leadership" },
   { name: "Compétences Numériques", count: 67, icon: GraduationCap, description: "Programmation, data, IA" },
 ];
 
 export default function AcademyPage() {
   // SEO: Update document title
   useEffect(() => {
     document.title = "FMDD Academy - Formations Certifiantes au Maroc | Développement Durable";
   }, []);
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main itemScope itemType="https://schema.org/EducationalOrganization">
         {/* Hero Section */}
         <section className="pt-32 pb-20 bg-gradient-hero" aria-labelledby="academy-hero-title">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl mx-auto text-center"
             >
               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                 <GraduationCap className="w-4 h-4 text-accent" aria-hidden="true" />
                 <span className="text-sm font-medium text-primary-foreground" itemProp="name">
                   FMDD Academy
                 </span>
               </span>
               
               <h1 id="academy-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                 Formez-vous aux métiers de{" "}
                 <span className="text-accent">demain</span>
               </h1>
               
               <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto" itemProp="description">
                 Plus de 200 formations certifiantes en développement durable, compétences numériques 
                 et soft skills. Cours dispensés par des experts marocains reconnus.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Button variant="accent" size="xl" aria-label="Voir le catalogue des formations FMDD Academy">
                   Explorer les cours
                 </Button>
                 <Button variant="hero-outline" size="xl" aria-label="Découvrir le fonctionnement de FMDD Academy">
                   <Play className="w-5 h-5" aria-hidden="true" />
                   Découvrir la plateforme
                 </Button>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* Categories */}
         <section className="py-16 bg-muted/30" aria-labelledby="categories-title">
           <div className="container mx-auto px-4 lg:px-8">
             <h2 id="categories-title" className="sr-only">Catégories de formations</h2>
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {categories.map((category, index) => (
                 <motion.div
                   key={category.name}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-border hover:border-primary/20"
                   role="article"
                   itemScope
                   itemType="https://schema.org/EducationalOccupationalProgram"
                 >
                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                     <category.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                   </div>
                   <h3 className="font-semibold text-foreground mb-1" itemProp="name">{category.name}</h3>
                   <p className="text-sm text-muted-foreground mb-1">{category.count} formations</p>
                   <p className="text-xs text-muted-foreground">{category.description}</p>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Featured Courses */}
         <section className="py-20" aria-labelledby="featured-courses-title">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="flex items-center justify-between mb-10">
               <div>
                 <h2 id="featured-courses-title" className="text-3xl font-display font-bold text-foreground mb-2">
                   Formations populaires
                 </h2>
                 <p className="text-muted-foreground">Les formations les plus demandées par les jeunes marocains</p>
               </div>
               <Button variant="outline">Voir tout</Button>
             </div>
 
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
               {featuredCourses.map((course, index) => (
                 <motion.div
                   key={course.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.15 }}
                   className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border group cursor-pointer"
                   role="listitem"
                   itemScope
                   itemType="https://schema.org/Course"
                 >
                   <div className="relative aspect-video overflow-hidden" aria-hidden="true">
                     <img
                       src={course.image}
                       alt={`Formation ${course.title} - FMDD Academy`}
                       className="w-full h-full object-cover transition-transform group-hover:scale-105"
                       loading="lazy"
                     />
                     <div className="absolute top-4 left-4">
                       <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                         {course.category}
                       </span>
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                         <Play className="w-6 h-6 text-accent-foreground fill-current" aria-hidden="true" />
                       </div>
                     </div>
                   </div>
                   
                   <div className="p-6">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                       <span itemProp="educationalLevel">{course.level}</span>
                       <span>•</span>
                       <Clock className="w-4 h-4" aria-hidden="true" />
                       <span itemProp="timeRequired">{course.duration}</span>
                     </div>
                     
                     <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" itemProp="name">
                       {course.title}
                     </h3>
                     
                     <p className="text-sm text-muted-foreground mb-4" itemProp="author">
                       Par <span itemProp="name">{course.instructor}</span>
                     </p>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-border">
                       <div className="flex items-center gap-1">
                         <Award className="w-4 h-4 text-accent" aria-hidden="true" />
                         <span className="text-sm font-medium text-foreground" itemProp="aggregateRating">{course.rating}</span>
                       </div>
                       <div className="flex items-center gap-1 text-muted-foreground">
                         <Users className="w-4 h-4" aria-hidden="true" />
                         <span className="text-sm">{course.students} inscrits</span>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 }