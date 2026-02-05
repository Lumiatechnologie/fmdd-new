import { Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';

export const getAllFormations = async (req: Request, res: Response) => {
    try {
        const { domain, level, isPaid, search } = req.query;

        const formations = await prisma.formation.findMany({
            where: {
                AND: [
                    domain ? { category: domain as string } : {},
                    level ? { level: level as string } : {},
                    isPaid !== undefined ? { isPaid: isPaid === 'true' } : {},
                    search ? {
                        OR: [
                            { title: { contains: search as string } },
                            { description: { contains: search as string } }
                        ]
                    } : {}
                ]
            },
            include: {
                modules: true
            }
        });

        res.json(formations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch formations' });
    }
};

export const getFormationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const formation = await prisma.formation.findUnique({
            where: { id },
            include: {
                modules: {
                    orderBy: {
                        order: 'asc'
                    },
                    include: {
                        quizzes: {
                            include: {
                                questions: {
                                    include: {
                                        options: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!formation) {
            return res.status(404).json({ error: 'Formation not found' });
        }

        res.json(formation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch formation' });
    }
};

export const createFormation = async (req: Request, res: Response) => {
    try {
        const { title, description, image, duration, level, category, isPaid, modules } = req.body;

        const formation = await prisma.formation.create({
            data: {
                title,
                description,
                image,
                duration,
                level,
                category,
                isPaid: isPaid === true || isPaid === 'true',
                modules: modules ? {
                    create: modules
                } : undefined
            },
            include: { modules: true }
        });

        res.status(201).json(formation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create formation' });
    }
};

export const updateFormation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, image, duration, level, category, isPaid } = req.body;

        const formation = await prisma.formation.update({
            where: { id },
            data: {
                title,
                description,
                image,
                duration,
                level,
                category,
                isPaid: isPaid === true || isPaid === 'true'
            }
        });

        res.json(formation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update formation' });
    }
};

export const deleteFormation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Delete related modules first or use cascade if configured (SQLite doesn't always handle it well in Prisma without explicit config)
        await prisma.module.deleteMany({ where: { formationId: id } });
        await prisma.courseProgression.deleteMany({ where: { formationId: id } });

        await prisma.formation.delete({
            where: { id }
        });

        res.json({ message: 'Formation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete formation' });
    }
};
