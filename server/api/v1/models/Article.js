// articles models using data structure goes here
const articleStore = [];
class Article {
  constructor(createdOn, author, ownerEmail, title, content) {
    this.createdOn = createdOn;
    this.author = author;
    this.ownerEmail = ownerEmail;
    this.title = title;
    this.content = content;
  }

  // create new article  method
  createArticle() {
    return articleStore.push({ title: this.title, content: this.content });
  }

  // find artilce by id
  // findArticleById(artilceId) {
  //   return articleStore.find((elem, index) => elem[index].id === artilceId);
  // }

  // find artilce by category, one of the optional features
  // findArticleByCategory(searchQuery) {
  //   return articleStore.filter((elem, index, array) => elem.category === searchQuery);
  // }
}

export { articleStore, Article };
