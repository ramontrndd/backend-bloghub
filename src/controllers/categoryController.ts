import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
  static async createNewCategory(req: Request, res: Response) {
    try {
      let category = req.body;
      await CategoryService.createNewCategory(category);
      res.json({ message: 'Category created successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getCategory(req: Request, res: Response) {
    try {
      let getCategory = req.body;
      const category = await CategoryService.getAllCategory(getCategory);
      res.json(category);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
