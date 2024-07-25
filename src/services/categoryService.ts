import connection from '../config/connection';
import { Category } from '../models/Category';

export class CategoryService {
  static async createNewCategory(category: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO category (name) VALUES (?)";
      connection.query(
        query,
        [category.name],
        (err: any, results: Category) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(results);
          }
        },
      );
    });
  }
}
