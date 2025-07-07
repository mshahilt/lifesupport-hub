import { ILiveSession } from '../models/live.model';
import { CategoryRepository } from '../repositories/category.repository';
import { LiveSessionRepository } from '../repositories/live.repository';

type Status = 'upcoming' | 'live' | 'completed';

export class LiveSessionService {
    private liveSessionRepo = new LiveSessionRepository();
    private categoryRepo = new CategoryRepository();

    private isValidStatusTransition(current: Status, next: Status): boolean {
        const validTransitions: Record<Status, Status[]> = {
            upcoming: ['live'],
            live: ['completed'],
            completed: [],
        };
        return validTransitions[current]?.includes(next);
    }

    async createSession(sessionData: ILiveSession): Promise<ILiveSession> {
        const requiredFields: (keyof Partial<ILiveSession>)[] = [
            'title', 'description', 'instructor', 'category',
            'startTime', 'endTime', 'userId'
        ];

        for (const field of requiredFields) {
            if (!sessionData[field]) {
            throw new Error(`Missing required field: ${field}`);
            }
        }

        const existingCategory = await this.categoryRepo.findByName(
            sessionData.category,
            sessionData.userId
        );

        const categoryId = existingCategory
            ? existingCategory._id
            : (await this.categoryRepo.create({
                name: sessionData.category,
                userId: sessionData.userId
            }))._id;

        const modifiedData = {
            ...sessionData,
            category: categoryId,
        };

        return this.liveSessionRepo.create(modifiedData as any);
    }



    async getAllSessionsByUser(userId: string) {
        const liveSession = await this.liveSessionRepo.findAllByUserId(userId);
        return liveSession;
    }

    
    async getActiveLiveSessions(userId: string) {
    return this.liveSessionRepo.findActiveLiveByUserId(userId);
    }

    async getCompletedLiveSessions(userId: string) {
    return this.liveSessionRepo.findCompletedLiveByUserId(userId);
    }

    async updateSessionStatus(sessionId: string, newStatus: Status) {
        const current = await this.liveSessionRepo.findOneLiveBySessionId(sessionId);
        
        if (!current) {
            throw new Error('No live session found for the user to update');
        }

        if (!this.isValidStatusTransition(current.status, newStatus)) {
            throw new Error(`Invalid status transition from ${current.status} to ${newStatus}`);
        }

        return this.liveSessionRepo.updateStatusByUserId(sessionId, newStatus);
    }

    async getSessionById(userId: string, sessionId: string) {
    return this.liveSessionRepo.findByIdAndUserId(sessionId, userId);
    }

    async deleteSessionById(userId: string, sessionId: string) {
    return this.liveSessionRepo.deleteByIdAndUserId(sessionId, userId);
    }
}
