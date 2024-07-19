import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/userService';
import { LoginUser } from '../models/User';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users: User[] = await UserService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {

      const user: User = req.body;
      const existingUser = await UserService.findUserByEmail(user.email);

      if (existingUser) {
        return res
          .status(400)
          .json({ message: 'Email already exists in the database' });
      }
      await UserService.createUser(user);
      res.json({ message: 'User created successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const credentials:LoginUser = req.body;
      const result = await UserService.loginUser(credentials);

      if (result.error) {
        return res.status(401).json({ message: result.error });
      }

      res.cookie("token", result.token, { httpOnly: true, secure: false });
      return res.status(200).json({ token: result.token });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
