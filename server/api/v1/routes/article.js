// routes for article
import express from 'express';
import {
  writeArticle, editArticle, deleteArticle, postComment, viewAllArticles, viewSpecificArticle,
} from '../controllers/article';
import { authUser, verifyArticleAndUser, verifyArticleExist } from '../middleware/auth';
import { writeArticleValidation, commentValidation } from '../middleware/validators';

const router = express.Router();
router.use(authUser); // midleware handle anything performed on this route
router.post('/', writeArticleValidation, writeArticle);
router.patch('/:articleId', verifyArticleAndUser, writeArticleValidation, editArticle);
router.delete('/:articleId', verifyArticleAndUser, deleteArticle);
router.post('/:articleId/comments', verifyArticleExist, commentValidation, postComment);
router.get('/', viewAllArticles);
router.get('/:articleId', verifyArticleExist, viewSpecificArticle);
export default { router };
