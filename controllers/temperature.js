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

	async sendTemperature(temperature) {
		Temperature.create(temperature, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Temperature added to mongodb');
			}
		});
	}
}

export default new TemperatureController();
