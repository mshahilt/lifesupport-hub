import mongoose, { Schema, model } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
    userId: string;
}

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const CategoryModel = mongoose.models.Category || model<ICategory>("Category", CategorySchema);
