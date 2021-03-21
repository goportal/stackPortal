import Router from 'express';
import TemperatureController from '../controllers/temperature.js';

const router = new Router();

router.get('/last', (req, res) => {
	TemperatureController.getLast(req, res);
});

export default router;
