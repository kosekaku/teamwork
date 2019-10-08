// articles models using postgresql database goes here
import pool from './dbConfig';

const articleSchema = `CREATE TABLE IF NOT EXISTS
articleStore(
  articleID VARCHAR(100) PRIMARY KEY NOT NULL,
  createdOn timestamptz NOT NULL,
  author VARCHAR(30) NOT NULL,
  ownerEmail VARCHAR(30) NOT NULL,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(1000) NOT NULL
)`;
pool.query(articleSchema, (error, results) => {
  if(error) return console.log(error); // not able to create
  // console.log('table created')// created table
});

class Article {
  constructor(articleId, createdOn, author, ownerEmail, title, content) {
    this.articleId = articleId;
    this.createdOn = createdOn;
    this.author = author;
    this.ownerEmail = ownerEmail;
    this.title = title;
    this.content = content;
  }

  // create new article  method
  createArticle() {
   const query = `INSERT INTO articleStore(articleId, createdOn, author, ownerEmail, title, content)
    VALUES($1, $2, $3, $4, $5 $6)`;
    const values = [this.articleId, this.createdOn, this.author, this.ownerEmail, this.title, this.content];
    return pool.query(query, values);
  }

  // find artilce by id
  static findArticleById(idFromUser) {
    return pool.query('SELECT * FROM articleStore WHERE articleId=$1',[idFromUser]);
  }
}

export { Article };
