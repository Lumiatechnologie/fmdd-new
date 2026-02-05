import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const { location, type, category, isRemote, search } = req.query;

        const jobs = await prisma.jobOffer.findMany({
            where: {
                AND: [
                    location ? { location: { contains: location as string } } : {},
                    type ? { type: type as string } : {},
                    category ? { category: category as string } : {},
                    isRemote !== undefined ? { isRemote: isRemote === 'true' } : {},
                    search ? {
                        OR: [
                            { title: { contains: search as string } },
                            { company: { contains: search as string } },
                            { description: { contains: search as string } }
                        ]
                    } : {}
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await prisma.jobOffer.findUnique({
            where: { id }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job offer not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job offer' });
    }
};

export const applyToJob = async (req: AuthRequest, res: Response) => {
    try {
        const { id: jobId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const existingApplication = await prisma.application.findFirst({
            where: { userId, jobId }
        });

        if (existingApplication) {
            return res.status(400).json({ error: 'Already applied for this job' });
        }

        const application = await prisma.application.create({
            data: {
                userId,
                jobId,
                status: 'PENDING'
            }
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
};

export const getRecommendedJobs = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const profile = await prisma.profile.findUnique({ where: { userId } });
        const allJobs = await prisma.jobOffer.findMany();

        if (!profile || !profile.skills) {
            // Return latest jobs as fallback if no skills defined
            return res.json(allJobs.slice(0, 5));
        }

        const userSkills = profile.skills.toLowerCase().split(',').map((s: string) => s.trim());

        const rankedJobs = allJobs.map((job: any) => {
            const jobText = (job.title + " " + job.description + " " + (job.skills || "")).toLowerCase();
            let score = 0;
            userSkills.forEach((skill: string) => {
                if (jobText.includes(skill)) score += 1;
            });
            return { ...job, score };
        })
            .filter((j: any) => j.score > 0)
            .sort((a: any, b: any) => b.score - a.score);

        res.json(rankedJobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};

export const getUserApplications = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const applications = await prisma.application.findMany({
            where: { userId },
            include: {
                jobOffer: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user applications' });
    }
};

export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, company, location, type, salary, description, skills, isRemote } = req.body;

        const job = await prisma.jobOffer.create({
            data: {
                title,
                company,
                location,
                type,
                salary,
                description,
                skills,
                isRemote: isRemote === true || isRemote === 'true'
            }
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job offer' });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, company, location, type, salary, description, skills, isRemote } = req.body;

        const job = await prisma.jobOffer.update({
            where: { id },
            data: {
                title,
                company,
                location,
                type,
                salary,
                description,
                skills,
                isRemote: isRemote === true || isRemote === 'true'
            }
        });

        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job offer' });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.application.deleteMany({ where: { jobId: id } });

        await prisma.jobOffer.delete({
            where: { id }
        });

        res.json({ message: 'Job offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job offer' });
    }
};
