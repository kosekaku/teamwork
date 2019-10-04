import express from 'express';
import mocha from 'mocha';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './server/api/v1/routes/user';
import articleRouter from './server/api/v1/routes/article';
import { stat } from 'fs';
// console.log(userRouter);
dotenv.config(); // load .env Variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', userRouter.router);
app.use('/api/v1/articles', articleRouter.router);
app.use('/api/v1/feeds', articleRouter.router);
const port = process.env.PORT;

// generic error middleware functions
app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  return res.status(404).json({ status: error.status, message: error.message });
});

if (!module.parent) {
  app.listen(port, () => console.log(`listenting on port ${port} `));
}

export default app;
