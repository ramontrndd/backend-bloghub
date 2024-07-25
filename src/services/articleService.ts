import connection from '../config/connection';
import { ArticleModel } from '../models/Article';

export class ArticleService {
  static async createNewArticle(article: ArticleModel): Promise<ArticleModel> {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO articles (title, content, publication_date, category_id, status) VALUES (?, ?, ?, ?, ?)";
      connection.query(query,[article.title,article.content,new Date(),article.categoryId,article.status],(err:any, results) => {
          if (!err) {
            resolve(results);
          } else {
            return reject(new Error(err.message));
          }
        },
      );
    });
  }
}
