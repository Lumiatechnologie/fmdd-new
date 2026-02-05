 import { motion } from "framer-motion";
 import { ArrowRight, Play, Users, GraduationCap, Briefcase } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import heroImage from "@/assets/hero-collaboration.jpg";
 
 const stats = [
   { icon: Users, value: "15K+", label: "Jeunes inscrits" },
   { icon: GraduationCap, value: "200+", label: "Formations" },
   { icon: Briefcase, value: "500+", label: "Offres d'emploi" },
 ];
 
 export function HeroSection() {
   return (
     <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
       {/* Animated Background Elements */}
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
         <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
         
         {/* Grid Pattern */}
         <div className="absolute inset-0 opacity-5" style={{
           backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
           backgroundSize: '60px 60px'
         }} />
       </div>
 
       <div className="container mx-auto px-4 lg:px-8 relative z-10 py-32">
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
           {/* Left Content */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center lg:text-left"
           >
             {/* Badge */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8"
             >
               <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
               <span className="text-sm font-medium text-primary-foreground">
                 Plateforme officielle du FMDD
               </span>
             </motion.div>
 
             {/* Headline */}
             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
               Construisez votre{" "}
               <span className="relative">
                 <span className="relative z-10 text-accent">avenir</span>
                 <motion.span
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: 0.8, duration: 0.6 }}
                   className="absolute bottom-2 left-0 h-3 bg-accent/30 rounded-full -z-0"
                 />
               </span>{" "}
               durable
             </h1>
 
             <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
               Formation, emploi et entrepreneuriat au service de la jeunesse marocaine. 
               Rejoignez la plateforme qui transforme les talents en réussites.
             </p>
 
             {/* CTAs */}
             <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
               <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                 Commencer maintenant
                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
               </Button>
               <Button variant="hero-outline" size="xl" className="w-full sm:w-auto group">
                 <Play className="w-5 h-5" />
                 Voir la vidéo
               </Button>
             </div>
 
             {/* Stats */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-primary-foreground/10"
             >
               {stats.map((stat, index) => (
                 <div key={index} className="text-center lg:text-left">
                   <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                     <stat.icon className="w-5 h-5 text-accent" />
                     <span className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground">
                       {stat.value}
                     </span>
                   </div>
                   <span className="text-sm text-primary-foreground/60">{stat.label}</span>
                 </div>
               ))}
             </motion.div>
           </motion.div>
 
           {/* Right Content - Decorative */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="hidden lg:block relative"
           >
             <div className="relative">
               {/* Main Visual */}
               <div className="w-full aspect-square max-w-lg mx-auto relative">
                 {/* Hero Image */}
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl"
                 >
                   <img 
                     src={heroImage} 
                     alt="Jeunes professionnels marocains collaborant" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                 </motion.div>
 
                 {/* Floating Cards */}
                 <motion.div
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-8 right-0 bg-card rounded-2xl shadow-lg p-4 backdrop-blur-sm border border-border"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                       <GraduationCap className="w-6 h-6 text-primary-foreground" />
                     </div>
                     <div>
                       <p className="font-semibold text-card-foreground">FMDD Academy</p>
                       <p className="text-sm text-muted-foreground">+50 nouveaux cours</p>
                     </div>
                   </div>
                 </motion.div>
 
                 <motion.div
                   animate={{ y: [10, -10, 10] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-20 left-0 bg-card rounded-2xl shadow-lg p-4 backdrop-blur-sm border border-border"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                       <Briefcase className="w-6 h-6 text-accent-foreground" />
                     </div>
                     <div>
                       <p className="font-semibold text-card-foreground">Insertion Pro</p>
                       <p className="text-sm text-muted-foreground">87% taux de placement</p>
                     </div>
                   </div>
                 </motion.div>
 
                 <motion.div
                   animate={{ y: [-5, 15, -5] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/3 left-1/4 bg-card rounded-2xl shadow-lg p-4 backdrop-blur-sm border border-border"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                       <Users className="w-6 h-6 text-success" />
                     </div>
                     <div>
                       <p className="font-semibold text-card-foreground">Communauté</p>
                       <p className="text-sm text-muted-foreground">15K+ membres actifs</p>
                     </div>
                   </div>
                 </motion.div>
 
                 {/* Central Glow */}
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-64 h-64 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
                 </div>
               </div>
             </div>
           </motion.div>
         </div>
       </div>
 
       {/* Scroll Indicator */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5 }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2"
       >
         <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ duration: 1.5, repeat: Infinity }}
           className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
         >
           <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
         </motion.div>
       </motion.div>
     </section>
   );
 }