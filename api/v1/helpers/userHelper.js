// user helper functions
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// hash passwords using bcrypt module
const hasPassword = (password) => {
  const passwordSalt = 10;
  const hashingPassword = bcrypt.hashSync(password, passwordSalt);
  return hashingPassword;
};

// generate jwt tokens
const generateTokens = (email) => {
  // Synchronous Sign with default (HMAC SHA256), ie arg after secrete key
  const token = jwt.sign({ email }, 'heySecreetKEY', { expiresIn: '1hr' });
  return token;
};

export { hasPassword, generateTokens };
