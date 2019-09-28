import uuid from 'uuid/v1';
import { Article, articleStore } from '../models/Article';
import { Comment, commentStore} from '../models/Comments';
import {
  success, dataCreated, notFound, accessDenied, serverExceptions,
} from '../helpers/messages';
// logic for article operations

// post article
const writeArticle = async (req, res) => {
  const { title, content } = req.body.data;
  // auth user before allowing posting, its already done by the middleware
  // we dont need to auth author, as anyone logged in is allowed to write article
  const createdOn = new Date();
  const payload = req.loggedinUser; // user data from the tokens we sent when user signup/signin
  const { firstName, lastName, email } = payload; // get names and email set when signing the token
  const author = `${firstName} ${lastName}`;
  const articleId = uuid();
  const article = new Article(articleId, createdOn, author, email, title, content);
  await article.createArticle();
  const data = {
    articleId, createdOn, author, title, content,
  };
  // req.setHeader('Authorialization', 'Bearer '+'mytokens2'); // nodejs way
  // res.header('Authorialization', 'Bearer '+'mytokens2'); // expressjs way
  return dataCreated(data, res);
  // return res.status(201).json({ status: 201, message: 'article successful created', data });
};

// edit article
const editArticle = async (req, res) => {
  const articleId = req.params;
  const { title, content } = req.body.data;
  // check if user own this article
  try {
    const article = new Article(articleId);
    const data = await article.findArticleById();
    if (!data) return notFound(res);
    // article exist and can update it
    data.title = title;
    data.content = content;
    // send success message witht the updated data
    success(data, res);
  } catch (err) {
    // when anything else goes wrong, we return a 500 status and the error
    serverExceptions(err, res);
  }
};
// Block, update the editArticle above to use the same middleware as deleteArticle
// delete article
const deleteArticle = async (req, res) => {
  // verification was done by our middleware verifyArticleAndUser
  // req.index was set by our middleware,
  articleStore.splice(req.index, 1);// delete article
  // res.status(204).json({}) // 204 doesnt return any response text, so we use 200,
  res.status(200).json({ status: 200, message: 'deleted article successful' });
};

const postComment = (req, res) => {
  const { articleId } = req.params;
  const commentId = uuid();
  const createdOn = new Date();
  const authorId = req.loggedinUser.email; // get the user email from the tokens set in jwt verify
  const { comment } = req.body;
  const commentData = new Comment(articleId, commentId, createdOn, authorId, comment);
  commentData.addComment(); // comment is created here
  // response to send to requester ie article title, content , and comment
  const data = {
    createdOn,
    articleTitle: articleStore[req.ArticleIndex].title, // index set in our middlware prior to this
    article: articleStore[req.ArticleIndex].content,
    comment,

  };
  dataCreated(data, res);
};

export {
  writeArticle, editArticle, deleteArticle, postComment,
};
