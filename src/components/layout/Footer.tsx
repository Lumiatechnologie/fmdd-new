import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import LOGO from "../../assets/LOGO.jpg";

export function Footer() {
  const { t, i18n } = useTranslation();
  
  const footerLinks = {
    solutions: [
      { label: t('nav.academy'), href: "/academy", description: t('nav.academyDesc') },
      { label: t('nav.insertion'), href: "/insertion", description: t('nav.insertionDesc') },
      { label: t('nav.entrepreneurship'), href: "/projets", description: t('nav.entrepreneurshipDesc') },
      { label: t('nav.testimonials'), href: "/temoignages" },
    ],
    about: [
      { label: t('footer.whoAreWe'), href: "/about" },
      { label: t('footer.team'), href: "/equipe" },
      { label: t('footer.partners'), href: "/partenaires" },
      { label: t('footer.press'), href: "/presse" },
    ],
    resources: [
      { label: t('footer.helpCenter'), href: "/aide" },
      { label: t('nav.blog'), href: "/blog" },
      { label: t('footer.faq'), href: "/faq" },
      { label: t('footer.contactUs'), href: "/contact" },
    ],
    legal: [
      { label: t('footer.mentions'), href: "/mentions-legales" },
      { label: t('footer.privacy'), href: "/confidentialite" },
      { label: t('footer.cgu'), href: "/cgu" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://web.facebook.com/p/Forum-Marocain-Pour-Le-D%C3%A9veloppement-Durable-61573191698612/?_rdc=1&_rdr#", label: "Facebook FMDD" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/forum-marocain-pour-le-d%C3%A9veloppement-durable/posts/?feedView=all", label: "LinkedIn FMDD" },
    { icon: Instagram, href: "https://www.instagram.com/f.m.d.d/", label: "Instagram FMDD" }
  ];

  return (
    <footer 
      className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border" 
      role="contentinfo" 
      itemScope 
      itemType="https://schema.org/Organization"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group" aria-label={`FMDD - ${t('nav.home')}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-105" aria-hidden="true">
                <span className="text-primary-foreground font-display font-bold text-xl"><img className="rounded-full" src={LOGO} alt="FMDD Logo" /></span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight text-sidebar-foreground" itemProp="name">
                  FMDD
                </span>
                <span className="text-sm leading-tight text-sidebar-foreground/70">
                  {t('nav.sustainableDev')}
                </span>
              </div>
            </Link>
            <p className="text-sidebar-foreground/70 mb-8 max-w-sm leading-relaxed" itemProp="description">
              {t('footer.tagline')}
            </p>
            
            {/* Contact Info */}
            <address className="space-y-4 not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <a
                href="mailto:contact@fmdd.ma"
                className="flex items-center gap-4 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors group"
                itemProp="email"
              >
                <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0 group-hover:bg-sidebar-primary/10">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <span>contact@fmdd.ma</span>
              </a>
              <a
                href="tel:+212645466188"
                className="flex items-center gap-4 text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors group"
                itemProp="telephone"
              >
                <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0 group-hover:bg-sidebar-primary/10">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <span>+212 645 466 188</span>
              </a>
              <div className="flex items-start gap-4 text-sidebar-foreground/70">
                <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="pt-2">
                  <span itemProp="addressLocality">Casablanca</span>, <span itemProp="addressCountry">Maroc</span>
                </span>
              </div>
            </address>
          </div>

          {/* Solutions Column */}
          <nav aria-label={t('footer.solutions')}>
            <h4 className="font-display font-semibold text-sidebar-foreground mb-6 uppercase tracking-wider text-xs">
              {t('footer.solutions')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* About Column */}
          <nav aria-label={t('footer.about')}>
            <h4 className="font-display font-semibold text-sidebar-foreground mb-6 uppercase tracking-wider text-xs">
              {t('footer.about')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Column */}
          <nav aria-label={t('footer.resources')}>
            <h4 className="font-display font-semibold text-sidebar-foreground mb-6 uppercase tracking-wider text-xs">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors block"
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
      <div className="border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="text-sm text-sidebar-foreground/60 text-center md:text-left">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <nav className="flex items-center gap-6" aria-label={t('footer.legal')}>
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs font-medium text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4" role="list" aria-label="Social media FMDD">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-primary transition-all shadow-sm"
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