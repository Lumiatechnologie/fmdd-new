import { motion } from "framer-motion";
import { Compass, GraduationCap, Users, Banknote, Hammer, MessageSquare, Leaf, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MissionSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const pillars = [
    { id: "orientation", icon: Compass, title: t('home.mission.pillars.orientation'), color: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop" },
    { id: "formation", icon: GraduationCap, title: t('home.mission.pillars.formation'), color: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop" },
    { id: "accompagnement", icon: Users, title: t('home.mission.pillars.accompagnement'), color: "bg-amber-500", light: "bg-amber-50", text: "text-amber-600", image: "https://images.unsplash.com/photo-1521791136364-798a7bc0d262?w=400&h=400&fit=crop" },
    { id: "financement", icon: Banknote, title: t('home.mission.pillars.financement'), color: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop" },
    { id: "workshop", icon: Hammer, title: t('home.mission.pillars.workshop'), color: "bg-rose-500", light: "bg-rose-50", text: "text-rose-600", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" },
    { id: "coaching", icon: MessageSquare, title: t('home.mission.pillars.coaching'), color: "bg-violet-500", light: "bg-violet-50", text: "text-violet-600", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800" },
    { id: "durability", icon: Leaf, title: t('home.mission.pillars.durability'), color: "bg-green-600", light: "bg-green-50", text: "text-green-700", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Content */}
          <div className={`w-full lg:w-1/2 ${isRTL ? "lg:text-right" : "lg:text-left"}`}>
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
             >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  {t('home.mission.badge')}
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
                  {t('home.mission.title_part1')}{" "}
                  <span className="text-gradient-primary block">{t('home.mission.title_part2')}</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  {t('home.mission.description')}
                </p>
             </motion.div>

             <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
             >
                {pillars.map((pillar) => (
                  <motion.div 
                    key={pillar.id}
                    variants={itemVariants}
                    className="flex items-center gap-6 group cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-xl ${pillar.light} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                      <pillar.icon className={`w-6 h-6 ${pillar.text}`} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {pillar.title}
                            </span>
                            <CheckCircle2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="w-full h-px bg-border mt-2 group-hover:bg-primary/30 transition-colors" />
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          </div>

          {/* Right Side: Visual Design */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Image Container */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-muted"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop" 
                        alt="Collaboration" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </motion.div>

                {/* Floating Elements mimicking the banner's circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-background overflow-hidden shadow-xl hidden sm:block">
                    <img src={pillars[0].image} alt="Orientation" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/4 -right-20 w-32 h-32 rounded-full border-4 border-background overflow-hidden shadow-xl hidden xl:block">
                    <img src={pillars[1].image} alt="Formation" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1/4 -right-10 w-36 h-36 rounded-full border-4 border-background overflow-hidden shadow-xl hidden sm:block">
                    <img src={pillars[6].image} alt="Durability" className="w-full h-full object-cover" />
                </div>
                
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border-4 border-background overflow-hidden shadow-xl hidden sm:block">
                    <img src={pillars[2].image} alt="Accompagnement" className="w-full h-full object-cover" />
                </div>

                {/* Decorative blobs */}
                <div className="absolute -z-10 -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
