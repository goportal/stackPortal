import { Router } from 'express';
import temperatureRouter from './temperature.js';

const router = new Router();

router.get('/', (req, res) => {
	res.send('<h1>Server Running !!!! </h1>');
});
router.use('/temperature', temperatureRouter);

export default router;
