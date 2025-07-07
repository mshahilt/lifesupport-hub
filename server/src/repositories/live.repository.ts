
import { LiveSessionModel } from '../models/live.model';
import { ILiveSession } from '../models/live.model';

export class LiveSessionRepository {

    async create(sessionData: ILiveSession): Promise<ILiveSession> {
        const session = new LiveSessionModel(sessionData);
        return session.save();
    }

    async findAllByUserId(userId: string): Promise<ILiveSession[]> {
    return LiveSessionModel.find({ userId }).populate("category").sort({ startTime: -1 });
    }

    async findOneLiveBySessionId(sessionId: string): Promise<ILiveSession | null> {
    return LiveSessionModel.findOne({ _id: sessionId }).exec();
    }

    async findActiveLiveByUserId(userId: string): Promise<ILiveSession[]> {
    return LiveSessionModel.find({ userId, status: 'live' }).exec();
    }

    async findCompletedLiveByUserId(userId: string): Promise<ILiveSession[]> {
    return LiveSessionModel.find({ userId, status: 'completed' }).exec();
    }

    async updateStatusByUserId(sessionId: string, newStatus: 'upcoming' | 'live' | 'completed'): Promise<ILiveSession | null> {
    return LiveSessionModel.findOneAndUpdate(
        { _id: sessionId },
        { status: newStatus },
        { new: true }
    ).exec();
    }

    async findByIdAndUserId(id: string, userId: string): Promise<ILiveSession | null> {
    return LiveSessionModel.findOne({ _id: id, userId }).exec();
    }

    async deleteByIdAndUserId(id: string, userId: string): Promise<ILiveSession | null> {
    return LiveSessionModel.findOneAndDelete({ _id: id, userId }).exec();
    }
}
