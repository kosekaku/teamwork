// routes for article
import express from 'express';
import { writeArticle, editArticle, deleteArticle, postComment } from '../controllers/article';
import { authUser, verifyArticleAndUser, verifyArticleExist } from '../middleware/auth';
import { writeArticleValidation } from '../middleware/validators';

const router = express.Router();
// middle ware to use for all article routes ie router.post('/',authUsers.authUse, writeArticle);
router.use(authUser); // midleware handle anything performed on this route
router.post('/', writeArticleValidation, writeArticle);
router.patch('/:articleId', writeArticleValidation, editArticle); // using write article input validations as we are also updating same fieds
router.delete('/:articleId', verifyArticleAndUser, deleteArticle); // we dont need input validation here
router.post('/:articleId/comments', verifyArticleExist, postComment);
export default { router };
