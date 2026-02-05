import { Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const getDashboardData = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const [progressions, applications, projects, mentorings] = await Promise.all([
            prisma.courseProgression.findMany({
                where: { userId },
                include: { formation: true }
            }),
            prisma.application.findMany({
                where: { userId },
                include: { jobOffer: true }
            }),
            prisma.project.findMany({
                where: { userId }
            }),
            prisma.mentoring.findMany({
                where: {
                    OR: [
                        { mentorId: userId },
                        { menteeId: userId }
                    ]
                },
                include: {
                    mentor: { include: { user: { include: { profile: true } } } },
                    mentee: { include: { user: { include: { profile: true } } } }
                }
            })
        ]);

        res.json({
            progressions,
            applications,
            projects,
            mentorings,
            stats: {
                completedCourses: progressions.filter(p => p.isCompleted).length,
                activeApplications: applications.filter(a => a.status === 'PENDING').length,
                activeProjects: projects.length,
                mentoringSessions: mentorings.length
            }
        });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};
