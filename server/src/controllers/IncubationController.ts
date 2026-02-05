import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const submitDiagnostic = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, diagnosticData } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const project = await prisma.project.create({
            data: {
                userId,
                title,
                description,
                diagnostic: JSON.stringify(diagnosticData),
                status: 'IDEATION'
            }
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit diagnostic' });
    }
};

export const requestMentoring = async (req: AuthRequest, res: Response) => {
    try {
        const { mentorId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const mentoring = await prisma.mentoring.create({
            data: {
                mentorId,
                menteeId: userId,
                status: 'REQUESTED'
            }
        });

        res.status(201).json(mentoring);
    } catch (error) {
        res.status(500).json({ error: 'Failed to request mentoring' });
    }
};

export const getMentors = async (req: AuthRequest, res: Response) => {
    try {
        const mentors = await prisma.user.findMany({
            where: { role: 'MENTOR' },
            select: {
                id: true,
                email: true,
                profile: true
            }
        });
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            include: { user: { select: { email: true, profile: true } } }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

export const updateProjectStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const project = await prisma.project.update({
            where: { id },
            data: { status }
        });

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project status' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.project.delete({ where: { id } });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};
