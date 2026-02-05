import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import api from "@/lib/api";

const DashboardPage = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/users/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {t("pages.dashboard.title")}
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {t("pages.dashboard.welcome")}
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <TrendingUp className="w-5 h-5" />
              {t("common.viewAll")}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t("pages.dashboard.activeCourses"), value: data?.stats?.completedCourses || 0, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: t("pages.dashboard.appliedJobs"), value: data?.stats?.activeApplications || 0, icon: Briefcase, color: "text-green-500", bg: "bg-green-500/10" },
              { title: t("pages.dashboard.projects"), value: data?.stats?.activeProjects || 0, icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10" },
              { title: t("pages.dashboard.mentoring"), value: data?.stats?.mentoringSessions || 0, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
              <Card key={i} className="border-border/50 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-4">{stat.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Formations */}
            <Card className="lg:col-span-2 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {t("pages.dashboard.activeCourses")}
                </CardTitle>
                <CardDescription>Continuez votre apprentissage là où vous vous êtes arrêté</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data?.progressions?.length > 0 ? (
                  data.progressions.map((prog: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-foreground">{prog.formation?.title}</span>
                        <span className="text-muted-foreground">{prog.progress}%</span>
                      </div>
                      <Progress value={prog.progress} className="h-2" />
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto font-semibold text-primary">
                          Reprendre <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    Aucune formation active pour le moment.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity / Notifications */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Activités récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.applications?.slice(0, 5).map((app: any, i: number) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Candidature envoyée pour {app.jobOffer?.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {(!data?.applications || data.applications.length === 0) && (
                  <p className="text-sm text-center text-muted-foreground py-10">Pas d'activité récente</p>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
