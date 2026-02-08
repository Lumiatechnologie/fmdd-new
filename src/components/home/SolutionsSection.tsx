import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Rocket, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SolutionsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const solutions = [
    {
      id: "academy",
      icon: GraduationCap,
      title: "FMDD Academy",
      subtitle: t('home.solutions.academy.subtitle'),
      description: t('home.solutions.academy.description'),
      features: t('home.solutions.academy.features', { returnObjects: true }) as string[],
      color: "primary",
      gradient: "from-primary to-secondary",
      href: "/academy",
      cta: t('home.solutions.academy.cta'),
    },
    {
      id: "insertion",
      icon: Briefcase,
      title: "FMDD JOB",
      subtitle: t('home.solutions.insertion.subtitle'),
      description: t('home.solutions.insertion.description'),
      features: t('home.solutions.insertion.features', { returnObjects: true }) as string[],
      color: "accent",
      gradient: "from-accent to-amber-400",
      href: "/insertion",
      cta: t('home.solutions.insertion.cta'),
    },
    {
      id: "projets",
      icon: Rocket,
      title: "FMDD Entrepreneuriat",
      subtitle: t('home.solutions.entrepreneurship.subtitle'),
      description: t('home.solutions.entrepreneurship.description'),
      features: t('home.solutions.entrepreneurship.features', { returnObjects: true }) as string[],
      color: "success",
      gradient: "from-success to-emerald-400",
      href: "/projets",
      cta: t('home.solutions.entrepreneurship.cta'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      id="solutions" 
      className="py-24 lg:py-32 bg-muted/30"
      aria-labelledby="solutions-title"
      itemScope 
      itemType="https://schema.org/ItemList"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? "rtl" : "ltr"}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4" aria-hidden="true">
            {t('home.solutions.badge')}
          </span>
          <h2 id="solutions-title" className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('home.solutions.title1')}{" "}
            <span className="text-gradient-primary">{t('home.solutions.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('home.solutions.description')}
          </p>
        </motion.div>

        {/* Solutions Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              variants={cardVariants}
              className={`group relative bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border hover:border-primary/20 ${isRTL ? "text-right" : "text-left"}`}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
            >
                <meta itemProp="position" content={String(index + 1)} />
              {/* Gradient Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${solution.gradient}`} />
              
              <div className="p-8">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 shadow-lg ${isRTL ? "ml-auto" : "mr-auto"}`}>
                  <solution.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <span className="text-sm font-medium text-muted-foreground">
                  {solution.subtitle}
                </span>
                  <h3 className="text-2xl font-display font-bold text-foreground mt-1 mb-3" itemProp="name">
                  {solution.title}
                </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" itemProp="description">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {Array.isArray(solution.features) && solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm">
                      <CheckCircle className={`w-5 h-5 text-${solution.color} flex-shrink-0`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to={solution.href}>
                  <Button variant="outline" className="w-full group/btn">
                    {solution.cta}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover/btn:-translate-x-1" : "group-hover/btn:translate-x-1"}`} />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}