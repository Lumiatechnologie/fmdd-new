 import { Header } from "@/components/layout/Header";
 import { Footer } from "@/components/layout/Footer";
 import { motion } from "framer-motion";
 import { Briefcase, MapPin, Clock, Building, Search, Filter, TrendingUp } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useEffect } from "react";
 
 const featuredJobs = [
   {
     id: 1,
     title: "Développeur Full Stack",
     company: "TechMaroc Solutions",
     location: "Casablanca",
     type: "CDI",
     salary: "15-25K MAD",
     posted: "Il y a 2 jours",
     logo: "TM",
     skills: ["React", "Node.js", "TypeScript"],
   },
   {
     id: 2,
     title: "Responsable Marketing Digital",
     company: "Agence Digitale Rabat",
     location: "Rabat",
     type: "CDI",
     salary: "12-18K MAD",
     posted: "Il y a 3 jours",
     logo: "AD",
     skills: ["SEO", "Google Ads", "Analytics"],
   },
   {
     id: 3,
     title: "Chef de Projet RSE",
     company: "EcoMaroc Consulting",
     location: "Marrakech",
     type: "CDI",
     salary: "20-30K MAD",
     posted: "Il y a 1 jour",
     logo: "EC",
     skills: ["RSE", "Management", "Sustainability"],
   },
   {
     id: 4,
     title: "Data Analyst Junior",
     company: "FinTech Maroc",
     location: "Casablanca",
     type: "Stage",
     salary: "6-8K MAD",
     posted: "Aujourd'hui",
     logo: "FM",
     skills: ["Python", "SQL", "Power BI"],
   },
 ];
 
 const stats = [
   { value: "500+", label: "Offres d'emploi au Maroc" },
   { value: "150+", label: "Entreprises partenaires" },
   { value: "87%", label: "Taux d'insertion" },
   { value: "3 sem", label: "Délai moyen d'embauche" },
 ];
 
 export default function InsertionPage() {
   // SEO: Update document title
   useEffect(() => {
     document.title = "Insertion Pro - Emploi et Recrutement au Maroc | FMDD";
   }, []);
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main itemScope itemType="https://schema.org/WebPage">
         {/* Hero Section */}
         <section className="pt-32 pb-20 bg-gradient-hero" aria-labelledby="insertion-hero-title">
           <div className="container mx-auto px-4 lg:px-8">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="max-w-4xl mx-auto text-center"
             >
               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                 <Briefcase className="w-4 h-4 text-accent" aria-hidden="true" />
                 <span className="text-sm font-medium text-primary-foreground">
                   Insertion Pro
                 </span>
               </span>
               
               <h1 id="insertion-hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
                 Trouvez votre emploi{" "}
                 <span className="text-accent">au Maroc</span>
               </h1>
               
               <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto" itemProp="description">
                 Accédez aux meilleures offres d'emploi au Maroc. Notre plateforme met en relation 
                 les jeunes talents avec les entreprises qui recrutent dans tout le Royaume.
               </p>
 
               {/* Search Bar */}
               <div className="max-w-2xl mx-auto bg-card rounded-2xl p-3 shadow-lg" role="search" aria-label="Rechercher une offre d'emploi">
                 <div className="flex flex-col sm:flex-row gap-3">
                   <div className="relative flex-1">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                     <Input 
                       placeholder="Poste, compétences..."
                       aria-label="Rechercher par poste ou compétence"
                       className="pl-12 h-12 bg-muted border-0"
                     />
                   </div>
                   <div className="relative flex-1">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                     <Input 
                       placeholder="Ville au Maroc"
                       aria-label="Rechercher par ville"
                       className="pl-12 h-12 bg-muted border-0"
                     />
                   </div>
                   <Button variant="accent" size="lg" className="h-12" aria-label="Lancer la recherche d'emploi">
                     Rechercher
                   </Button>
                 </div>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* Stats */}
         <section className="py-10 bg-muted/30 border-b border-border" aria-label="Statistiques du marché de l'emploi FMDD">
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
         <section className="py-20" aria-labelledby="job-listings-title">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="flex items-center justify-between mb-10">
               <div>
                 <h2 id="job-listings-title" className="text-3xl font-display font-bold text-foreground mb-2">
                   Offres d'emploi récentes au Maroc
                 </h2>
                 <p className="text-muted-foreground">Découvrez les dernières opportunités professionnelles</p>
               </div>
               <Button variant="outline" className="gap-2" aria-label="Filtrer les offres d'emploi">
                 <Filter className="w-4 h-4" aria-hidden="true" />
                 Filtrer
               </Button>
             </div>
 
             <div className="space-y-4" role="list" aria-label="Liste des offres d'emploi">
               {featuredJobs.map((job, index) => (
                 <motion.div
                   key={job.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border hover:border-primary/20 cursor-pointer group"
                   role="listitem"
                   itemScope
                   itemType="https://schema.org/JobPosting"
                 >
                   <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                     {/* Logo */}
                     <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
                       <span className="text-lg font-bold text-primary-foreground">{job.logo}</span>
                     </div>
 
                     {/* Info */}
                     <div className="flex-1">
                       <div className="flex flex-wrap items-center gap-2 mb-2">
                         <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors" itemProp="title">
                           {job.title}
                         </h3>
                         {job.posted === "Aujourd'hui" && (
                           <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                             Nouveau
                           </span>
                         )}
                       </div>
                       
                       <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                         <span className="flex items-center gap-1" itemProp="hiringOrganization" itemScope itemType="https://schema.org/Organization">
                           <Building className="w-4 h-4" aria-hidden="true" />
                           <span itemProp="name">{job.company}</span>
                         </span>
                         <span className="flex items-center gap-1" itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                           <MapPin className="w-4 h-4" aria-hidden="true" />
                           <span itemProp="name">{job.location}, Maroc</span>
                         </span>
                         <span className="flex items-center gap-1">
                           <Clock className="w-4 h-4" aria-hidden="true" />
                           {job.posted}
                         </span>
                       </div>
 
                       <div className="flex flex-wrap gap-2" aria-label="Compétences requises">
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
                       <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium" itemProp="employmentType">
                         {job.type}
                       </span>
                       <span className="text-lg font-semibold text-foreground" itemProp="baseSalary">{job.salary}</span>
                       <Button variant="default" size="sm" className="mt-2" aria-label={`Postuler à l'offre ${job.title}`}>
                         Postuler
                       </Button>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
 
             <div className="text-center mt-10">
               <Button variant="outline" size="lg" aria-label="Voir toutes les offres d'emploi disponibles au Maroc">
                 Voir toutes les offres
               </Button>
             </div>
           </div>
         </section>
 
         {/* CTA */}
         <section className="py-20 bg-muted/30" aria-labelledby="recruiter-cta-title">
           <div className="container mx-auto px-4 lg:px-8">
             <div className="bg-gradient-primary rounded-2xl p-8 lg:p-12 text-center">
               <TrendingUp className="w-12 h-12 text-accent mx-auto mb-6" aria-hidden="true" />
               <h2 id="recruiter-cta-title" className="text-3xl font-display font-bold text-primary-foreground mb-4">
                 Vous êtes recruteur ?
               </h2>
               <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                 Accédez à notre vivier de talents marocains qualifiés. Publiez vos offres et trouvez les meilleurs profils.
               </p>
               <Button variant="accent" size="xl" aria-label="Publier une offre d'emploi sur la plateforme FMDD">
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