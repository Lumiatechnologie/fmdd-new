import { motion, useInView, useSpring, useTransform, useMotionValue, animate } from "framer-motion";
import { TrendingUp, Users, Award, Building } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");
  
  // Extract number and suffix (e.g., "15,000+" -> number: 15000, suffix: "+")
  const numericPart = value.replace(/[^0-9]/g, "");
  const targetNumber = parseInt(numericPart, 10);
  const suffix = value.replace(/[0-9,]/g, "");
  const hasComma = value.includes(",");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          let rounded = Math.floor(value);
          let formatted = rounded.toString();
          
          if (hasComma) {
            formatted = rounded.toLocaleString();
          }
          
          setDisplayValue(`${formatted}${suffix}`);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, suffix, hasComma]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      icon: Users,
      value: "15,000+",
      label: t('home.stats.youth.label'),
      description: t('home.stats.youth.desc'),
    },
    {
      icon: TrendingUp,
      value: "87%",
      label: t('home.stats.insertion.label'),
      description: t('home.stats.insertion.desc'),
    },
    {
      icon: Award,
      value: "200+",
      label: t('home.stats.formations.label'),
      description: t('home.stats.formations.desc'),
    },
    {
      icon: Building,
      value: "150+",
      label: t('home.stats.partners.label'),
      description: t('home.stats.partners.desc'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`text-center ${isRTL ? "rtl" : "ltr"}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-lg font-semibold text-primary-foreground/90 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/60">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}