import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { articleStore } from '../models/Article';
import {
  notFound, accessDenied, serverExceptions, forbidden,
} from '../helpers/messages';

dotenv.config();

// authenitication function
const authUser = (req, res, next) => {
  const header = req.headers['x-auth-token'];
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    // const decoded = JWT.verify(token, 'secretKeys'); // sync way
    // async way
    JWT.verify(req.token, process.env.JWT_KEY, (error, data) => {
      if (error) return res.status(401).json({ status: 401, error }); // unauthorized scenarios
      req.loggedinUser = data;
      next();
    });
  } else {
    accessDenied(res);
  }
};

// verify article/user exist middleware
const verifyArticleAndUser = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    let article = null;
    let index;
    await articleStore.forEach((elements, indexOf) => {
      if (elements.articleId === articleId) {
        article = elements;
        index = indexOf;
      }
    });
    if (article === null) return notFound(res);
    // valid token, but resource not allowed for them
    if (article.ownerEmail !== req.loggedinUser.email) return forbidden(res);
    req.index = index; // will be used in delete op
    req.articleData = article;
    next();
  } catch (error) {
    serverExceptions(error, res);
  }
};

const verifyArticleExist = async (req, res, next) => {
  const { articleId } = req.params;
  let article = null;
  let index;
  try {
    await articleStore.forEach((elements, indexOf) => {
      if (elements.articleId === articleId) {
        article = elements;
        index = indexOf;
      }
    });
    if (article === null) return notFound(res);
    req.ArticleIndex = index; // we will use this in comment controller to send details with comment
    next();
  } catch (error) { serverExceptions(error, res); }
};


export { authUser, verifyArticleAndUser, verifyArticleExist };
