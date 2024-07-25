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

  static async updateCategory(updateCategory: Category): Promise<Category> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE category SET name = ? WHERE id = ?';
      connection.query(
        query,
        [updateCategory.name, updateCategory.id],
        (err: any, results: any) => {
          if (!err) {
            if(results.affectedRows == 0) {
              return reject(new Error('Category ID does not found'));
            }
            resolve(results);
          } else {
            reject(new Error(err));
          }
        },
      );
    });
  }
}
