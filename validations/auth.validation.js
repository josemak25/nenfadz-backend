import { Joi } from 'celebrate';

export default {
  // POST /api/v1/auth/signup
  createUser: {
    body: {
      name: Joi.string()
        .max(500)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(250)
        .required()
    }
  },

  // POST /api/v1/auth/login
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(250)
        .required()
    }
  }
};
