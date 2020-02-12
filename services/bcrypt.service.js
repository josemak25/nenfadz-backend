import bcrypt from 'bcrypt';
import config from '../config';

const hashPassword = user => {
  const hash = bcrypt.genSaltSync(config.bcryptSalt);
  return bcrypt.hash(user.password, hash);
};

const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export default { hashPassword, comparePassword };
