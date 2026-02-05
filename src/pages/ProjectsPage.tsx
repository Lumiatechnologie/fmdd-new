 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { motion } from "framer-motion";
 import { Rocket, Lightbulb, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useEffect } from "react";
 
 const steps = [
   {
     number: "01",
     title: "Présentez votre projet",
     description: "Soumettez votre idée entrepreneuriale. Notre équipe évalue le potentiel de votre projet au Maroc.",
     icon: Lightbulb,
   },
   {
     number: "02",
     title: "Intégrez l'incubateur FMDD",
     description: "Bénéficiez d'un accompagnement personnalisé avec des mentors entrepreneurs marocains.",
     icon: Users,
   },
   {
     number: "03",
     title: "Développez & Lancez",
     description: "Accédez aux financements, au réseau d'investisseurs et aux ressources pour lancer votre startup.",
     icon: Rocket,
   },
 ];
 
 const benefits = [
   "Mentorat par des entrepreneurs marocains",
   "Accès aux investisseurs et business angels",
   "Formations en gestion et entrepreneuriat",
   "Espace de coworking à Rabat et Casablanca",
   "Outils numériques et ressources gratuites",
   "Networking avec l'écosystème startup marocain",
 ];
 
 const successStories = [
   {
     name: "EcoMaroc",
     founder: "Mehdi Alaoui",
     description: "Plateforme de recyclage connectant entreprises et centres de tri au Maroc.",
     funding: "2.5M MAD levés",
     image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
   },
   {
     name: "AgriTech Pro",
     founder: "Khadija Bennis",
     description: "Solution IoT pour l'agriculture durable dans les régions rurales du Maroc.",
     funding: "1.8M MAD levés",
     image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop",
   },
   {
     name: "HealthConnect",
     founder: "Omar Tazi",
     description: "Application de télémédecine pour les zones rurales et enclavées du Royaume.",
     funding: "3.2M MAD levés",
     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop",
   },
 ];
 
 export default function ProjectsPage() {
   // SEO: Update document title
   useEffect(() => {
     document.title = "Entrepreneuriat au Maroc - Incubateur de Startups | FMDD";
   }, []);
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main itemScope itemType="https://schema.org/WebPage">
         {/* Hero Section */}
         <section className="pt-32 pb-20 bg-gradient-hero" aria-labelledby="projects-hero-title">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl mx-auto text-center"
             >
               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                 <Rocket className="w-4 h-4 text-accent" aria-hidden="true" />
                 <span className="text-sm font-medium text-primary-foreground">
                   Entrepreneuriat
                 </span>
               </span>
               
               <h1 id="projects-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                 Créez votre startup{" "}
                 <span className="text-accent">au Maroc</span>
               </h1>
               
               <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto" itemProp="description">
                 L'incubateur FMDD accompagne les jeunes entrepreneurs marocains : mentorat, 
                 financement et réseau pour transformer vos idées en entreprises prospères.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Button variant="accent" size="xl" aria-label="Soumettre votre projet entrepreneurial">
                   Lancer mon projet
                 </Button>
                 <Button variant="hero-outline" size="xl" aria-label="En savoir plus sur l'incubateur FMDD">
                   Découvrir l'incubateur
                 </Button>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* How It Works */}
         <section className="py-20" aria-labelledby="how-it-works-title">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16"
             >
               <h2 id="how-it-works-title" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                 Comment ça marche ?
               </h2>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                 Un parcours d'incubation structuré pour les entrepreneurs marocains
               </p>
             </motion.div>
 
             <div className="grid md:grid-cols-3 gap-8" role="list">
               {steps.map((step, index) => (
                 <motion.div
                   key={step.number}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.15 }}
                   className="relative"
                   role="listitem"
                 >
                   <div className="bg-card rounded-2xl p-8 shadow-md border border-border h-full">
                     <span className="text-6xl font-display font-bold text-primary/10 absolute top-4 right-4" aria-hidden="true">
                       {step.number}
                     </span>
                     <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6" aria-hidden="true">
                       <step.icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
                     </div>
                     <h3 className="text-xl font-display font-bold text-foreground mb-3">
                       {step.title}
                     </h3>
                     <p className="text-muted-foreground">{step.description}</p>
                   </div>
                   
                   {index < steps.length - 1 && (
                     <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10" aria-hidden="true">
                       <ArrowRight className="w-8 h-8 text-primary/30" aria-hidden="true" />
                     </div>
                   )}
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Benefits */}
         <section className="py-20 bg-muted/30" aria-labelledby="benefits-title">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
               >
                 <h2 id="benefits-title" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                   L'accompagnement complet pour{" "}
                   <span className="text-gradient-primary">entreprendre au Maroc</span>
                 </h2>
                 <p className="text-lg text-muted-foreground mb-8">
                   L'incubateur FMDD offre aux jeunes entrepreneurs marocains tous les outils 
                   pour réussir leur projet de création d'entreprise.
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4" role="list">
                   {benefits.map((benefit, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: index * 0.1 }}
                       className="flex items-center gap-3"
                       role="listitem"
                     >
                       <CheckCircle className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
                       <span className="text-foreground">{benefit}</span>
                     </motion.div>
                   ))}
                 </div>
               </motion.div>
 
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-gradient-primary rounded-2xl p-8 text-center"
               >
                 <TrendingUp className="w-16 h-16 text-accent mx-auto mb-6" aria-hidden="true" />
                 <div className="text-5xl font-display font-bold text-primary-foreground mb-2">
                   50+
                 </div>
                 <p className="text-xl text-primary-foreground/90 mb-1">Startups marocaines incubées</p>
                 <p className="text-primary-foreground/70 mb-6">Plus de 25 millions MAD levés au total</p>
                 <Button variant="accent" size="lg" aria-label="Candidater à l'incubateur FMDD">
                   Candidater maintenant
                 </Button>
               </motion.div>
             </div>
           </div>
         </section>
 
         {/* Success Stories */}
         <section className="py-20" aria-labelledby="success-stories-title">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <h2 id="success-stories-title" className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                 Startups marocaines à succès
               </h2>
               <p className="text-lg text-muted-foreground">
                 Découvrez les réussites entrepreneuriales accompagnées par le FMDD
               </p>
             </motion.div>
 
             <div className="grid md:grid-cols-3 gap-8" role="list">
               {successStories.map((story, index) => (
                 <motion.div
                   key={story.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.15 }}
                   className="bg-card rounded-2xl overflow-hidden shadow-md border border-border group"
                   role="listitem"
                   itemScope
                   itemType="https://schema.org/Organization"
                 >
                   <div className="aspect-video overflow-hidden">
                     <img
                       src={story.image}
                       alt={`${story.name} - Startup marocaine incubée par le FMDD`}
                       className="w-full h-full object-cover transition-transform group-hover:scale-105"
                       loading="lazy"
                     />
                   </div>
                   <div className="p-6">
                     <div className="flex items-center justify-between mb-3">
                       <h3 className="text-xl font-display font-bold text-foreground" itemProp="name">
                         {story.name}
                       </h3>
                       <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                         {story.funding}
                       </span>
                     </div>
                     <p className="text-sm text-muted-foreground mb-2" itemProp="founder">
                       Fondé par <span itemProp="name">{story.founder}</span>
                     </p>
                     <p className="text-foreground" itemProp="description">{story.description}</p>
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