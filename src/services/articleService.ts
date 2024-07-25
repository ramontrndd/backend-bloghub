import { ArticleModel } from './../models/Article';
import connection from '../config/connection';


export class ArticleService {
  static async createNewArticle(article: ArticleModel): Promise<ArticleModel> {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO articles (title, content, publication_date, category_id, status) VALUES (?, ?, ?, ?, ?)';
      connection.query(
        query,
        [
          article.title,
          article.content,
          new Date(),
          article.categoryId,
          article.status,
        ],
        (err: any, results) => {
          if (!err) {
            resolve(results);
          } else {
            return reject(new Error(err.message));
          }
        },
      );
    });
  }
  static async getAllArticles(): Promise<void> {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT a.id, a.title, a.content, a.status, a.publication_date, c.id as categoryId, c.name as categoryName FROM articles as a INNER JOIN category as c WHERE a.category_id = c.id AND a.status = 'published'";
      connection.query(query, (err: any, results:any) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err.message));
        }
      });
    });
  }

  static async updateArticle(article: ArticleModel): Promise<void> { 
    return new Promise ((resolve, reject) => {
      const query = 'UPDATE articles SET title = ?, content = ?, category_id = ?, status = ? WHERE id = ?';
      connection.query(query, [article.title, article.content, article.categoryId, article.status, article.id], (err: any, results:any) => {
        if (!err) {
          if (results.affectedRows === 0) {
            reject(new Error('Article ID Does not found'));
          }
          resolve(results);
        } else {
          reject(new Error(err.message));
        }
      });
    });
  }
static async deleteArticle(id:number): Promise<void> { 
  return new Promise((resolve, reject)=> {
    const query = "DELETE from articles WHERE id=?"
    connection.query(query,[id], (err:any , results:any)=> {
      if(!err) {
        if(results.affectedRows === 0) { 
          reject(new Error('Arcicle ID does not exist'))
        }
        resolve(results)
      }
      else {
        reject(new Error(err.message))
      }
    })
  })
}
}
