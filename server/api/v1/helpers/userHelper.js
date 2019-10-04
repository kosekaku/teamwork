// user helper functions
import bcrypt from 'bcrypt';

// hash passwords using bcrypt module
const hasPassword = (password) => {
  const passwordSalt = 10;
  const hashingPassword = bcrypt.hashSync(password, passwordSalt);
  return hashingPassword;
};

export { hasPassword };
