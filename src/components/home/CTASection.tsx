import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function CTASection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-hero rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden"
        >
          {/* Inner Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              {t('home.cta.description')}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? "rtl" : "ltr"}`}>
              <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                {t('home.cta.button1')}
                <ArrowRight className={`w-5 h-5 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </Button>
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                {t('home.cta.button2')}
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              {t('home.cta.features')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}