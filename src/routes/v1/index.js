import express from 'express';
import { PingController } from '../../controllers/index.js';
import * as EventRoutes from './event-routes.js';

const router = express.Router();

router.get('/ping', PingController.ping);
router.use('/events', EventRoutes.router);

export { router };
