import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILiveSession extends Document {
    userId:string
    title: string;
    description: string;
    instructor: string;
    category: string;
    startTime: string;
    endTime: string;
    image?: string;
    status: 'upcoming' | 'live' | 'completed';
}

const LiveSessionSchema: Schema = new Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    instructor: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming'
    },
  },
  {
    timestamps: true,
  }
);

export const LiveSessionModel = mongoose.models.LiveSession || mongoose.model<ILiveSession>('LiveSession', LiveSessionSchema);

