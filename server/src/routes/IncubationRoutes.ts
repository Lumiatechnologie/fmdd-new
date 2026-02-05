import { Router } from 'express';
import { submitDiagnostic, requestMentoring, getMentors, getAllProjects, updateProjectStatus, deleteProject } from '../controllers/IncubationController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/diagnostic', authenticate, submitDiagnostic);
router.post('/mentoring', authenticate, requestMentoring);
router.get('/mentors', authenticate, getMentors);

// Admin Routes
router.get('/projects', authenticate, authorize(['ADMIN']), getAllProjects);
router.put('/projects/:id', authenticate, authorize(['ADMIN']), updateProjectStatus);
router.delete('/projects/:id', authenticate, authorize(['ADMIN']), deleteProject);

export default router;
