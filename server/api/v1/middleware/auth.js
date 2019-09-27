// jason web tokens verifications goes here
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

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

export default { authUser };
