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
  static async updateCategory(req: Request, res: Response) {
    try {
      let updateCategory = req.body;
      await CategoryService.updateCategory(updateCategory);
      res.json({ message: 'Category updated successfully' });
    } catch (err: any) {
      if(err === 'Category ID does not found') {
        return res.status(404).json({ error: err });
        
      }
      res.status(500).json({ error: err.message });
    }
  }
}
