// articles models using data structure goes here
const articleStore = [];
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
    return articleStore.push({
      articleId: this.articleId,
      createdOn: this.createdOn,
      author: this.author,
      ownerEmail: this.ownerEmail,
      title: this.title,
      content: this.content,
    });
  }

  // find artilce by id
  static findArticleById(idFromUser) {
    return articleStore.find((elem, ind) => articleStore[ind].articleId === idFromUser);
  }
}

export { articleStore, Article };
