import { Console } from 'node:console';
import Temperature from '../models/temperature.js';

class TemperatureController {
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

	async sendTemperature(temperature){
		try{
			Temperature.insert(temperature);
		}catch(err){
			console.log(err);
		}
	}

}

export default new TemperatureController();
