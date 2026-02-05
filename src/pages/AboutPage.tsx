import { motion } from "framer-motion";
import { Target, Eye, Heart, Shield, Award, Users, Rocket, Milestone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const values = [
    { icon: Award, title: t('about.values.excellence'), color: "primary" },
    { icon: Shield, title: t('about.values.integrity'), color: "accent" },
    { icon: Rocket, title: t('about.values.innovation'), color: "success" },
    { icon: Heart, title: t('about.values.solidarity'), color: "secondary" },
  ];

  const stats = [
    { label: t('about.stats.founded'), value: "2018" },
    { label: t('about.stats.members'), value: "15K+" },
    { label: t('about.stats.projects'), value: "450+" },
    { label: t('about.stats.partners'), value: "150+" },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 text-sm font-medium">
                {t('about.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-8 max-w-4xl mx-auto leading-tight">
                {t('about.title')}
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-card rounded-2xl shadow-sm border border-border"
                >
                  <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-bold">{t('about.mission.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.mission.content')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-display font-bold">{t('about.vision.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.vision.content')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">{t('about.values.title')}</h2>
              <div className="w-20 h-1.5 bg-primary/20 mx-auto rounded-full" />
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-${value.color}/10 flex items-center justify-center mx-auto mb-6 transition-colors group-hover:bg-${value.color}`}>
                    <value.icon className={`w-7 h-7 text-${value.color} group-hover:text-white`} />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
