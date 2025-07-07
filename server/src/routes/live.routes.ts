import { Router } from 'express';
import { LiveController } from '../controllers/live.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const liveController = new LiveController();

router.post('/', authMiddleware, asyncHandler(liveController.create));

router.get('/', authMiddleware, asyncHandler(liveController.getAllByUser));

// Get active sessions by user
router.get('/active', authMiddleware, asyncHandler(liveController.getActiveByUser));

// Get completed sessions by user
router.get('/completed', authMiddleware, asyncHandler(liveController.getCompletedByUser));

// Update session status by user
router.patch('/status', authMiddleware, asyncHandler(liveController.updateStatus));

// Get a session by ID
router.get('/:sessionId', authMiddleware, asyncHandler(liveController.getById));

// Delete a session by ID
router.delete('/:sessionId', authMiddleware, asyncHandler(liveController.deleteById));

export default router;
