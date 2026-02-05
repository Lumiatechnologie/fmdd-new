import { Router } from 'express';
import { updateProgress, getUserProgressions } from '../controllers/ProgressionController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.put('/:formationId', authenticate, updateProgress);
router.get('/my', authenticate, getUserProgressions);

export default router;
