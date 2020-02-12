import jwt from 'jsonwebtoken';
import config from '../config';

const { jwtSecret, jwtExpiry } = config;

const issueAuth = payload => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiry });
};

const verifyAuth = token => jwt.verify(token, jwtSecret, {});

export default { issueAuth, verifyAuth };
