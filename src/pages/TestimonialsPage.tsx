 import { useState } from "react";
 import { useTranslation } from "react-i18next";
 import { motion } from "framer-motion";
 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { Card, CardContent } from "@/components/ui/card";
 import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Quote, Star, Play, GraduationCap, Briefcase, Rocket } from "lucide-react";
 
 const testimonials = [
   {
     id: 1,
     name: "Fatima Zahra El Amrani",
     role: "Développeuse Full-Stack",
     company: "Tech Startup Casablanca",
     category: "academy",
     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
     quote: "Grâce à la formation FMDD Academy, j'ai acquis les compétences techniques qui m'ont permis de décrocher mon premier emploi dans le secteur tech. Le programme était pratique et adapté aux besoins du marché marocain.",
     rating: 5,
     videoUrl: null,
     date: "2024-05"
   },
   {
     id: 2,
     name: "Youssef Benali",
     role: "Fondateur",
     company: "EcoMaroc Solutions",
     category: "entrepreneurship",
     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
     quote: "Le programme d'incubation FMDD m'a accompagné de l'idée à la levée de fonds. Aujourd'hui, EcoMaroc emploie 15 personnes et contribue au développement durable au Maroc.",
     rating: 5,
     videoUrl: "https://youtube.com/watch?v=example",
     date: "2024-03"
   },
   {
     id: 3,
     name: "Amina Tazi",
     role: "Responsable RH",
     company: "Groupe Industriel Marocain",
     category: "insertion",
     avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
     quote: "En tant que recruteur partenaire, nous avons embauché plus de 30 jeunes talents via Insertion Pro. La qualité des profils et le matching sont excellents.",
     rating: 5,
     videoUrl: null,
     date: "2024-04"
   },
   {
     id: 4,
     name: "Mehdi Alaoui",
     role: "Consultant Marketing",
     company: "Indépendant",
     category: "academy",
     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
     quote: "La certification en marketing digital du FMDD a transformé ma carrière. Les formateurs sont des professionnels expérimentés qui partagent des cas pratiques du marché marocain.",
     rating: 5,
     videoUrl: null,
     date: "2024-02"
   },
   {
     id: 5,
     name: "Sara Idrissi",
     role: "Co-fondatrice",
     company: "FemTech Maroc",
     category: "entrepreneurship",
     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
     quote: "Le réseau FMDD et le mentorat m'ont aidée à structurer mon projet et à trouver mes premiers investisseurs. Une expérience transformatrice !",
     rating: 5,
     videoUrl: "https://youtube.com/watch?v=example2",
     date: "2024-01"
   },
   {
     id: 6,
     name: "Omar Benjelloun",
     role: "Directeur École Supérieure",
     company: "Institut Tech Rabat",
     category: "partner",
     avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200",
     quote: "Notre partenariat avec FMDD permet à nos étudiants d'accéder à des formations complémentaires de qualité et d'améliorer leur employabilité.",
     rating: 5,
     videoUrl: null,
     date: "2023-12"
   }
 ];
 
 const categories = [
   { id: "all", label: { fr: "Tous", ar: "الكل", en: "All" }, icon: Star },
   { id: "academy", label: { fr: "Academy", ar: "الأكاديمية", en: "Academy" }, icon: GraduationCap },
   { id: "insertion", label: { fr: "Insertion Pro", ar: "الإدماج المهني", en: "Career Services" }, icon: Briefcase },
   { id: "entrepreneurship", label: { fr: "Entrepreneuriat", ar: "ريادة الأعمال", en: "Entrepreneurship" }, icon: Rocket },
   { id: "partner", label: { fr: "Partenaires", ar: "الشركاء", en: "Partners" }, icon: Star }
 ];
 
 const TestimonialsPage = () => {
   const { t, i18n } = useTranslation();
   const [selectedCategory, setSelectedCategory] = useState("all");
 
   const filteredTestimonials = selectedCategory === "all"
     ? testimonials
     : testimonials.filter(item => item.category === selectedCategory);
 
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
                 <Quote className="w-4 h-4 mr-2" />
                 {t('pages.testimonials.title')}
               </Badge>
               <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                 {t('pages.testimonials.title')}
               </h1>
               <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                 {t('pages.testimonials.subtitle')}
               </p>
             </motion.div>
           </div>
         </section>
 
         {/* Category Filter */}
         <section className="py-8 border-b border-border">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="flex flex-wrap justify-center gap-3">
               {categories.map((category) => {
                 const Icon = category.icon;
                 return (
                   <Button
                     key={category.id}
                     variant={selectedCategory === category.id ? "default" : "outline"}
                     onClick={() => setSelectedCategory(category.id)}
                     className="gap-2"
                   >
                     <Icon className="w-4 h-4" />
                     {getCategoryLabel(category)}
                   </Button>
                 );
               })}
             </div>
           </div>
         </section>
 
         {/* Testimonials Grid */}
         <section className="py-12">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredTestimonials.map((testimonial, index) => (
                 <motion.div
                   key={testimonial.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                     <CardContent className="p-6">
                       <Quote className="w-10 h-10 text-primary/20 mb-4" />
                       
                       <p className="text-foreground mb-6 leading-relaxed">
                         "{testimonial.quote}"
                       </p>
 
                       <div className="flex items-center gap-1 mb-6">
                         {[...Array(testimonial.rating)].map((_, i) => (
                           <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                         ))}
                       </div>
 
                       <div className="flex items-center gap-4">
                         <Avatar className="w-12 h-12 border-2 border-primary/20">
                           <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                           <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                         </Avatar>
                         <div className="flex-1">
                           <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                           <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                           <p className="text-xs text-primary">{testimonial.company}</p>
                         </div>
                         {testimonial.videoUrl && (
                           <Button variant="outline" size="icon" className="shrink-0">
                             <Play className="w-4 h-4" />
                           </Button>
                         )}
                       </div>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
 
         {/* CTA Section */}
         <section className="py-16 bg-muted/50">
           <div className="container mx-auto px-4 lg:px-8 text-center">
             <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
               {i18n.language === 'ar' ? 'شارك قصتك معنا' : i18n.language === 'en' ? 'Share Your Story' : 'Partagez votre histoire'}
             </h2>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
               {i18n.language === 'ar' 
                 ? 'هل استفدت من برامج FMDD؟ شارك تجربتك لإلهام الآخرين.'
                 : i18n.language === 'en'
                 ? 'Have you benefited from FMDD programs? Share your experience to inspire others.'
                 : 'Vous avez bénéficié des programmes FMDD ? Partagez votre expérience pour inspirer d\'autres.'}
             </p>
             <Button variant="accent" size="lg">
               {i18n.language === 'ar' ? 'أرسل شهادتك' : i18n.language === 'en' ? 'Submit Your Testimonial' : 'Soumettre votre témoignage'}
             </Button>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default TestimonialsPage;