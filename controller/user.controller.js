import httpStatus from 'http-status';
import sendResponse from '../helpers/response';

// eslint-disable-next-line import/named
import { UserQuery } from '../queries';

export const getAll = async (_req, res, next) => {
  try {
    const users = await UserQuery.findAll({});

    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    return next(err);
  }
};

export const comment = async (_req, res, next) => {
  try {
    const users = await UserQuery.findAll({});

    return res.json(sendResponse(httpStatus.OK, 'success', users, null));
  } catch (err) {
    return next(err);
  }
};
