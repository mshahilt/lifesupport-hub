import { cloudinarySignature } from "../config/cloudinary";

export class CloudinaryService {
    async generateSignUploadUrl() {
    try {

        const cloudName = process.env.CLOUDINARY_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;

        if (!cloudName || !apiKey) {
            throw Object.assign(new Error("Cloudinary credentials are missing"), { statusCode: 500 });
        }

        const timestamp: number = Math.round(new Date().getTime() / 1000);
        
        const signature = cloudinarySignature(timestamp);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;

        return {
            signature,
            cloud_name: cloudName,
            api_key: apiKey,
            timestamp,
            upload_url: uploadUrl
        };
    } catch (error) {
        console.error("Error generating signed upload URL:", error);
        throw error;
    }
    }

}
