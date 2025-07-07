import { Response } from 'express';
import { LiveSessionService } from '../services/live.service';
import { HttpStatus } from '../constants/status.enum';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

const liveService = new LiveSessionService();

export class LiveController {
  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const sessionData = {
        ...req.body,
        userId: req.userId
      };
      const created = await liveService.createSession(sessionData);
      return res.status(HttpStatus.CREATED).json({ success: true, data: created });
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
  }

  async getAllByUser(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const sessions = await liveService.getAllSessionsByUser(req.userId);
      return res.status(HttpStatus.OK).json({ success: true, live: sessions });
    } catch (error: any) {
      return res.status(HttpStatus.SERVER_ERROR).json({ success: false, message: error.message });
    }
  }


  async getActiveByUser(req: AuthenticatedRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const sessions = await liveService.getActiveLiveSessions(req.userId);
      return res.status(HttpStatus.OK).json({ success: true, data: sessions });
    } catch (error: any) {
      return res.status(HttpStatus.SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async getCompletedByUser(req: AuthenticatedRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const sessions = await liveService.getCompletedLiveSessions(req.userId);
      return res.status(HttpStatus.OK).json({ success: true, data: sessions });
    } catch (error: any) {
      return res.status(HttpStatus.SERVER_ERROR).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const { status, sessionId } = req.body;
      console.log("sessionId", sessionId);
      console.log("status ", status);
      const updated = await liveService.updateSessionStatus(sessionId, status);
      return res.status(HttpStatus.OK).json({ success: true, live: updated });
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
  }

  async getById(req: AuthenticatedRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const { sessionId } = req.params;
      const session = await liveService.getSessionById(req.userId, sessionId);
      return res.status(HttpStatus.OK).json({ success: true, data: session });
    } catch (error: any) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: error.message });
    }
  }

  async deleteById(req: AuthenticatedRequest, res: Response) {
    try {
        if (!req.userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'User ID is required.' });
      }
      const { sessionId } = req.params;
      const deleted = await liveService.deleteSessionById(req.userId, sessionId);
      return res.status(HttpStatus.OK).json({ success: true, data: deleted });
    } catch (error: any) {
      return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: error.message });
    }
  }
}
