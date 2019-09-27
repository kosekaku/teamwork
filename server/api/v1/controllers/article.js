import { Article } from '../models/Article';
import { success, dataCreated } from '../helpers/messages';
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
  const article = new Article(createdOn, author, email, title, content);
  await article.createArticle();
  const data = {
    createdOn, author, title, content,
  };
  // req.setHeader('Authorialization', 'Bearer '+'mytokens2'); // nodejs way
  // res.header('Authorialization', 'Bearer '+'mytokens2'); // expressjs way
  return dataCreated(data, res);
  // return res.status(201).json({ status: 201, message: 'article successful created', data });

};

export { writeArticle };
