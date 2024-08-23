import { Request, Response } from 'express';

import { LoginUser, User } from '../models/User';
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
      const credentials: LoginUser = req.body;
      const result = await UserService.loginUser(credentials);

      if (result.error) {
        return res.status(401).json({ message: result.error });
      }

      res.cookie('token', result.token, { httpOnly: true, secure: false });
      return res
        .status(200)
        .json({ token: result.token, message: 'Login Sucessfully' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async updateUserStatus(req: Request, res: Response) {
    try {
      const user = req.body;
      await UserService.updateStatus(user.id, user.status);
      if (user.status === 'true') {
        return res.status(200).json({ message: 'User activated successfully' });
      } else if (user.status === 'false') {
        return res
          .status(200)
          .json({ message: 'User deactivated successfully' });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  static async updateUserRole(req: Request, res: Response) {
    try {
      const user = req.body;
      await UserService.updateUserRole(user.id, user.role);
      if (user.role === 'admin') {
        return res
          .status(200)
          .json({ message: 'User role updated to admin successfully' });
      } else if (user.role === 'user') {
        return res
          .status(200)
          .json({ message: 'User role updated to user successfully' });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
  static async checkToken(req: Request, res: Response) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = await UserService.verifyToken(token);
      res.status(200).json({ message: 'Token is valid', decoded });
    } catch (err: any) {
      console.error('Error: ', err.message);
      res.status(401).json({ message: 'Token is invalid, Acess Unauthorized' });
    }
  }
}
