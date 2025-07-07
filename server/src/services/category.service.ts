import { ICategory } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../types";
import { CategoryErrors } from "../constants/error.enum";


export class CategoryService {
    private categoryRepo = new CategoryRepository();

    async create(data: Category, userId: string): Promise<ICategory> {
        const { name } = data;

        if(!name) {
            throw new Error(CategoryErrors.NAME_EMPTY)
        }

        const existingCategory = await this.categoryRepo.findByName(name, userId);

        if(existingCategory) {
            throw new Error(CategoryErrors.CATEGORY_EXISTS);
        }
        const category = {
            name, 
            userId
        }

        return this.categoryRepo.create(category);
    }

    async findAllByUserId(userId: string): Promise<ICategory[]> {
        return this.categoryRepo.findAllByUserId(userId);
    }

}