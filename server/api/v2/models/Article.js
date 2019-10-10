// articles models using postgresql database goes here
import pool from './dbConfig';

const articleSchema = `CREATE TABLE IF NOT EXISTS
articleStore(
  articleId VARCHAR(100) PRIMARY KEY NOT NULL,
  authorId VARCHAR(100) NOT NULL,
  createdOn timestamptz NOT NULL,
  title VARCHAR(100) NOT NULL,
  article VARCHAR(1000) NOT NULL,
  FOREIGN KEY (authorId) REFERENCES userStore(userId) ON DELETE CASCADE ON UPDATE CASCADE
  )`;
pool.query(articleSchema, (error, results) => {
  if (error) return console.log(`article table error ${error}`); // not able to create
  // console.log('table created')// created table
});

class Article {
  constructor(articleId, authorId, createdOn, title, article) {
    this.articleId = articleId;
    this.authorId = authorId;
    this.createdOn = createdOn;
    this.title = title;
    this.article = article;
  }

  // create new article  method
  createArticle() {
    const query = `INSERT INTO articleStore(articleId, authorId, createdOn, title, article)
    VALUES($1, $2, $3, $4, $5) RETURNING articleId, authorId, createdOn, title, article`;
    const values = [this.articleId, this.authorId, this.createdOn, this.title,
      this.article];
    return pool.query(query, values);
  }

  // update article title and body
  static updateArticle(titleToUpdate, articleToUpdate, articleId) {
    const query = `UPDATE articleStore SET 
    title = $1,
    article =$2
    WHERE articleId=$3 RETURNING authorid, title, article`;
    const values = [titleToUpdate, articleToUpdate, articleId];
    return pool.query(query, values);
  }

  // delete article
  static deleteArticle(idFromUser) {
    return pool.query('DELETE FROM articleStore WHERE articleId=$1 RETURNING articleId', [idFromUser]);
  }

  // find artilce by id
  static findArticleById(idFromUser) {
    return pool.query('SELECT * FROM articleStore WHERE articleId=$1', [idFromUser]);
  }
}

export default Article;
