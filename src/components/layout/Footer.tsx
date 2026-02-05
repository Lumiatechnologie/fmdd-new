 import { Link } from "react-router-dom";
 import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
 import LOGO from "../../assets/LOGO.jpg";
 const footerLinks = {
   solutions: [
     { label: "FMDD Academy", href: "/academy", description: "Formations certifiantes" },
     { label: "Insertion Pro", href: "/insertion", description: "Emploi et recrutement" },
     { label: "Entrepreneuriat", href: "/projets", description: "Création d'entreprise" },
     { label: "Témoignages", href: "/temoignages" },
   ],
   about: [
     { label: "Qui sommes-nous", href: "/about" },
     { label: "Notre équipe", href: "/equipe" },
     { label: "Partenaires", href: "/partenaires" },
     { label: "Presse", href: "/presse" },
   ],
   resources: [
     { label: "Centre d'aide", href: "/aide" },
     { label: "Blog", href: "/blog" },
     { label: "FAQ", href: "/faq" },
     { label: "Nous contacter", href: "/contact" },
   ],
   legal: [
     { label: "Mentions légales", href: "/mentions-legales" },
     { label: "Politique de confidentialité", href: "/confidentialite" },
     { label: "CGU", href: "/cgu" },
   ],
 };
 
 const socialLinks = [
   { icon: Facebook, href: "https://web.facebook.com/p/Forum-Marocain-Pour-Le-D%C3%A9veloppement-Durable-61573191698612/?_rdc=1&_rdr#", label: "Facebook FMDD" },
   { icon: Linkedin, href: "https://www.linkedin.com/company/forum-marocain-pour-le-d%C3%A9veloppement-durable/posts/?feedView=all", label: "LinkedIn FMDD" },
   { icon: Instagram, href: "https://www.instagram.com/f.m.d.d/", label: "Instagram FMDD" }
 ];
 
 export function Footer() {
   return (
     <footer className="bg-sidebar text-sidebar-foreground" role="contentinfo" itemScope itemType="https://schema.org/Organization">
       {/* Main Footer */}
       <div className="container mx-auto px-4 lg:px-8 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
           {/* Brand Column */}
           <div className="lg:col-span-2">
             <Link to="/" className="flex items-center gap-3 mb-6" aria-label="FMDD - Accueil">
               <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                 <span className="text-primary-foreground font-display font-bold text-xl"><img className="rounded-full"src={LOGO} alt="" /></span>
               </div>
               <div className="flex flex-col">
                 <span className="font-display font-bold text-xl leading-tight text-sidebar-foreground" itemProp="name">
                   FMDD
                 </span>
                 <span className="text-sm leading-tight text-sidebar-foreground/70">
                   Forum Marocain pour le Développement Durable
                 </span>
               </div>
             </Link>
             <p className="text-sidebar-foreground/70 mb-6 max-w-sm" itemProp="description">
               Le FMDD accompagne les jeunes marocains vers la réussite professionnelle : 
               formations certifiantes, insertion dans l'emploi et accompagnement entrepreneurial.
             </p>
             
             {/* Contact Info */}
             <address className="space-y-3 not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
               <a
                 href="mailto:contact@fmdd.ma"
                 className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                 itemProp="email"
               >
                 <Mail className="w-5 h-5" aria-hidden="true" />
                 <span>contact@fmdd.ma</span>
               </a>
               <a
                 href="tel:+212 645 466 188"
                 className="flex items-center gap-3 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors"
                 itemProp="telephone"
               >
                 <Phone className="w-5 h-5" aria-hidden="true" />
                 <span>+212 645 466 188</span>
               </a>
               <div className="flex items-start gap-3 text-sidebar-foreground/70">
                 <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                 <span>
                   <span itemProp="addressLocality">Casablanca</span>, <span itemProp="addressCountry">Maroc</span>
                 </span>
               </div>
             </address>
           </div>
 
           {/* Solutions Column */}
           <nav aria-label="Solutions FMDD">
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
           </nav>
 
           {/* About Column */}
           <nav aria-label="À propos du FMDD">
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
           </nav>
 
           {/* Resources Column */}
           <nav aria-label="Ressources FMDD">
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
           </nav>
         </div>
       </div>
 
       {/* Bottom Bar */}
       <div className="border-t border-sidebar-border">
         <div className="container mx-auto px-4 lg:px-8 py-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-6">
               <p className="text-sm text-sidebar-foreground/60">
                 © {new Date().getFullYear()} Forum Marocain pour le Développement Durable. Tous droits réservés.
               </p>
               <nav className="hidden md:flex items-center gap-4" aria-label="Liens légaux">
                 {footerLinks.legal.map((link) => (
                   <Link
                     key={link.label}
                     to={link.href}
                     className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                   >
                     {link.label}
                   </Link>
                 ))}
               </nav>
             </div>
 
             {/* Social Links */}
             <div className="flex items-center gap-3" role="list" aria-label="Réseaux sociaux FMDD">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={social.label}
                   className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent/80 transition-colors"
                   role="listitem"
                 >
                   <social.icon className="w-5 h-5" aria-hidden="true" />
                 </a>
               ))}
             </div>
           </div>
         </div>
       </div>
     </footer>
   );
 }