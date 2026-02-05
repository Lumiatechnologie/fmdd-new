 import { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Menu, X, ChevronDown } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const navLinks = [
   { label: "Accueil", href: "/" },
   {
     label: "Nos Solutions",
     href: "#solutions",
     submenu: [
       { label: "FMDD Academy", href: "/academy" },
       { label: "Insertion Pro", href: "/insertion" },
       { label: "Lancer un Projet", href: "/projets" },
     ],
   },
   { label: "À propos", href: "/about" },
   { label: "Partenaires", href: "/partenaires" },
   { label: "Contact", href: "/contact" },
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
     >
       <div className="container mx-auto px-4 lg:px-8">
         <div className="flex items-center justify-between">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3 group">
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
           <nav className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
               <div
                 key={link.label}
                 className="relative"
                 onMouseEnter={() => link.submenu && setActiveSubmenu(link.label)}
                 onMouseLeave={() => setActiveSubmenu(null)}
               >
                 <Link
                   to={link.href}
                   className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors ${
                     isScrolled
                       ? "text-foreground hover:bg-muted"
                       : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                   }`}
                 >
                   {link.label}
                   {link.submenu && <ChevronDown className="w-4 h-4" />}
                 </Link>
 
                 {/* Submenu */}
                 <AnimatePresence>
                   {link.submenu && activeSubmenu === link.label && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 10 }}
                       transition={{ duration: 0.2 }}
                       className="absolute top-full left-0 pt-2"
                     >
                       <div className="bg-card rounded-xl shadow-lg border border-border p-2 min-w-[200px]">
                         {link.submenu.map((sublink) => (
                           <Link
                             key={sublink.label}
                             to={sublink.href}
                             className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                           >
                             {sublink.label}
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
             >
               Connexion
             </Button>
             <Button variant="accent" size="lg">
               Rejoindre FMDD
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
           >
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
           >
             <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
               {navLinks.map((link) => (
                 <div key={link.label}>
                   <Link
                     to={link.href}
                     onClick={() => !link.submenu && setIsMobileMenuOpen(false)}
                     className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                   >
                     {link.label}
                   </Link>
                   {link.submenu && (
                     <div className="pl-4">
                       {link.submenu.map((sublink) => (
                         <Link
                           key={sublink.label}
                           to={sublink.href}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                         >
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