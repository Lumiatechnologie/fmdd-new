import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/api";

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error(t("auth.passwordsDoNotMatch"));
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      toast.success(t("auth.registerSuccess"));
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || t("auth.registerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
              <UserPlus className={`w-6 h-6 text-primary-foreground ${i18n.language === 'ar' ? 'scale-x-[-1]' : ''}`} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {t("auth.registerTitle")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("auth.registerDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="pl-10 h-11 bg-muted/50 border-border/50 focus:border-primary/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t("auth.passwordPlaceholder")}
                    className="pl-10 h-11 bg-muted/50 border-border/50 focus:border-primary/50 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                    className="pl-10 h-11 bg-muted/50 border-border/50 focus:border-primary/50 transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button 
                  type="button"
                  variant={formData.role === "USER" ? "secondary" : "ghost"}
                  className="h-10 text-xs gap-2"
                  onClick={() => setFormData({ ...formData, role: "USER" })}
                >
                  <User className="w-3 h-3" />
                  {t("auth.roleStudent")}
                </Button>
                <Button 
                  type="button"
                  variant={formData.role === "MENTOR" ? "secondary" : "ghost"}
                  className="h-10 text-xs gap-2"
                  onClick={() => setFormData({ ...formData, role: "MENTOR" })}
                >
                  <ShieldCheck className="w-3 h-3" />
                  {t("auth.roleMentor")}
                </Button>
              </div>

              <Button className="w-full h-11 text-base font-semibold mt-4 transition-all hover:shadow-lg hover:shadow-primary/25" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>{t("auth.creatingAccount")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-primary-foreground font-bold">
                    <span>{t("auth.registerActionNow")}</span>
                    <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.alreadyHaveAccount")}{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                {t("auth.loginAction")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
