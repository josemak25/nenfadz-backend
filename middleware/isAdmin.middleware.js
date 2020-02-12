/* eslint-disable camelcase */
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';

const IsAdmin = (req, res, next) => {
  const { user_type } = req.token;

  if (user_type !== 'admin') {
    return res.json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized to perform this operation!',
        null,
        { error: 'Invalid credentials' }
      )
    );
  }

  return next();
};

export default IsAdmin;
