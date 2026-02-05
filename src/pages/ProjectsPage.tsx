 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { motion } from "framer-motion";
 import { Rocket, Lightbulb, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const steps = [
   {
     number: "01",
     title: "Présentez votre idée",
     description: "Décrivez votre projet et vos objectifs. Notre équipe évaluera le potentiel de votre initiative.",
     icon: Lightbulb,
   },
   {
     number: "02",
     title: "Rejoignez l'incubateur",
     description: "Bénéficiez d'un accompagnement personnalisé avec des mentors expérimentés.",
     icon: Users,
   },
   {
     number: "03",
     title: "Développez & Lancez",
     description: "Accédez aux ressources, au réseau et au financement pour concrétiser votre projet.",
     icon: Rocket,
   },
 ];
 
 const benefits = [
   "Accompagnement par des mentors experts",
   "Accès à un réseau d'investisseurs",
   "Formation à l'entrepreneuriat",
   "Espace de co-working gratuit",
   "Accès à des outils et ressources",
   "Événements de networking exclusifs",
 ];
 
 const successStories = [
   {
     name: "EcoMaroc",
     founder: "Mehdi Alaoui",
     description: "Plateforme de recyclage connectant entreprises et recycleurs locaux.",
     funding: "2.5M MAD levés",
     image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop",
   },
   {
     name: "AgriTech Pro",
     founder: "Khadija Bennis",
     description: "Solution IoT pour l'agriculture durable et l'optimisation des ressources.",
     funding: "1.8M MAD levés",
     image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop",
   },
   {
     name: "HealthConnect",
     founder: "Omar Tazi",
     description: "Application de télémédecine pour les zones rurales du Maroc.",
     funding: "3.2M MAD levés",
     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop",
   },
 ];
 
 export default function ProjectsPage() {
   return (
     <div className="min-h-screen bg-background">
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
                   Lancer un Projet
                 </span>
               </span>
               
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                 Transformez vos idées en{" "}
                 <span className="text-accent">réalité</span>
               </h1>
               
               <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                 De l'idée au lancement, nous vous accompagnons à chaque étape de votre aventure 
                 entrepreneuriale avec mentorat, financement et réseau.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Button variant="accent" size="xl">
                   Soumettre mon projet
                 </Button>
                 <Button variant="hero-outline" size="xl">
                   En savoir plus
                 </Button>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* How It Works */}
         <section className="py-20">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16"
             >
               <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                 Comment ça marche ?
               </h2>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                 Un parcours structuré pour maximiser vos chances de réussite
               </p>
             </motion.div>
 
             <div className="grid md:grid-cols-3 gap-8">
               {steps.map((step, index) => (
                 <motion.div
                   key={step.number}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.15 }}
                   className="relative"
                 >
                   <div className="bg-card rounded-2xl p-8 shadow-md border border-border h-full">
                     <span className="text-6xl font-display font-bold text-primary/10 absolute top-4 right-4">
                       {step.number}
                     </span>
                     <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                       <step.icon className="w-7 h-7 text-primary-foreground" />
                     </div>
                     <h3 className="text-xl font-display font-bold text-foreground mb-3">
                       {step.title}
                     </h3>
                     <p className="text-muted-foreground">{step.description}</p>
                   </div>
                   
                   {index < steps.length - 1 && (
                     <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                       <ArrowRight className="w-8 h-8 text-primary/30" />
                     </div>
                   )}
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Benefits */}
         <section className="py-20 bg-muted/30">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-12 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
               >
                 <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
                   Tout ce dont vous avez besoin pour{" "}
                   <span className="text-gradient-primary">réussir</span>
                 </h2>
                 <p className="text-lg text-muted-foreground mb-8">
                   Notre programme d'incubation vous offre un accompagnement complet pour 
                   transformer votre vision en entreprise prospère.
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                   {benefits.map((benefit, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: index * 0.1 }}
                       className="flex items-center gap-3"
                     >
                       <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
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
                 <TrendingUp className="w-16 h-16 text-accent mx-auto mb-6" />
                 <div className="text-5xl font-display font-bold text-primary-foreground mb-2">
                   50+
                 </div>
                 <p className="text-xl text-primary-foreground/90 mb-1">Startups incubées</p>
                 <p className="text-primary-foreground/70 mb-6">avec plus de 25M MAD levés au total</p>
                 <Button variant="accent" size="lg">
                   Rejoindre l'incubateur
                 </Button>
               </motion.div>
             </div>
           </div>
         </section>
 
         {/* Success Stories */}
         <section className="py-20">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                 Ils ont réussi avec nous
               </h2>
               <p className="text-lg text-muted-foreground">
                 Découvrez les success stories de nos entrepreneurs
               </p>
             </motion.div>
 
             <div className="grid md:grid-cols-3 gap-8">
               {successStories.map((story, index) => (
                 <motion.div
                   key={story.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.15 }}
                   className="bg-card rounded-2xl overflow-hidden shadow-md border border-border group"
                 >
                   <div className="aspect-video overflow-hidden">
                     <img
                       src={story.image}
                       alt={story.name}
                       className="w-full h-full object-cover transition-transform group-hover:scale-105"
                     />
                   </div>
                   <div className="p-6">
                     <div className="flex items-center justify-between mb-3">
                       <h3 className="text-xl font-display font-bold text-foreground">
                         {story.name}
                       </h3>
                       <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                         {story.funding}
                       </span>
                     </div>
                     <p className="text-sm text-muted-foreground mb-2">
                       Fondé par {story.founder}
                     </p>
                     <p className="text-foreground">{story.description}</p>
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