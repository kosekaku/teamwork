import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import Article from '../models/Article';
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
    const article = await Article.findArticleById(articleId);
    if (article.rows.length === 0) return notFound(res);
    // compare logined user data from tokens with the article data
    if (article.rows[0].authorid !== req.loggedinUser.userId) return forbidden(res);
    next();
  } catch (error) {
    serverExceptions(error, res);
  }
};

const verifyArticleExist = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findArticleById(articleId);
    if (article.rows.length === 0) return notFound(res);
    req.articleData = article;
    next();
  } catch (error) { serverExceptions(error, res); }
};


export { authUser, verifyArticleAndUser, verifyArticleExist };
