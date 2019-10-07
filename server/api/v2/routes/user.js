// User route for signup and signin
import express from 'express';
import userController from '../controllers/user';
import { signupValidation, signinValidation } from '../middleware/validators';

const router = express.Router();

router.post('/signup', signupValidation, userController.signup);
router.post('/signin', signinValidation, userController.signin);

export default { router };
