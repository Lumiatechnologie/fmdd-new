 import { motion } from "framer-motion";
 
 const partners = [
   { name: "Ministère de l'Éducation", logo: "ME" },
   { name: "Université Mohammed V", logo: "UM5" },
   { name: "OFPPT", logo: "OFPPT" },
   { name: "CGEM", logo: "CGEM" },
   { name: "Attijariwafa Bank", logo: "AWB" },
   { name: "OCP Group", logo: "OCP" },
   { name: "Maroc Telecom", logo: "IAM" },
   { name: "Royal Air Maroc", logo: "RAM" },
 ];
 
 export function PartnersSection() {
   return (
     <section className="py-16 bg-muted/50 border-y border-border">
       <div className="container mx-auto px-4 lg:px-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-10"
         >
           <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
             Ils nous font confiance
           </p>
         </motion.div>
 
         <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
           {partners.map((partner, index) => (
             <motion.div
               key={partner.name}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
               className="flex items-center justify-center w-24 h-16 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
             >
               <span className="font-display font-bold text-lg text-muted-foreground group-hover:text-primary transition-colors">
                 {partner.logo}
               </span>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 }