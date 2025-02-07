import express from 'express';
import { pingController } from '../../controllers/index.js';

const router = express.Router();

router.get('/ping', pingController.ping);

export { router };
