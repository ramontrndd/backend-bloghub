import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/userService';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users: User[] = await UserService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
