import { Request, Response } from 'express';
import { ArticleService } from '../services/articleService';

export class Articles {
  static async createNewArticle(req: Request, res: Response) {
    try {
      let article = req.body;
      await ArticleService.createNewArticle(article);
      res.json({ message: 'Article created successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
