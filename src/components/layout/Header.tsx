 import { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Menu, X, ChevronDown, Phone, Mail, GraduationCap, Briefcase, Rocket } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const navLinks = [
   { label: "Accueil", href: "/" },
   {
     label: "Nos Solutions",
     href: "#solutions",
     children: [
       { label: "FMDD Academy", href: "/academy", icon: GraduationCap, description: "Formations certifiantes au Maroc" },
       { label: "Insertion Pro", href: "/insertion", icon: Briefcase, description: "Emploi et recrutement" },
       { label: "Entrepreneuriat", href: "/projets", icon: Rocket, description: "Création d'entreprise" },
     ],
   },
   { label: "Qui sommes-nous", href: "/about" },
   { label: "Partenaires", href: "/partenaires" },
   { label: "Nous contacter", href: "/contact" },
 ];
 
 export function Header() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 20);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   return (
     <header
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isScrolled
           ? "bg-card/95 backdrop-blur-md shadow-md py-3"
           : "bg-transparent py-5"
       }`}
       role="banner"
     >
       {/* Top Bar - visible only when not scrolled */}
       {!isScrolled && (
         <div className="hidden lg:block bg-primary/20 backdrop-blur-sm">
           <div className="container mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-sm">
             <div className="flex items-center gap-6">
               <a href="tel:+212520000000" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
                 <Phone className="w-4 h-4" aria-hidden="true" />
                 <span>+212 5 20 00 00 00</span>
               </a>
               <a href="mailto:contact@fmdd.ma" className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
                 <Mail className="w-4 h-4" aria-hidden="true" />
                 <span>contact@fmdd.ma</span>
               </a>
             </div>
             <div className="flex items-center gap-4 text-primary-foreground/80">
               <span>🇲🇦 Forum Marocain pour le Développement Durable</span>
             </div>
           </div>
         </div>
       )}
       
       <div className="container mx-auto px-4 lg:px-8">
         <div className="flex items-center justify-between" role="navigation" aria-label="Navigation principale">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3 group" aria-label="FMDD - Accueil">
             <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
               <span className="text-primary-foreground font-display font-bold text-lg">F</span>
             </div>
             <div className="flex flex-col">
               <span className={`font-display font-bold text-lg leading-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                 FMDD
               </span>
               <span className={`text-xs leading-tight transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80'}`}>
                 Développement Durable
               </span>
             </div>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-1" role="menubar">
             {navLinks.map((link) => (
               <div
                 key={link.label}
                 className="relative"
                 onMouseEnter={() => link.children && setActiveSubmenu(link.label)}
                 onMouseLeave={() => setActiveSubmenu(null)}
                 role="none"
               >
                 <Link
                   to={link.href}
                   className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors ${
                     isScrolled
                       ? "text-foreground hover:bg-muted"
                       : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                   }`}
                   role="menuitem"
                   aria-haspopup={link.children ? "true" : undefined}
                   aria-expanded={link.children ? activeSubmenu === link.label : undefined}
                 >
                   {link.label}
                   {link.children && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                 </Link>
 
                 {/* Submenu */}
                 <AnimatePresence>
                   {link.children && activeSubmenu === link.label && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       transition={{ duration: 0.2 }}
                       className="absolute top-full left-0 pt-2"
                       role="menu"
                       aria-label={`Sous-menu ${link.label}`}
                     >
                       <div className="bg-card rounded-xl shadow-lg border border-border p-2 min-w-[280px]">
                         {link.children.map((sublink) => (
                           <Link
                             key={sublink.label}
                             to={sublink.href}
                             className="flex items-start gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                             role="menuitem"
                           >
                             {sublink.icon && (
                               <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                 <sublink.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                               </div>
                             )}
                             <div>
                               <div className="font-medium">{sublink.label}</div>
                               {sublink.description && (
                                 <div className="text-xs text-muted-foreground mt-0.5">{sublink.description}</div>
                               )}
                             </div>
                           </Link>
                         ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
           </nav>
 
           {/* CTA Buttons */}
           <div className="hidden lg:flex items-center gap-3">
             <Button
               variant="ghost"
               className={`font-medium ${
                 isScrolled
                   ? "text-foreground hover:bg-muted"
                   : "text-primary-foreground hover:bg-primary-foreground/10"
               }`}
               aria-label="Se connecter à mon espace FMDD"
             >
               Connexion
             </Button>
             <Button variant="accent" size="lg" aria-label="S'inscrire sur la plateforme FMDD">
               S'inscrire
             </Button>
           </div>
 
           {/* Mobile Menu Button */}
           <button
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className={`lg:hidden p-2 rounded-lg transition-colors ${
               isScrolled
                 ? "text-foreground hover:bg-muted"
                 : "text-primary-foreground hover:bg-primary-foreground/10"
             }`}
             aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
             aria-expanded={isMobileMenuOpen}
           >
             {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
           </button>
         </div>
       </div>
 
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             exit={{ opacity: 0, height: 0 }}
             transition={{ duration: 0.3 }}
             className="lg:hidden bg-card border-t border-border"
             role="menu"
             aria-label="Menu mobile"
           >
             <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
               {navLinks.map((link) => (
                 <div key={link.label} role="none">
                   <Link
                     to={link.href}
                     onClick={() => !link.children && setIsMobileMenuOpen(false)}
                     className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                     role="menuitem"
                   >
                     {link.label}
                   </Link>
                   {link.children && (
                     <div className="pl-4">
                       {link.children.map((sublink) => (
                         <Link
                           key={sublink.label}
                           to={sublink.href}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                           role="menuitem"
                         >
                           {sublink.icon && <sublink.icon className="w-4 h-4 text-primary" aria-hidden="true" />}
                           {sublink.label}
                         </Link>
                       ))}
                     </div>
                   )}
                 </div>
               ))}
               <div className="pt-4 border-t border-border flex flex-col gap-2">
                 <Button variant="outline" className="w-full">
                   Connexion
                 </Button>
                 <Button variant="accent" className="w-full">
                   Rejoindre FMDD
                 </Button>
               </div>
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
   );
 }