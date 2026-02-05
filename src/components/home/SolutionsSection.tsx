 import { motion } from "framer-motion";
 import { GraduationCap, Briefcase, Rocket, ArrowRight, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 
 const solutions = [
   {
     id: "academy",
     icon: GraduationCap,
     title: "FMDD Academy",
     subtitle: "Formation & Certification",
     description: "Accédez à des formations certifiantes en développement durable, soft skills et compétences métiers. Apprenez à votre rythme avec nos experts.",
     features: [
       "Cours certifiants reconnus",
       "Formateurs experts du terrain",
       "Parcours personnalisés",
       "Attestations vérifiables",
     ],
     color: "primary",
     gradient: "from-primary to-secondary",
     href: "/academy",
     cta: "Explorer les formations",
   },
   {
     id: "insertion",
     icon: Briefcase,
     title: "Insertion Pro",
     subtitle: "Emploi & Carrière",
     description: "Trouvez votre premier emploi ou boostez votre carrière grâce à notre écosystème de recruteurs partenaires et notre matching intelligent.",
     features: [
       "Matching IA candidat-emploi",
       "500+ offres actives",
       "Accompagnement personnalisé",
       "Réseau d'entreprises partenaires",
     ],
     color: "accent",
     gradient: "from-accent to-amber-400",
     href: "/insertion",
     cta: "Voir les opportunités",
   },
   {
     id: "projets",
     icon: Rocket,
     title: "Lancer un Projet",
     subtitle: "Entrepreneuriat & Innovation",
     description: "Transformez vos idées en projets concrets. Bénéficiez de l'accompagnement, du mentorat et du financement pour réussir votre aventure entrepreneuriale.",
     features: [
       "Incubation & mentorat",
       "Accès au financement",
       "Réseau d'investisseurs",
       "Événements networking",
     ],
     color: "success",
     gradient: "from-success to-emerald-400",
     href: "/projets",
     cta: "Démarrer mon projet",
   },
 ];
 
 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: {
       staggerChildren: 0.2,
     },
   },
 };
 
 const cardVariants = {
   hidden: { opacity: 0, y: 30 },
   visible: {
     opacity: 1,
     y: 0,
     transition: {
       duration: 0.6,
       ease: "easeOut" as const,
     },
   },
 };
 
 export function SolutionsSection() {
   return (
     <section id="solutions" className="py-24 lg:py-32 bg-muted/30">
       <div className="container mx-auto px-4 lg:px-8">
         {/* Section Header */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center max-w-3xl mx-auto mb-16"
         >
           <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
             Nos Solutions
           </span>
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
             Trois piliers pour votre{" "}
             <span className="text-gradient-primary">réussite</span>
           </h2>
           <p className="text-lg text-muted-foreground">
             Que vous cherchiez à vous former, à trouver un emploi ou à lancer votre entreprise, 
             le FMDD vous accompagne à chaque étape de votre parcours.
           </p>
         </motion.div>
 
         {/* Solutions Cards */}
         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
         >
           {solutions.map((solution) => (
             <motion.div
               key={solution.id}
               variants={cardVariants}
               className="group relative bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-primary/20"
             >
               {/* Gradient Top Border */}
               <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.gradient}`} />
               
               <div className="p-8">
                 {/* Icon */}
                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                   <solution.icon className="w-7 h-7 text-primary-foreground" />
                 </div>
 
                 {/* Content */}
                 <span className="text-sm font-medium text-muted-foreground">
                   {solution.subtitle}
                 </span>
                 <h3 className="text-2xl font-display font-bold text-foreground mt-1 mb-3">
                   {solution.title}
                 </h3>
                 <p className="text-muted-foreground mb-6 leading-relaxed">
                   {solution.description}
                 </p>
 
                 {/* Features */}
                 <ul className="space-y-3 mb-8">
                   {solution.features.map((feature, index) => (
                     <li key={index} className="flex items-center gap-3 text-sm">
                       <CheckCircle className={`w-5 h-5 text-${solution.color} flex-shrink-0`} />
                       <span className="text-foreground">{feature}</span>
                     </li>
                   ))}
                 </ul>
 
                 {/* CTA */}
                 <Link to={solution.href}>
                   <Button variant="outline" className="w-full group/btn">
                     {solution.cta}
                     <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                   </Button>
                 </Link>
               </div>
             </motion.div>
           ))}
         </motion.div>
       </div>
     </section>
   );
 }