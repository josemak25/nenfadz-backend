import httpStatus from 'http-status';
import authService from '../services/auth.service';
import sendResponse from '../helpers/response';

const authorization = (req, res, next) => {
  let tokenToVerify;
  const signature = req.header('Authorization');
  const content = signature ? signature.split(' ') : false;

  if (content && content.length === 2 && content[0] === 'Bearer') {
    const [, token] = content;
    tokenToVerify = token;
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.body.token;
  }

  if (tokenToVerify) {
    return authService.verify(tokenToVerify, (err, thisToken) => {
      if (err) {
        return res.status(401).json(
          sendResponse(httpStatus.UNAUTHORIZED, 'Invalid Token', null, {
            error: 'Invalid Token'
          })
        );
      }
      req.token = thisToken;
      return next();
    });
  }

  return res.status(401).json(
    sendResponse(httpStatus.UNAUTHORIZED, 'No Token found', null, {
      error: 'No Authorization found'
    })
  );
};

export default authorization;
