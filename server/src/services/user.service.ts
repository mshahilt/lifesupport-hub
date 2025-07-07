import { IUser } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../types';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { AuthErrors } from '../constants/error.enum';

export class UserService {
  private userRepo = new UserRepository();

  async register(data: User): Promise<{token:string ,user:IUser}> {
    const { name, email, password, avatar, role, phone } = data;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error(AuthErrors.EMAIL_EXISTS);

    if (password?.length < 6) throw new Error(AuthErrors.WEAK_PASSWORD);

    const hashedPassword = await hashPassword(password);

    const allowedRoles = ["student", "doctor", "admin"] as const;
    type AllowedRole = typeof allowedRoles[number];

    const user = {
      name,
      email,
      phone,
      password: hashedPassword,
      avatar,
      role: allowedRoles.includes(role as AllowedRole) ? (role as AllowedRole) : undefined,
    };

    const newUser = await this.userRepo.create(user);
    const token = generateToken({ id: newUser._id, email: newUser.email,name: newUser.name, avatar:newUser.avatar, role: newUser.role });
    return {token, user:newUser};
  }

  async login(email: string, password: string): Promise<{token: string; user:IUser}> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error(AuthErrors.USER_NOT_FOUND);

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error(AuthErrors.INVALID_CREDENTIALS);

    const token = generateToken({ id: user._id,name: user.name, avatar:user.avatar, email: user.email, role: user.role });
    return {token, user};
  }
}

