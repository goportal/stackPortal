import { Console } from 'node:console';
import Temperature from '../models/temperature.js';

class TemperatureController {
	async print(){
		Console.log("OLAAAAAA");
	}
	async getLast(req, res) {
		try {
			const temperatures = await Temperature.find({})
				.limit(1)
				.sort({ $natural: -1 });
			res.send(temperatures);
		} catch (err) {
			res.status(400).send(err.message);
		}
	}
}

export default TemperatureController;
