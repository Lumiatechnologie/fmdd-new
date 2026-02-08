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
    fullName: "",
    email: "",
    telephone: "",
    domaineFormation: "",
    niveauEtudes: "",
    message: "",
    cv: null as File | null,
  });

  const isRTL = i18n.language === 'ar';

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      telephone: "",
      domaineFormation: "",
      niveauEtudes: "",
      message: "",
      cv: null,
    });
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cv) return toast.error(t('pages.inscription.cvRequired'));

    setLoading(true);
    const data = new FormData();
    const [prenom, ...nomParts] = formData.fullName.trim().split(" ");
    const nom = nomParts.join(" ") || prenom;

    data.append("nom", nom);
    data.append("prenom", prenom || "");
    data.append("email", formData.email);
    data.append("telephone", formData.telephone);
    data.append("domaine_formation", formData.domaineFormation);
    data.append("niveau_etudes", formData.niveauEtudes);
    data.append("message", formData.message || "Inscription Job Day");
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
      toast.success(t('pages.inscription.validated'));
    } catch (error: any) {
      toast.error(error.response?.data?.error || t('pages.inscription.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header Background
    ctx.fillStyle = "#1e40af"; // Primary color
    ctx.fillRect(0, 0, canvas.width, 150);

    // Header Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FMDD - JOB DAY IFIAG", canvas.width / 2, 70);
    ctx.font = "24px Arial";
    ctx.fillText("Confirmation d'Inscription / تأكيد التسجيل", canvas.width / 2, 110);

    // User Info Section
    ctx.textAlign = "left";
    ctx.fillStyle = "#333333";
    ctx.font = "bold 30px Arial";
    ctx.fillText("Informations personnelles :", 50, 220);
    ctx.font = "24px Arial";
    ctx.fillText(`Nom Complet: ${formData.fullName}`, 70, 270);
    ctx.fillText(`Email: ${formData.email}`, 70, 310);
    ctx.fillText(`Domaine: ${t(`pages.inscription.domains.${formData.domaineFormation.toLowerCase()}`)}`, 70, 350);
    ctx.fillText(`Niveau: ${t(`pages.inscription.levels.${formData.niveauEtudes.toLowerCase().replace('+', '')}`)}`, 70, 390);

    // QR Codes Section
    const loadImg = (src: string) => new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    try {
      const [qrEntryImg, qrCvImg] = await Promise.all([
        loadImg(result.qr_entry),
        loadImg(result.qr_cv)
      ]);

      // Draw QR 1
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(50, 450, 340, 450);
      ctx.drawImage(qrEntryImg, 70, 470, 300, 300);
      ctx.fillStyle = "#1e40af";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("QR CODE D'ACCÈS", 220, 810);
      ctx.fillStyle = "#666666";
      ctx.font = "16px Arial";
      ctx.fillText("(Présentez à l'accueil)", 220, 840);

      // Draw QR 2
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(410, 450, 340, 450);
      ctx.drawImage(qrCvImg, 430, 470, 300, 300);
      ctx.fillStyle = "#1e40af";
      ctx.font = "bold 20px Arial";
      ctx.fillText("QR CODE CV", 580, 810);
      ctx.fillStyle = "#666666";
      ctx.font = "16px Arial";
      ctx.fillText("(Pour les recruteurs)", 580, 840);

      // Footer
      ctx.fillStyle = "#f9fafb";
      ctx.fillRect(0, 1050, canvas.width, 150);
      ctx.fillStyle = "#666666";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Merci d'avoir choisi FMDD. Présentez ce ticket le jour de l'événement.", canvas.width / 2, 1100);
      ctx.fillText("Date: 14 Février 2026 | IFIAG Casablanca", canvas.width / 2, 1130);

      // Trigger Download
      const link = document.createElement("a");
      link.download = `Ticket-JobDay-FMDD-${formData.fullName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Ticket téléchargé !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la génération du ticket.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setTimeout(resetForm, 300);
    }}>
      <DialogTrigger asChild>
        {trigger || <Button variant="accent">{t('pages.inscription.title')}</Button>}
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
                {t('pages.inscription.successTitle')}
              </span>
            ) : (
              `${t('pages.inscription.title')} : ${eventTitle || t('common.event')}`
            )}
          </DialogTitle>
          <DialogDescription className={isRTL ? 'text-right' : 'text-left'}>
            {result 
              ? t('pages.inscription.successSub') 
              : t('pages.inscription.formSub')}
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
              <div className="space-y-2">
                <Label htmlFor="fullName" className={isRTL ? 'block text-right' : ''}>
                  {t('pages.inscription.fullName')}
                </Label>
                <Input 
                  id="fullName" 
                  required 
                  placeholder={t('pages.inscription.fullNameHint')}
                  className={isRTL ? 'text-right' : ''}
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={isRTL ? 'block text-right' : ''}>
                  {t('pages.inscription.email')}
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder={t('pages.inscription.emailHint')}
                  className={isRTL ? 'text-right' : ''}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tel" className={isRTL ? 'block text-right' : ''}>
                  {t('pages.inscription.phone')}
                </Label>
                <Input 
                  id="tel" 
                  required
                  placeholder={t('pages.inscription.phoneHint')}
                  className={isRTL ? 'text-right font-mono' : ''}
                  value={formData.telephone}
                  onChange={e => setFormData({...formData, telephone: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domain" className={isRTL ? 'block text-right' : ''}>{t('pages.inscription.domain')}</Label>
                  <select
                    id="domain"
                    required
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isRTL ? 'text-right' : ''}`}
                    value={formData.domaineFormation}
                    onChange={e => setFormData({...formData, domaineFormation: e.target.value})}
                  >
                    <option value="">-- {t('common.filter')} --</option>
                    <option value="IT">{t('pages.inscription.domains.it')}</option>
                    <option value="RH">{t('pages.inscription.domains.rh')}</option>
                    <option value="Management">{t('pages.inscription.domains.management')}</option>
                    <option value="Marketing">{t('pages.inscription.domains.marketing')}</option>
                    <option value="Finance">{t('pages.inscription.domains.finance')}</option>
                    <option value="Autre">{t('pages.inscription.domains.autre')}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level" className={isRTL ? 'block text-right' : ''}>{t('pages.inscription.level')}</Label>
                  <select
                    id="level"
                    required
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${isRTL ? 'text-right' : ''}`}
                    value={formData.niveauEtudes}
                    onChange={e => setFormData({...formData, niveauEtudes: e.target.value})}
                  >
                    <option value="">-- {t('common.filter')} --</option>
                    <option value="Bac">{t('pages.inscription.levels.bac')}</option>
                    <option value="Bac+2">{t('pages.inscription.levels.bac2')}</option>
                    <option value="Bac+3">{t('pages.inscription.levels.bac3')}</option>
                    <option value="Bac+5">{t('pages.inscription.levels.bac5')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className={isRTL ? 'block text-right' : ''}>{t('pages.inscription.cv')}</Label>
                <div className={`border-2 border-dashed rounded-xl p-6 transition-colors ${formData.cv ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'}`}>
                  <input 
                    type="file" 
                    id="cv-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={e => setFormData({...formData, cv: e.target.files?.[0] || null})}
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <FileUp className={`w-8 h-8 ${formData.cv ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium text-center">
                      {formData.cv ? formData.cv.name : t('pages.inscription.upload')}
                    </span>
                    <span className="text-[10px] text-muted-foreground text-center px-4">
                      {t('pages.inscription.cvHint')}
                    </span>
                  </label>
                </div>
              </div>

              {/* Information Sections */}
              <div className="mt-8 space-y-6 pt-6 border-t border-border">
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                  <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4" />
                     {t('pages.inscription.info.confirmationTitle')}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('pages.inscription.info.confirmationText')}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm px-2">{t('pages.inscription.info.whyTitle')}</h4>
                  <ul className="space-y-2">
                    {(t('pages.inscription.info.points', { returnObjects: true }) as string[]).map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-primary mt-0.5">🔹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button type="submit" className={`w-full h-12 font-bold gap-2 shadow-glow ${isRTL ? 'flex-row-reverse' : ''}`} disabled={loading}>
                {loading ? <div className="w-5 h-5 border-2 border-t-transparent animate-spin rounded-full" /> : <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />}
                {t('pages.inscription.submit')}
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
                  <h4 className="text-sm font-bold mb-4">{t('pages.inscription.qrAccess')}</h4>
                  <img src={result.qr_entry} alt={t('pages.inscription.qrAccess')} className="w-full max-w-[200px] aspect-square" />
                  <p className="text-[10px] text-muted-foreground mt-4 text-center">{t('pages.inscription.qrAccessDesc')}</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-2xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <FileUp className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-sm font-bold mb-4">{t('pages.inscription.qrCv')}</h4>
                  <img src={result.qr_cv} alt={t('pages.inscription.qrCv')} className="w-full max-w-[200px] aspect-square" />
                  <p className="text-[10px] text-muted-foreground mt-4 text-center">{t('pages.inscription.qrCvDesc')}</p>
                </div>
              </div>

              <div className={`flex gap-4 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => window.print()}>
                  <Printer className="w-4 h-4" /> {t('pages.inscription.print')}
                </Button>
                <Button variant="secondary" className="flex-1 gap-2 shadow-glow" onClick={handleDownload}>
                  <Download className="w-4 h-4" /> {t('pages.inscription.download')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
