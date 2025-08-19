import express from 'express';
import { EventController } from '../../controllers/index.js';

const router = express.Router();

router.post('/', EventController.createEvent);
router.get('/', EventController.getEvent);
router.patch('/', EventController.updateEvent);

export { router };
