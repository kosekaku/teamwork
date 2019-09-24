// validations middlewares goes here
import Joi from 'joi';

// validate user signup
const signupValidation = (req, res, next) => {
  // Joi.validate("1", Joi.string()); how it works
  const schema = {
    data: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
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
  if (error) return res.status(400).json({ status: 400, message: error.details[0].message });
  // no error, user can now signup
  next();
};


export { signupValidation };
