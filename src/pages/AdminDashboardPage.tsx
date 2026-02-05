import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit, 
  Rocket
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import api from "@/lib/api";

const AdminDashboardPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [formations, setFormations] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [type, setType] = useState<"formation" | "job">("formation");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [formationsRes, jobsRes, projectsRes] = await Promise.all([
        api.get("/formations"),
        api.get("/jobs"),
        api.get("/incubation/projects")
      ]);
      setFormations(formationsRes.data);
      setJobs(jobsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      toast.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      if (editingItem) {
        await api.put(`/${type === "formation" ? "formations" : "jobs"}/${editingItem.id}`, data);
        toast.success("Updated successfully");
      } else {
        await api.post(`/${type === "formation" ? "formations" : "jobs"}`, data);
        toast.success("Created successfully");
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (itemId: string, itemType: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/${itemType === "formation" ? "formations" : itemType === "job" ? "jobs" : "incubation/projects"}/${itemId}`);
      toast.success("Deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleUpdateProjectStatus = async (projectId: string, status: string) => {
    try {
      await api.put(`/incubation/projects/${projectId}`, { status });
      toast.success("Status updated");
      fetchData();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading && formations.length === 0) {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Tableau de bord administrateur</h1>
            <p className="text-muted-foreground mt-2">Gérez tout le contenu et les activités de la plateforme</p>
          </div>
          <div className="flex gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingItem(null); setType("formation"); }} className="gap-2">
                  <Plus className="w-4 h-4" /> Ajouter nouveau
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Modifier' : 'Ajouter'} {type === "formation" ? "Formation" : "Offre d'emploi"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateOrUpdate} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type_select">Type d'élément</Label>
                      <select 
                        id="type_select"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        disabled={!!editingItem}
                      >
                        <option value="formation">Formation</option>
                        <option value="job">Offre d'emploi</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre</Label>
                      <Input id="title" name="title" defaultValue={editingItem?.title} required />
                    </div>
                  </div>

                  {type === "formation" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="level">Niveau</Label>
                          <Input id="level" name="level" defaultValue={editingItem?.level} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Catégorie</Label>
                          <Input id="category" name="category" defaultValue={editingItem?.category} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Entreprise</Label>
                          <Input id="company" name="company" defaultValue={editingItem?.company} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Lieu</Label>
                          <Input id="location" name="location" defaultValue={editingItem?.location} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description du poste</Label>
                        <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                      </div>
                    </>
                  )}
                  <DialogFooter>
                    <Button type="submit">{editingItem ? "Mettre à jour" : "Créer"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="formations" className="space-y-8">
          <TabsList className="bg-muted p-1 rounded-xl">
            <TabsTrigger value="formations" className="rounded-lg gap-2">
              <BookOpen className="w-4 h-4" /> Formations
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg gap-2">
              <Briefcase className="w-4 h-4" /> Emplois
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg gap-2">
              <Rocket className="w-4 h-4" /> Projets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formations">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Contenu pédagogique</CardTitle>
                <CardDescription>Gérez vos cours, modules et parcours d'apprentissage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formations.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell className="font-medium">{f.title}</TableCell>
                        <TableCell>{f.category}</TableCell>
                        <TableCell>{f.level}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => { setEditingItem(f); setType("formation"); setIsDialogOpen(true); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(f.id, "formation")}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Opportunités d'emploi</CardTitle>
                <CardDescription>Surveiller et gérer les listes professionnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Poste</TableHead>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((j) => (
                      <TableRow key={j.id}>
                        <TableCell className="font-medium">{j.title}</TableCell>
                        <TableCell>{j.company}</TableCell>
                        <TableCell>{j.location}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => { setEditingItem(j); setType("job"); setIsDialogOpen(true); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(j.id, "job")}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Incubation & Entrepreneuriat</CardTitle>
                <CardDescription>Suivre les résultats du diagnostic et le statut de l'incubateur</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre du projet</TableHead>
                      <TableHead>Entrepreneur</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.title}</TableCell>
                        <TableCell>{p.user?.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            p.status === 'GROWTH' ? 'bg-green-100 text-green-700' :
                            p.status === 'MVP' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {p.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <select 
                              className="text-xs border rounded p-1"
                              value={p.status}
                              onChange={(e) => handleUpdateProjectStatus(p.id, e.target.value)}
                            >
                              <option value="IDEATION">Idéation</option>
                              <option value="MVP">MVP</option>
                              <option value="GROWTH">Croissance</option>
                            </select>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(p.id, "project")}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
