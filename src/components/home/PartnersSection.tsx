import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Duplicate partners to create a seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-muted/50 border-y border-border overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        .rtl-marquee {
            animation: marquee 40s linear infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t('home.partners.badge')}
          </p>
        </motion.div>

        <div className="marquee-container relative w-full overflow-hidden py-4 group">
          {/* Gradients to fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />

          <div 
            className="marquee-content rtl-marquee flex items-center gap-8 lg:gap-12 w-max"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center justify-center w-36 h-20 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group/card flex-shrink-0"
              >
                <span className="font-display font-bold text-xl text-muted-foreground group-hover/card:text-primary transition-colors">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}