import { CategoryModel, ICategory } from "../models/category.model";

export class CategoryRepository {
    async create(data: Partial<ICategory>): Promise<ICategory> {
        return await CategoryModel.create(data);
    }
    async findAll(): Promise<ICategory[]> {
        return await CategoryModel.find();
    }
    async findAllByUserId(userId: string): Promise<ICategory[]> {
        return await CategoryModel.find({userId: userId});
    }
    async findByName(name: string, userId: string): Promise<ICategory | null> {
        const category = await CategoryModel.findOne({name: name}, {userId: userId});
        return category ? category : null;
    }
    async findById(id: string): Promise<ICategory | null> {
        const user = await CategoryModel.findById(id);
        return user ? user : null;
    }
}