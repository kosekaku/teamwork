import uuid from 'uuid/v1';
import Article from '../models/Article';
import Comment from '../models/Comments';
import {
  success, dataCreated, somethingWrongErr,
} from '../helpers/messages';
import { serverExceptions } from '../../v1/helpers/messages';

// post article
const writeArticle = async (req, res) => {
  try {
    const { title, article } = req.body;
    const {
      iat, exp, email, ...author
    } = req.loggedinUser; // get token data set at signup/signin
    const newArticle = new Article(uuid(), author.userId, new Date(), title, article);
    const creatingArticle = await newArticle.createArticle(); // article is created here
    if (!creatingArticle) return somethingWrongErr(res);
    const {
      authorid, articleid, createdon, ...otherData
    } = creatingArticle.rows[0]; // destructure and spread(otherData) out data
    const data = {
      articleid, createdon, author, ...otherData,
    };
    return dataCreated(data, res);
  } catch (err) {
    somethingWrongErr(res);
  }
};

// edit article
const editArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { title, article } = req.body;
    const updatingArticle = await Article.updateArticle(title, article, articleId);
    if (!updatingArticle) return somethingWrongErr(res);
    success({ ...updatingArticle.rows[0] }, res);
  } catch (err) {
    somethingWrongErr(res);
  }
};

// delete article
const deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const deletingArticle = await Article.deleteArticle(articleId);
    if (!deletingArticle) return somethingWrongErr(res);
    res.status(200).json({ status: 200, message: `deleted article with id ${deletingArticle.rows[0].articleid} ` });
  } catch (error) {
    somethingWrongErr(error);
  }
};

// post comments
const postComment = async (req, res) => {
  try {
    const { articleId } = req.params;
    const author = req.loggedinUser.userId;
    const { comment } = req.body;
    const commentData = new Comment(articleId, uuid(), new Date(), author, comment);
    const addingComment = await commentData.addComment();
    const { createdon, ...otherCommentInfo } = addingComment.rows[0]; // RETURNING postgresql
    const { title, article } = req.articleData.rows[0]; // get data from req set by middleware
    const data = {
      createdon,
      articleTitle: title,
      article,
      comment: otherCommentInfo.comment,
    };
    dataCreated(data, res);
  } catch (error) {
    serverExceptions(error, res);
  }
};

// view all articles showing the most recent ones
const viewAllArticles = (req, res) => {
  const result = [];
  for (let i = 1; i <= articleStore.length; i += 1) {
    const data = {
      id: articleStore[articleStore.length - i].articleId,
      createdOn: articleStore[articleStore.length - i].createdOn,
      title: articleStore[articleStore.length - i].title,
      article: articleStore[articleStore.length - i].content,
    };
    result.push(data);
  }
  success(result, res);
};


// view specific article details
const viewSpecificArticle = async (req, res) => {
  const { articleId } = req.params;
  const data = await Article.findArticleById(articleId);
  const dataComment = await Comment.findArticleComments(articleId);
  if (dataComment.length === 0) {
    return success({
      id: data.articleId,
      createdOn: data.createdOn,
      titile: data.title,
      article: data.content,
      authorId: data.ownerEmail,
      comments: 'No comment for this article',
    }, res);
  }
  const results = {
    id: data.articleId,
    createdOn: data.createdOn,
    titile: data.title,
    article: data.content,
    authorId: data.ownerEmail,
    comments: dataComment,
  };
  success(results, res);
};

export {
  writeArticle, editArticle, deleteArticle, postComment, viewAllArticles, viewSpecificArticle,
};
