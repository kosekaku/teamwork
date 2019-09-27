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
      author: this.author,
      ownerEmail: this.ownerEmail,
      title: this.title,
      content: this.content,
    });
  }

  // find artilce by id
  findArticleById() {
    const id = this.articleId.articleId; // an object was return
    return articleStore.find((elem, ind) => articleStore[ind].articleId === id);
  }

  // find artilce by category, one of the optional features
  // findArticleByCategory(searchQuery) {
  //   return articleStore.filter((elem, index, array) => elem.category === searchQuery);
  // }
}

export { articleStore, Article };
