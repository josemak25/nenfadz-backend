/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */

const JoiErrorFormatter = errors => {
  return errors.reduce((errMessage, { path, message }) => {
    const [key] = path;
    if (!errMessage[key]) {
      // eslint-disable-next-line no-param-reassign
      errMessage[key] = message.replace(/["']/g, '');
    }
    return errMessage;
  }, {});
};

export default JoiErrorFormatter;
