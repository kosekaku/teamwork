import uuid from 'uuid/v1';
import { Article, articleStore } from '../models/Article';
import {
  success, dataCreated, notFound, serverExceptions,
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

export { writeArticle, editArticle };
