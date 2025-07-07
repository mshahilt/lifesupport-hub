import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpStatus } from '../constants/status.enum';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      res.status(HttpStatus.CREATED).json({ message: 'User registered', user });
    } catch (err: any) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.status(HttpStatus.OK).json({ message: 'Login successful', user });
    } catch (err: any) {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
