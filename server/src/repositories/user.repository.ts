import { UserModel } from "../models/user.model";
import { IUser } from "../models/user.model";

export class UserRepository {
    async create(userData: Partial<IUser>): Promise<IUser> {
        return await UserModel.create(userData);
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        return user ? user : null;
    }
    
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email });
    }

    async findAll(): Promise<IUser[]> {
        return await UserModel.find();
    }
}
