 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { motion } from "framer-motion";
 import { Briefcase, MapPin, Clock, Building, Search, Filter, TrendingUp } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 
 const featuredJobs = [
   {
     id: 1,
     title: "Développeur Full Stack",
     company: "TechCorp Maroc",
     location: "Casablanca",
     type: "CDI",
     salary: "15-25K MAD",
     posted: "Il y a 2 jours",
     logo: "TC",
     skills: ["React", "Node.js", "TypeScript"],
   },
   {
     id: 2,
     title: "Chargé(e) Marketing Digital",
     company: "Digital Agency",
     location: "Rabat",
     type: "CDI",
     salary: "12-18K MAD",
     posted: "Il y a 3 jours",
     logo: "DA",
     skills: ["SEO", "Google Ads", "Analytics"],
   },
   {
     id: 3,
     title: "Chef de Projet RSE",
     company: "GreenCorp",
     location: "Marrakech",
     type: "CDI",
     salary: "20-30K MAD",
     posted: "Il y a 1 jour",
     logo: "GC",
     skills: ["RSE", "Management", "Sustainability"],
   },
   {
     id: 4,
     title: "Data Analyst Junior",
     company: "FinTech Solutions",
     location: "Casablanca",
     type: "Stage",
     salary: "6-8K MAD",
     posted: "Aujourd'hui",
     logo: "FS",
     skills: ["Python", "SQL", "Power BI"],
   },
 ];
 
 const stats = [
   { value: "500+", label: "Offres actives" },
   { value: "150+", label: "Entreprises partenaires" },
   { value: "87%", label: "Taux de placement" },
   { value: "3 sem", label: "Délai moyen d'embauche" },
 ];
 
 export default function InsertionPage() {
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
                 <Briefcase className="w-4 h-4 text-accent" />
                 <span className="text-sm font-medium text-primary-foreground">
                   Insertion Pro
                 </span>
               </span>
               
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                 Trouvez l'emploi qui vous{" "}
                 <span className="text-accent">correspond</span>
               </h1>
               
               <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                 Notre algorithme de matching intelligent vous connecte avec les meilleures opportunités 
                 adaptées à votre profil et vos aspirations.
               </p>
 
               {/* Search Bar */}
               <div className="max-w-2xl mx-auto bg-card rounded-2xl p-3 shadow-lg">
                 <div className="flex flex-col sm:flex-row gap-3">
                   <div className="relative flex-1">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                     <Input 
                       placeholder="Poste, compétences..." 
                       className="pl-12 h-12 bg-muted border-0"
                     />
                   </div>
                   <div className="relative flex-1">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                     <Input 
                       placeholder="Ville" 
                       className="pl-12 h-12 bg-muted border-0"
                     />
                   </div>
                   <Button variant="accent" size="lg" className="h-12">
                     Rechercher
                   </Button>
                 </div>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* Stats */}
         <section className="py-10 bg-muted/30 border-b border-border">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map((stat, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="text-center"
                 >
                   <div className="text-2xl sm:text-3xl font-display font-bold text-primary mb-1">
                     {stat.value}
                   </div>
                   <div className="text-sm text-muted-foreground">{stat.label}</div>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>
 
         {/* Job Listings */}
         <section className="py-20">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="flex items-center justify-between mb-10">
               <div>
                 <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                   Offres récentes
                 </h2>
                 <p className="text-muted-foreground">Découvrez les dernières opportunités</p>
               </div>
               <Button variant="outline" className="gap-2">
                 <Filter className="w-4 h-4" />
                 Filtrer
               </Button>
             </div>
 
             <div className="space-y-4">
               {featuredJobs.map((job, index) => (
                 <motion.div
                   key={job.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/20 cursor-pointer group"
                 >
                   <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                     {/* Logo */}
                     <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                       <span className="text-lg font-bold text-primary-foreground">{job.logo}</span>
                     </div>
 
                     {/* Info */}
                     <div className="flex-1">
                       <div className="flex flex-wrap items-center gap-2 mb-2">
                         <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                           {job.title}
                         </h3>
                         {job.posted === "Aujourd'hui" && (
                           <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                             Nouveau
                           </span>
                         )}
                       </div>
                       
                       <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                         <span className="flex items-center gap-1">
                           <Building className="w-4 h-4" />
                           {job.company}
                         </span>
                         <span className="flex items-center gap-1">
                           <MapPin className="w-4 h-4" />
                           {job.location}
                         </span>
                         <span className="flex items-center gap-1">
                           <Clock className="w-4 h-4" />
                           {job.posted}
                         </span>
                       </div>
 
                       <div className="flex flex-wrap gap-2">
                         {job.skills.map((skill) => (
                           <span 
                             key={skill}
                             className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                           >
                             {skill}
                           </span>
                         ))}
                       </div>
                     </div>
 
                     {/* Right */}
                     <div className="flex flex-col items-end gap-2">
                       <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                         {job.type}
                       </span>
                       <span className="text-lg font-semibold text-foreground">{job.salary}</span>
                       <Button variant="default" size="sm" className="mt-2">
                         Postuler
                       </Button>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
 
             <div className="text-center mt-10">
               <Button variant="outline" size="lg">
                 Voir toutes les offres
               </Button>
             </div>
           </div>
         </section>
 
         {/* CTA */}
         <section className="py-20 bg-muted/30">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center">
               <TrendingUp className="w-12 h-12 text-accent mx-auto mb-6" />
               <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
                 Vous êtes recruteur ?
               </h2>
               <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                 Accédez à notre vivier de talents qualifiés et trouvez les meilleurs candidats pour vos postes.
               </p>
               <Button variant="accent" size="xl">
                 Publier une offre
               </Button>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 }