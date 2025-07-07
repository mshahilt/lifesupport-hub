import { Request, Response } from 'express';
import { HttpStatus } from '../constants/status.enum';
import { CategoryService } from '../services/category.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const categoryService = new CategoryService();

export class CategoryController {
    async create(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.userId) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'User ID is missing from request.' });
            }
            const category = await categoryService.create(req.body, req.userId);
            res.status(HttpStatus.CREATED).json({ message: 'User registered', category });
        } catch (err: any) {
            console.log(err);
            res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
        }
    }

    async findAllByUserId(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.userId) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'User ID is missing from request.' });
            }
            const categories = await categoryService.findAllByUserId(req.userId);
            res.status(HttpStatus.OK).json({ message: 'Success', categories });
        } catch (err: any) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
        }
    }
}