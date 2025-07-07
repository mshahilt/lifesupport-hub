import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
const router = Router();
const categoryController = new CategoryController();

router.post("/",authMiddleware, asyncHandler(categoryController.create));
router.get('/',authMiddleware, asyncHandler(categoryController.findAllByUserId));

export default router;
