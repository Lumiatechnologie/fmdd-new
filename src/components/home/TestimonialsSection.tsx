import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const testimonials = [
    {
      id: 1,
      name: "Fatima Zahra El Amrani",
      role: t('home.testimonials.items.1.role'),
      company: "TechCorp Maroc",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      content: t('home.testimonials.items.1.content'),
      rating: 5,
    },
    {
      id: 2,
      name: "Youssef Benali",
      role: t('home.testimonials.items.2.role'),
      company: "GreenTech Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: t('home.testimonials.items.2.content'),
      rating: 5,
    },
    {
      id: 3,
      name: "Amina Tazi",
      role: t('home.testimonials.items.3.role'),
      company: "Digital Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: t('home.testimonials.items.3.content'),
      rating: 5,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            {t('home.testimonials.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('home.testimonials.title1')}{" "}
            <span className="text-gradient-primary">{t('home.testimonials.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('home.testimonials.description')}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-border relative ${isRTL ? "text-right" : "text-left"}`}
            >
              {/* Quote Icon */}
              <div className={`absolute top-6 ${isRTL ? "left-6" : "right-6"}`}>
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className={`flex gap-1 mb-4 ${isRTL ? "justify-start" : "justify-start"}`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}