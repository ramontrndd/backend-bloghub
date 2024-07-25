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
  static async getAllArticles(req: Request, res: Response) {
    try {
      const articles = await ArticleService.getAllArticles();
      res.json(articles);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  static async updateArticle(req: Request, res: Response) {
    try {
      let article = req.body;
      await ArticleService.updateArticle(article);
      res.status(200).json({ message: 'Article updated successfully' });
    } catch (err: any) {
      if (err.message === 'Article ID Does not found') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }
}
