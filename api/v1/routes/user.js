// User route for all operations performed on user
import express from 'express';
import userController from '../controllers/user';
import { signupValidation } from '../middleware/validators';

const router = express.Router();

// router.post('/signup', validateSignup, signup);
router.post('/signup', signupValidation, userController.signup);

export default { router };
