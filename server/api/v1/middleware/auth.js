// jason web tokens verifications goes here
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { articleStore } from '../models/Article';
import { notFound, accessDenied, serverExceptions } from '../helpers/messages';

dotenv.config();

// authenitication function
const authUser = (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    // const decoded = JWT.verify(token, 'secretKeys'); // sync way
    // async way
    JWT.verify(req.token, process.env.JWT_KEY, (error, data) => {
      if (error) return res.status(403).json({ status: 403, error });
      req.loggedinUser = data;
      res.status(204);
      next();
    });
  } else {
    // return forbiden when header is undefined
    res.status(403).json({ status: 403, error: 'access denied, no authentication provided' });
  }
};

/* verify article exists and whether user owns it
This middleware will help us in edit, delete, and any
operations that require to validate if artice exist, and the owner
*/
const verifyArticleAndUser = async (req, res, next) => {
  const { articleId } = req.params;
  let article = null;
  let index;
  try {
    await articleStore.forEach((elements, indexOf) => {
      if (elements.articleId === articleId) { // article matches, do some setups and escape the loop
        article = elements;
        index = indexOf;
      }
    });
    if (article === null) return notFound(res); // no article match the given id
    if (article.ownerEmail !== req.loggedinUser.email) return accessDenied(res); // not own by user
    req.index = index; // send this index such that we use it during delete operation
    next(); // article exist and user owns it, allow handler function to do whatever it wants
  } catch (error) {
    serverExceptions(error, res);
  }
};


export { authUser, verifyArticleAndUser };
