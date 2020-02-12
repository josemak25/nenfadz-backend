import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

/** GET /health-check - Check service health */

/**
 * @method GET - http verb for request
 * @listens /health-check  - event params listened to for actions
 * @callback callback - callback function called on each request
 * @returns {{}} - a response object
 */

router.get('/health-check', (_req, res) =>
  res.send({ check: 'nenfadz server started ok' })
);

// mount auth routes
router.use('/auth', authRoutes);

// mount auth routes
router.use('/users', userRoutes);

export default router;
