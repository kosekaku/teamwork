import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// generate tokens
const GenerateTokens = (userId, firstName, lastName, email) => {
  const token = jwt.sign(
    {
      userId,
      firstName,
      lastName,
      email,
    }, process.env.JWT_KEY,
    {
      expiresIn: '1hr',
    },
  );
  return token;
};

export { GenerateTokens };
