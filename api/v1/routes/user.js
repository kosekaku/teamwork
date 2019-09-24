// User route for all operations performed on user
import express from 'express';
import userController from '../controllers/user';
import { validateSignup } from '../middleware/validators';

const router = express.Router();

// router.post('/signup', validateSignup, userController.signup);


export default { router };
