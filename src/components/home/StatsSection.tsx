 import { motion } from "framer-motion";
 import { TrendingUp, Users, Award, Building } from "lucide-react";
 
 const stats = [
   {
     icon: Users,
     value: "15,000+",
     label: "Jeunes accompagnés",
     description: "Bénéficiaires de nos programmes",
   },
   {
     icon: TrendingUp,
     value: "87%",
     label: "Taux d'insertion",
     description: "De nos diplômés en emploi",
   },
   {
     icon: Award,
     value: "200+",
     label: "Formations certifiantes",
     description: "Disponibles sur notre plateforme",
   },
   {
     icon: Building,
     value: "150+",
     label: "Entreprises partenaires",
     description: "Qui recrutent nos talents",
   },
 ];
 
 export function StatsSection() {
   return (
     <section className="py-20 bg-gradient-primary relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute inset-0" style={{
           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
           backgroundSize: '40px 40px'
         }} />
       </div>
 
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
           {stats.map((stat, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.5 }}
               className="text-center"
             >
               <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                 <stat.icon className="w-7 h-7 text-primary-foreground" />
               </div>
               <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-2">
                 {stat.value}
               </div>
               <div className="text-lg font-semibold text-primary-foreground/90 mb-1">
                 {stat.label}
               </div>
               <div className="text-sm text-primary-foreground/60">
                 {stat.description}
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 }