const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');

const { UserQuery } = require('../queries');

export const getAll = async (req, res, next) => {
  try {
    const users = await UserQuery.findAll({});

    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    return next(err);
  }
};

export const comment = async (req, res, next) => {
  try {
    const users = await UserQuery.findAll({});

    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    return next(err);
  }
};
