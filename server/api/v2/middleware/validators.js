// validations middlewares goes here
import Joi from 'joi';
import { joiError } from '../helpers/messages';

// validate user signup
const signupValidation = (req, res, next) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(5).required(),
  };
  const results = Joi.validate(req.body, schema);
  const { error } = results;
  if (error) return joiError(error, res);
  next();
};

// signin validation
const signinValidation = (req, res, next) => {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return joiError(error, res);
  next();
};


// POST /api/v1/articles route validation
const writeArticleValidation = (req, res, next) => {
  const schema = {
    data: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return joiError(error, res);
  next();
};

// validate comment input field
const commentValidation = (req, res, next) => {
  const schema = {
    comment: Joi.string().required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return joiError(error, res);
  next();
};

export {
  signupValidation, signinValidation, writeArticleValidation, commentValidation,
};
