import bcrypt from 'bcryptjs';
import { prisma } from './prisma.js';

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Clean up in correct order to avoid P2003
    await prisma.option.deleteMany();
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.module.deleteMany();
    await prisma.courseProgression.deleteMany();
    await prisma.certificate.deleteMany();
    await prisma.userBadge.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.application.deleteMany();
    await prisma.mentoring.deleteMany();
    await prisma.project.deleteMany();
    await prisma.formation.deleteMany();
    await prisma.jobOffer.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin
    const admin = await prisma.user.create({
        data: {
            email: 'admin@fmdd.ma',
            password: adminPassword,
            role: 'ADMIN',
            profile: {
                create: {
                    firstName: 'Admin',
                    lastName: 'FMDD',
                    bio: 'Platform Administrator'
                }
            }
        }
    });

    // Create User
    const user = await prisma.user.create({
        data: {
            email: 'user@fmdd.ma',
            password: userPassword,
            role: 'USER',
            profile: {
                create: {
                    firstName: 'Achraf',
                    lastName: 'Fouad',
                    bio: 'Aspiring Web Developer',
                    skills: 'React, Node.js, TypeScript',
                    preferences: JSON.stringify({ theme: 'dark', notifications: true })
                }
            }
        }
    });

    // Create Formations
    const formation1 = await prisma.formation.create({
        data: {
            title: 'Fondamentaux du Développement Durable',
            description: 'Comprendre les enjeux de la transition écologique au Maroc et les piliers du développement durable.',
            category: 'Environnement',
            duration: '12h',
            level: 'Débutant',
            isPaid: false,
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=800&h=450&fit=crop',
            modules: {
                create: [
                    {
                        title: 'Introduction au DD',
                        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        order: 1,
                        quizzes: {
                            create: [
                                {
                                    title: 'Quiz de bienvenue',
                                    questions: {
                                        create: [
                                            {
                                                text: 'Quels sont les 3 piliers du développement durable ?',
                                                options: {
                                                    create: [
                                                        { text: 'Social, Économique, Environnemental', isCorrect: true },
                                                        { text: 'Politique, Social, Technique', isCorrect: false },
                                                        { text: 'Économique, Financier, Commercial', isCorrect: false }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        title: 'Les enjeux au Maroc',
                        content: 'Le Maroc s\'est engagé fermement dans la transition énergétique...',
                        order: 2
                    }
                ]
            }
        }
    });

    const formation2 = await prisma.formation.create({
        data: {
            title: 'Entrepreneuriat Social & Incubation',
            description: 'Comment transformer une idée à impact social en une startup viable au Maroc.',
            category: 'Business',
            duration: '25h',
            level: 'Intermédiaire',
            isPaid: true,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
            modules: {
                create: [
                    { title: 'L\'idée de projet', content: '...', order: 1 },
                    { title: 'Business Model Canvas', content: '...', order: 2 }
                ]
            }
        }
    });

    // Create Badges
    await prisma.badge.createMany({
        data: [
            { name: 'Éclaireur', description: 'A complété sa première formation', icon: 'Sparkles' },
            { name: 'Expert DD', description: 'Expert en développement durable', icon: 'Leaf' },
            { name: 'Entrepreneur', description: 'A soumis un projet d\'incubation', icon: 'Rocket' }
        ]
    });

    // Create Job Offers
    await prisma.jobOffer.createMany({
        data: [
            {
                title: 'Chargé de Mission Développement Durable',
                company: 'EcoMaroc',
                location: 'Casablanca',
                type: 'CDI',
                category: 'Environnement',
                duration: 'Indéterminée',
                salary: '12 000 DH',
                description: 'Accompagner les entreprises dans leur transition écologique...',
                skills: 'RSE, Audit, Management environnemental',
                isRemote: true
            },
            {
                title: 'Stage - Assistant Projet Solaire',
                company: 'MASEN',
                location: 'Rabat',
                type: 'Stage',
                category: 'Tech',
                duration: '6 mois',
                salary: '3 000 DH',
                description: 'Support technique pour les projets de centrales solaires...',
                skills: 'Ingénierie, Énergie Solaire, AutoCAD',
                isRemote: false
            },
            {
                title: 'Analyste ESG Junior',
                company: 'Banque Populaire',
                location: 'Casablanca',
                type: 'CDI',
                category: 'Business',
                duration: 'Indéterminée',
                salary: '15 000 DH',
                description: 'Analyse des risques environnementaux et sociaux...',
                skills: 'Finance, ESG, Analyse de données',
                isRemote: false
            }
        ]
    });

    // Create Interview Prep
    await prisma.interviewPrep.create({
        data: {
            title: 'Réussir son Entretien dans le DD',
            description: 'Conseils spécifiques pour les métiers de l\'impact au Maroc.',
            category: 'Interview',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
    });

    console.log('Seed completed:');
    console.log('Admin:', admin.email);
    console.log('User:', user.email);
    console.log('Formations created:', 2);
    console.log('Job Offers created:', 3);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
