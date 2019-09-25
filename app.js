import express from 'express';
import mocha from 'mocha';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './server/api/v1/routes/user';
import { stat } from 'fs';
// console.log(userRouter);
dotenv.config(); // load .env Variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', userRouter.router);
const port = process.env.PORT;


// generic error middleware functions
app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
  return res.status(404).json({ status: error.status, message: error.message });
});

// make a static folder for public images
// app.use('/uploads', express.static('uploads'));
if (!module.parent) { // check to see if there no test happening otherwise without this,
  // we get the error of address already in use when we run mocha test.
  app.listen(port, () => console.log(`listenting on port ${port} `)); // BOCKER, find how to test this
}

export default app;
