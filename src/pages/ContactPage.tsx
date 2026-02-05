import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      toast.success(t('contact.form.success'));
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactInfo = [
    { icon: Phone, label: t('contact.info.phone'), value: t('contact.info.phone_value'), href: `tel:${t('contact.info.phone_value').replace(/\s/g, '')}` },
    { icon: Mail, label: t('contact.info.email'), value: t('contact.info.email_value'), href: `mailto:${t('contact.info.email_value')}` },
    { icon: MapPin, label: t('contact.info.address'), value: t('contact.info.address_value'), href: "#" },
    { icon: Clock, label: t('contact.info.working_hours'), value: t('contact.info.working_hours_value'), href: null },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                {t('contact.badge')}
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">{t('contact.title')}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('contact.description')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4 p-6 bg-card rounded-2xl border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-semibold text-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder or Visual Illustration */}
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted border border-border flex items-center justify-center">
                   <div className="text-center p-8">
                      <MessageCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground/50 font-medium">FMDD Global Headquarters • Casablanca</p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 sm:p-10 rounded-3xl shadow-xl border border-border"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input id="name" required placeholder="Ali Benali" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                      <Input id="email" type="email" required placeholder="ali@example.com" className="bg-muted/30" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                    <Input id="subject" required placeholder={t('contact.form.subject')} className="bg-muted/30" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="..." 
                      rows={6} 
                      className="bg-muted/30 resize-none" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="xl" 
                    disabled={isSending}
                    variant="accent"
                  >
                    {isSending ? t('contact.form.sending') : (
                      <>
                        {t('contact.form.submit')}
                        <Send className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
