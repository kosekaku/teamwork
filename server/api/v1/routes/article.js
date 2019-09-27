// routes for article
import express from 'express';
import { writeArticle, editArticle } from '../controllers/article';
import authUsers from '../middleware/auth';
import { writeArticleValidation } from '../middleware/validators';

const router = express.Router();
// middle ware to use for all article routes ie router.post('/',authUsers.authUse, writeArticle);
router.use(authUsers.authUser); // midleware handle anything performed on this route
router.post('/', writeArticleValidation, writeArticle);
router.patch('/:articleId', writeArticleValidation, editArticle); // using write article input validations as we are also updating same fieds

export default { router };
