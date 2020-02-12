import { Router } from 'express';
import { celebrate as validate } from 'celebrate';

import * as authCtrl from '../controller/auth.controller';
import paramValidation from '../validations/auth.validation';

const router = Router();

/** POST /signup - Check service health */
/**
 * @method POST - http verb for request
 * @listens /signup  - event params listened to for actions
 * @callback callback - callback function called on each request
 * @returns {{}} - a response object
 */
router
  .route('/signup')
  .post(
    validate(paramValidation.createUser, { abortEarly: false }),
    authCtrl.register
  );

/** POST /login - Check service health */
/**
 * @method POST - http verb for request
 * @listens /login  - event params listened to for actions
 * @callback callback - callback function called on each request
 * @returns {{}} - a response object with token
 */

router
  .route('/login')
  .post(validate(paramValidation.login, { abortEarly: false }), authCtrl.login);

export default router;
