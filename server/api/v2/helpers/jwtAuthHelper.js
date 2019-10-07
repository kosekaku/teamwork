import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// generate tokens
const GenerateTokens = (firstName, lastName, email) => {
  const token = jwt.sign(
    { firstName, lastName, email }, process.env.JWT_KEY,
    {
      expiresIn: '1hr',
    },
  );
  return token;
};

export { GenerateTokens };
