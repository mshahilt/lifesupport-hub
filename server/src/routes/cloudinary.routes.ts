import { Router } from "express";
import { CloudinaryController } from "../controllers/cloudinary.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const cloudinaryController = new CloudinaryController();

router.get('/signature', asyncHandler(cloudinaryController.getSignedUploadUrl));

export default router;