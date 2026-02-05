import { Router } from 'express';
import { getAllFormations, getFormationById, createFormation, updateFormation, deleteFormation } from '../controllers/FormationController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllFormations);
router.get('/:id', getFormationById);

// Admin Routes
router.post('/', authenticate, authorize(['ADMIN']), createFormation);
router.put('/:id', authenticate, authorize(['ADMIN']), updateFormation);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteFormation);

export default router;
