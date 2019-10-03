// user helper functions
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// hash passwords using bcrypt module
const hasPassword = (password) => {
  const passwordSalt = 10;
  const hashingPassword = bcrypt.hashSync(password, passwordSalt);
  return hashingPassword;
};

export { hasPassword };
