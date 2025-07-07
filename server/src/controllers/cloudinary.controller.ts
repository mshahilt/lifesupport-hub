import { Request, Response } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';

const cloudinaryService = new CloudinaryService();

export class CloudinaryController {
    async getSignedUploadUrl(req: Request, res: Response) {

        try {
            const response = await cloudinaryService.generateSignUploadUrl();
            return res.status(200).json({
                message: "Cloudinary Signature Generated",
                signedUrl: response,
            });

        } catch (error: any) {
            console.error("Error in generating signed url:", error);
            return res.status(error.statusCode || 500).json({
                message: error.message || "An unknown error occurred"
            });
        }
    }
}