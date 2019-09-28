
import { Article } from './Article';

const commentStore = [];
class Comment extends Article {
  constructor(articleId, commentId, createdOn, authorId, comment) {
    super(articleId);
    this.commentId = commentId;
    this.createdOn = createdOn;
    this.authorId = authorId;
    this.comment = comment;
  }

  // create new comment
  addComment() {
    const comment = {
      articleId: this.articleId,
      commentId: this.commentId,
      createdOn: this.createdOn,
      authorId: this.authorId,
      comment: this.comment,
    };
    return commentStore.push(comment);
  }
}

export { Comment, commentStore };
