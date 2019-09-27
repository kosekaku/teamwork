// validations middlewares goes here
import Joi from 'joi';
import { joiError } from '../helpers/messages';

// validate user signup
const signupValidation = (req, res, next) => {
  // Joi.validate("1", Joi.string()); how it works
  const schema = {
    data: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().min(5).required(),
      gender: Joi.string().required(),
      jobRole: Joi.string().required(),
      department: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      address: Joi.string().required(),
    },
  };
  const results = Joi.validate(req.body, schema);
  // get the error from the validation just done above
  const { error } = results;
  if (error) return joiError(error, res);
  // no error, user can now signup
  next();
};

// signin validation
const signinValidation = (req, res, next) => {
  const schema = {
    data: {
      // minDomainSegments doesnt check . in the email, so minDomainAtoms is the best case
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required(),
    },
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return joiError(error, res);
  next(); // no error occured, user can continue to login validation at the server controller
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
  if (error) return joiError(error, res); // user requester didnt fullfill the our requirements
  next(); // when no error occur, allow user to continue to next step of validation
};


export { signupValidation, signinValidation, writeArticleValidation };
