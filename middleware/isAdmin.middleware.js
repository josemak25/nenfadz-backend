import httpStatus from 'http-status';
import sendResponse from '../helpers/response';

const IsAdmin = (req, res, next) => {
  const { userType } = req.token;

  if (userType !== 'admin') {
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
