import { Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

export const updateProgress = async (req: AuthRequest, res: Response) => {
    try {
        const { formationId } = req.params;
        const { progress } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const progression = await prisma.courseProgression.upsert({
            where: {
                userId_formationId: {
                    userId,
                    formationId
                }
            },
            update: {
                progress,
                isCompleted: progress >= 100
            },
            create: {
                userId,
                formationId,
                progress,
                isCompleted: progress >= 100
            }
        });

        res.json(progression);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update progression' });
    }
};

export const getUserProgressions = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const progressions = await prisma.courseProgression.findMany({
            where: { userId },
            include: {
                formation: true
            }
        });

        res.json(progressions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch progressions' });
    }
};
