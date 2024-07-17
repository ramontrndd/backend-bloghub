import connection from '../config/connection';
import { User } from '../models/User';

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
}
