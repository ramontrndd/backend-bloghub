import connection from '../config/connection';
import { CreateCategory, Category } from '../models/Category';

export class CategoryService {
  static async createNewCategory(
    category: CreateCategory,
  ): Promise<CreateCategory> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO category (name) VALUES (?)';
      connection.query(
        query,
        [category.name],
        (err: any, results: CreateCategory) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(results);
          }
        },
      );
    });
  }
  static async getAllCategory(getCategory: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM category';
      connection.query(
        query,
        [getCategory.id, getCategory.name],
        (err: any, results: any) => {
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
