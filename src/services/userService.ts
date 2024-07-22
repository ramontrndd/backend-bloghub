import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connection from '../config/connection';
import { LoginUser, User } from '../models/User';

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err: any, results: User[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async createUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (name, email, contactNumber, password, status, role) VALUES (?, ?, ?, ?,'false','user')";
      const salt = 10;
      const hasgPassword = bcrypt.hashSync(user.password, salt);
      connection.query(
        query,
        [
          user.name,
          user.email,
          user.contactNumber,
          (user.password = hasgPassword),
        ],
        (err: any, results: User) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        },
      );
    });
  }
  static async findUserByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      connection.query(query, [email], (err: any, results: User[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  static async loginUser(
    credentials: LoginUser,
  ): Promise<{ token?: string; error?: string }> {
    try {
      const { email, password } = credentials;
      const dbUser = await this.findUserByEmail(email);

      if (!dbUser) {
        return { error: 'Incorrect username or password!' };
      }

      const match = await bcrypt.compare(password, dbUser.password);
      if (!match) {
        return { error: 'Incorrect username or password!' };
      }

      if (dbUser.status === 'false') {
        return { error: 'Wait for Managers approval' };
      }

      const response = { email: dbUser.email, role: dbUser.role };
      const accessToken = jwt.sign(
        response,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '4h' },
      );

      return { token: accessToken };
    } catch (err) {
      throw err;
    }
  }
  static async updateUser(id: number, status: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = 'update users set status=? where id=?';
      connection.query(query, [status, id], (err: any, results: any) => {
        if (!err) {
          if (results.affectedRows === 0) {
            reject(new Error('User not found'));
          } else {
            resolve(results);
          }
        } else {
          reject(err);
        }
      });
    });
  }
}
