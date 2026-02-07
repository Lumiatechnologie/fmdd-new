import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/lib/api";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(t("auth.loginSuccess") || "Successfully logged in!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
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
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <LogIn className={`w-6 h-6 text-primary-foreground ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {t("auth.loginTitle")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("auth.loginDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="email@fmdd.ma"
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
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-muted/50 border-border/50 focus:border-primary/50 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button className="w-full h-11 text-base font-semibold transition-all hover:shadow-lg hover:shadow-primary/25" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>{t("auth.loggingIn")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-primary-foreground">
                    <span>{t("auth.loginAction")}</span>
                    <ArrowRight className={`w-4 h-4 ${i18n.language === 'ar' ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("auth.orContinueWith")}
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 bg-muted/30 border-border/50 hover:bg-muted/50 transition-all text-foreground" type="button">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              {t("auth.noAccount")}{" "}
              <Link to="/register" className="text-primary hover:underline font-semibold">
                {t("auth.registerAction")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
