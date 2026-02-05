import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/ProfileController.js';
import { getDashboardData } from '../controllers/DashboardController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/dashboard', authenticate, getDashboardData);

export default router;
