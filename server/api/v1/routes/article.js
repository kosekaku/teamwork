// routes for article
import express from 'express';
import { writeArticle } from '../controllers/article';
import authUsers from '../middleware/auth';
import { writeArticleValidation } from '../middleware/validators';

const router = express.Router();
// middle ware to use for all article routes ie router.post('/',authUsers.authUse, writeArticle);
router.use(authUsers.authUser);
router.post('/', writeArticleValidation, writeArticle);

export default { router };
