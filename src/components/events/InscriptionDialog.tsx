import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FileUp, Send, CheckCircle2, QrCode, Printer, Download } from "lucide-react";
import api from "@/lib/api";

interface InscriptionDialogProps {
  eventId?: string;
  eventTitle?: string;
  trigger?: React.ReactNode;
}

export function InscriptionDialog({ eventId, eventTitle, trigger }: InscriptionDialogProps) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    qr_entry: string;
    qr_cv: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
    cv: null as File | null,
  });

  const isRTL = i18n.language === 'ar';

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      message: "",
      cv: null,
    });
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cv) return toast.error(t('inscription.cvRequired'));

    setLoading(true);
    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("prenom", formData.prenom);
    data.append("email", formData.email);
    data.append("telephone", formData.telephone);
    data.append("message", formData.message);
    data.append("cv", formData.cv);
    data.append("dossier_name", "inscriptions-events");
    if (eventId) data.append("event_id", eventId);

    try {
      const response = await api.post("/inscriptions", data);
      setResult({
        message: response.data.message,
        qr_entry: response.data.urls.qr_entry,
        qr_cv: response.data.urls.qr_cv,
      });
      toast.success(t('inscription.validated'));
    } catch (error: any) {
      toast.error(error.response?.data?.error || t('inscription.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setTimeout(resetForm, 300);
    }}>
      <DialogTrigger asChild>
        {trigger || <Button variant="accent">{t('inscription.title')}</Button>}
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-xl max-h-[90vh] overflow-y-auto"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold flex items-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {result ? (
              <span className={`flex items-center gap-2 text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-6 h-6" /> 
                {t('inscription.successTitle')}
              </span>
            ) : (
              `${t('inscription.title')} : ${eventTitle || t('common.event')}`
            )}
          </DialogTitle>
          <DialogDescription className={isRTL ? 'text-right' : 'text-left'}>
            {result 
              ? t('inscription.successSub') 
              : t('inscription.formSub')}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5 pt-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom" className={isRTL ? 'block text-right' : ''}>{t('inscription.firstName')}</Label>
                  <Input 
                    id="prenom" 
                    required 
                    className={isRTL ? 'text-right' : ''}
                    value={formData.prenom}
                    onChange={e => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom" className={isRTL ? 'block text-right' : ''}>{t('inscription.lastName')}</Label>
                  <Input 
                    id="nom" 
                    required 
                    className={isRTL ? 'text-right' : ''}
                    value={formData.nom}
                    onChange={e => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={isRTL ? 'block text-right' : ''}>{t('inscription.email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  className={isRTL ? 'text-right' : ''}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tel" className={isRTL ? 'block text-right' : ''}>{t('inscription.phone')}</Label>
                <Input 
                  id="tel" 
                  className={isRTL ? 'text-right font-mono' : ''}
                  value={formData.telephone}
                  onChange={e => setFormData({...formData, telephone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="msg" className={isRTL ? 'block text-right' : ''}>{t('inscription.message')}</Label>
                <Textarea 
                  id="msg" 
                  className={isRTL ? 'text-right' : ''}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label className={isRTL ? 'block text-right' : ''}>{t('inscription.cv')}</Label>
                <div className={`border-2 border-dashed rounded-xl p-6 transition-colors ${formData.cv ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'}`}>
                  <input 
                    type="file" 
                    id="cv-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={e => setFormData({...formData, cv: e.target.files?.[0] || null})}
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <FileUp className={`w-8 h-8 ${formData.cv ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">
                      {formData.cv ? formData.cv.name : t('inscription.upload')}
                    </span>
                  </label>
                </div>
              </div>

              <Button type="submit" className={`w-full h-12 font-bold gap-2 shadow-glow ${isRTL ? 'flex-row-reverse' : ''}`} disabled={loading}>
                {loading ? <div className="w-5 h-5 border-2 border-t-transparent animate-spin rounded-full" /> : <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />}
                {t('inscription.submit')}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 pt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold mb-4">{t('inscription.qrAccess')}</h4>
                  <img src={result.qr_entry} alt={t('inscription.qrAccess')} className="w-full max-w-[200px] aspect-square" />
                  <p className="text-[10px] text-muted-foreground mt-4 text-center">{t('inscription.qrAccessDesc')}</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <FileUp className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-sm font-bold mb-4">{t('inscription.qrCv')}</h4>
                  <img src={result.qr_cv} alt={t('inscription.qrCv')} className="w-full max-w-[200px] aspect-square" />
                  <p className="text-[10px] text-muted-foreground mt-4 text-center">{t('inscription.qrCvDesc')}</p>
                </div>
              </div>

              <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => window.print()}>
                  <Printer className="w-4 h-4" /> {t('inscription.print')}
                </Button>
                <Button variant="secondary" className="flex-1 gap-2" onClick={resetForm}>
                  {t('inscription.new')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
