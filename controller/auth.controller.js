const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');

const { UserQuery } = require('../queries');

export const register = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const userExists = await UserQuery.findOne({ email });

    if (userExists) {
      return res.status(httpStatus.BAD_REQUEST).json(
        sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, {
          email: 'email already registered with us'
        })
      );
    }

    const user = await UserQuery.create({ email, name, password });

    return res.json(sendResponse(httpStatus.OK, 'success', user, null));
  } catch (err) {
    return next(err);
  }
};

export const login = async (_req, res, next) => {
  try {
    const users = await UserQuery.findAll({});

    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    return next(err);
  }
};
