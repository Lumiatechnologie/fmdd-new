import { Router } from 'express';
import { getAllJobs, applyToJob, getRecommendedJobs, createJob, updateJob, deleteJob, getJobById, getUserApplications } from '../controllers/JobController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllJobs);
router.get('/applications', authenticate, getUserApplications);
router.get('/recommended', authenticate, getRecommendedJobs);
router.get('/:id', getJobById);
router.post('/:id/apply', authenticate, applyToJob);

// Admin Routes
router.post('/', authenticate, authorize(['ADMIN']), createJob);
router.put('/:id', authenticate, authorize(['ADMIN']), updateJob);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteJob);

export default router;
