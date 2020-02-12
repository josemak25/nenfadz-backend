import { Router } from 'express';

import * as userCtrl from '../controller/user.controller';

import authToken from '../policies/auth.policy';
import IsAdmin from '../middleware/isAdmin.middleware';

const router = Router();

/** GET / - Get all users from database */
/**
 * @method GET - http verb for request
 * @listens /  - event params listened to for actions
 * @callback callback - callback function called on each request
 * @returns {{}} - a response object of all users
 */

router.route('/').get(authToken, IsAdmin, userCtrl.getAll);

export default router;
