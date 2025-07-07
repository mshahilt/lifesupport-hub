import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  role: 'student' | 'doctor' | 'admin';
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      enum: ['student', 'doctor', 'admin'],
      default: 'doctor',
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
