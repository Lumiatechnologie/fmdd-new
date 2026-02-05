 import { Link } from "react-router-dom";
 import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
 
 const footerLinks = {
   solutions: [
     { label: "FMDD Academy", href: "/academy" },
     { label: "Insertion Pro", href: "/insertion" },
     { label: "Lancer un Projet", href: "/projets" },
     { label: "Témoignages", href: "/temoignages" },
   ],
   about: [
     { label: "À propos du FMDD", href: "/about" },
     { label: "Notre équipe", href: "/equipe" },
     { label: "Partenaires", href: "/partenaires" },
     { label: "Presse", href: "/presse" },
   ],
   resources: [
     { label: "Centre d'aide", href: "/aide" },
     { label: "Blog", href: "/blog" },
     { label: "FAQ", href: "/faq" },
     { label: "Contact", href: "/contact" },
   ],
   legal: [
     { label: "Mentions légales", href: "/mentions-legales" },
     { label: "Politique de confidentialité", href: "/confidentialite" },
     { label: "CGU", href: "/cgu" },
   ],
 };
 
 const socialLinks = [
   { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
   { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
   { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
 ];
 
 export function Footer() {
   return (
     <footer className="bg-sidebar text-sidebar-foreground">
       {/* Main Footer */}
       <div className="container mx-auto px-4 lg:px-8 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
           {/* Brand Column */}
           <div className="lg:col-span-2">
             <Link to="/" className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                 <span className="text-primary-foreground font-display font-bold text-xl">F</span>
               </div>
               <div className="flex flex-col">
                 <span className="font-display font-bold text-xl leading-tight text-sidebar-foreground">
                   FMDD
                 </span>
                 <span className="text-sm leading-tight text-sidebar-foreground/70">
                   Forum Marocain pour le Développement Durable
                 </span>
               </div>
             </Link>
             <p className="text-sidebar-foreground/70 mb-6 max-w-sm">
               Plateforme digitale unissant jeunes, écoles, recruteurs et formateurs pour construire un avenir durable au Maroc.
             </p>
             
             {/* Contact Info */}
             <div className="space-y-3">
               <a
                 href="mailto:contact@fmdd.ma"
                 className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
               >
                 <Mail className="w-5 h-5" />
                 <span>contact@fmdd.ma</span>
               </a>
               <a
                 href="tel:+212522000000"
                 className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
               >
                 <Phone className="w-5 h-5" />
                 <span>+212 522 00 00 00</span>
               </a>
               <div className="flex items-start gap-3 text-sidebar-foreground/70">
                 <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                 <span>Casablanca, Maroc</span>
               </div>
             </div>
           </div>
 
           {/* Solutions Column */}
           <div>
             <h4 className="font-display font-semibold text-sidebar-foreground mb-4">
               Solutions
             </h4>
             <ul className="space-y-3">
               {footerLinks.solutions.map((link) => (
                 <li key={link.label}>
                   <Link
                     to={link.href}
                     className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* About Column */}
           <div>
             <h4 className="font-display font-semibold text-sidebar-foreground mb-4">
               À propos
             </h4>
             <ul className="space-y-3">
               {footerLinks.about.map((link) => (
                 <li key={link.label}>
                   <Link
                     to={link.href}
                     className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Resources Column */}
           <div>
             <h4 className="font-display font-semibold text-sidebar-foreground mb-4">
               Ressources
             </h4>
             <ul className="space-y-3">
               {footerLinks.resources.map((link) => (
                 <li key={link.label}>
                   <Link
                     to={link.href}
                     className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
 
       {/* Bottom Bar */}
       <div className="border-t border-sidebar-border">
         <div className="container mx-auto px-4 lg:px-8 py-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-6">
               <p className="text-sm text-sidebar-foreground/60">
                 © {new Date().getFullYear()} FMDD. Tous droits réservés.
               </p>
               <div className="hidden md:flex items-center gap-4">
                 {footerLinks.legal.map((link) => (
                   <Link
                     key={link.label}
                     to={link.href}
                     className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                   >
                     {link.label}
                   </Link>
                 ))}
               </div>
             </div>
 
             {/* Social Links */}
             <div className="flex items-center gap-3">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={social.label}
                   className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent/80 transition-colors"
                 >
                   <social.icon className="w-5 h-5" />
                 </a>
               ))}
             </div>
           </div>
         </div>
       </div>
     </footer>
   );
 }