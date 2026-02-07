import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, GraduationCap, Briefcase, Rocket, Image, Quote, CalendarDays, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import LOGO from "@/assets/LOGO.jpg";

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { label: t('nav.home'), href: "/" },
    {
      label: t('nav.solutions'),
      href: "#solutions",
      children: [
        { label: t('nav.academy'), href: "/academy", icon: GraduationCap, description: t('nav.academyDesc') },
        { label: t('nav.insertion'), href: "/insertion", icon: Briefcase, description: t('nav.insertionDesc') },
        { label: t('nav.entrepreneurship'), href: "/projets", icon: Rocket, description: t('nav.entrepreneurshipDesc') },
      ],
    },
    {
      label: t('nav.content'),
      href: "#content",
      children: [
        { label: t('nav.gallery'), href: "/galerie", icon: Image, description: t('nav.galleryDesc') },
        { label: t('nav.testimonials'), href: "/temoignages", icon: Quote, description: t('nav.testimonialsDesc') },
        { label: t('nav.events'), href: "/evenements", icon: CalendarDays, description: t('nav.eventsDesc') },
        { label: t('nav.blog'), href: "/blog", icon: Newspaper, description: t('nav.blogDesc') },
      ],
    },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.contact'), href: "/contact" },
  ];

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
        isTransparent
          ? "bg-transparent py-5"
          : "bg-white/95 backdrop-blur-md shadow-md py-3"
      }`}
      role="banner"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Top Bar - visible only when at the top of home page or any content page */}
      {(isTransparent || !isHomePage) && (
        <div className={`hidden lg:block ${isTransparent ? 'bg-primary/20' : 'bg-muted/50'} backdrop-blur-sm`}>
          <div className="container mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+212645466188" className={`flex items-center gap-2 transition-colors ${isTransparent ? 'text-primary-foreground/80 hover:text-accent' : 'text-muted-foreground hover:text-primary'}`}>
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>+212 645 466 188</span>
              </a>
              <a href="mailto:contact@fmdd.ma" className={`flex items-center gap-2 transition-colors ${isTransparent ? 'text-primary-foreground/80 hover:text-accent' : 'text-muted-foreground hover:text-primary'}`}>
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@fmdd.ma</span>
              </a>
            </div>
            <div className={`flex items-center gap-4 transition-colors ${isTransparent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              <span>🇲🇦 {t('hero.badge')}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between" role="navigation" aria-label={t('nav.title') || "Navigation principale"}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label={`FMDD - ${t('nav.home')}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-display font-bold text-lg rounded-full"><img className="rounded-full" src={LOGO} alt="FMDD Logo"/></span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight transition-colors ${isTransparent ? 'text-primary-foreground' : 'text-foreground'}`}>
                FMDD
              </span>
              <span className={`text-xs leading-tight transition-colors ${isTransparent ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {t('nav.sustainableDev')}
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
                    isTransparent
                      ? "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                  role="menuitem"
                  aria-haspopup={link.children ? "true" : undefined}
                  aria-expanded={link.children ? activeSubmenu === link.label : undefined}
                >
                  {link.label}
                  {link.children && <ChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === link.label ? 'rotate-180' : ''}`} aria-hidden="true" />}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {link.children && activeSubmenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full pt-2 ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}
                      role="menu"
                      aria-label={`${t('nav.submenu')} ${link.label}`}
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
                            <div className={i18n.language === 'ar' ? 'text-right' : 'text-left'}>
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
            <LanguageSwitcher isTransparent={isTransparent} />
            {localStorage.getItem('token') ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className={`font-medium ${
                      isTransparent
                        ? "text-primary-foreground hover:bg-primary-foreground/10"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {JSON.parse(localStorage.getItem('user') || '{}').email?.split('@')[0]}
                  </Button>
                </Link>
                {JSON.parse(localStorage.getItem('user') || '{}').role === 'ADMIN' && (
                  <Link to="/admin">
                    <Button
                      variant="ghost"
                      className={`font-medium ${
                        isTransparent
                          ? "text-primary-foreground hover:bg-primary-foreground/10"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {t('nav.admin')}
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}
                  className={isTransparent ? "border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10" : ""}
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={`font-medium ${
                      isTransparent
                        ? "text-primary-foreground hover:bg-primary-foreground/10"
                        : "text-foreground hover:bg-muted"
                    }`}
                    aria-label={t('nav.login')}
                  >
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="accent" size="lg">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isTransparent
                ? "text-primary-foreground hover:bg-primary-foreground/10"
                : "text-foreground hover:bg-muted"
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
                <div className="flex justify-center mb-2">
                  <LanguageSwitcher variant="default" isTransparent={false} />
                </div>
                <Button variant="outline" className="w-full">{t('nav.login')}</Button>
                <Button variant="accent" className="w-full">{t('nav.joinFmdd')}</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}