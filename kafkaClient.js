import {Kafka} from 'kafkajs';
// const {Kafka} = require('kafkajs');
import TemperatureController from './controllers/temperature.js';

class KafkaClient{
	constructor(){
		this.init();
	}
	
	init(){
		const kafka = new Kafka({
			clientId: 'server',
			brokers: ['localhost:9092'],
		});

		const consumer = kafka.consumer({ groupId: 'portalStack-group' });
		
		let auxConsumer = async () => {
			await consumer.connect();
			await consumer.subscribe({ topic: 'temperature-topic', fromBeginning: false });
			
			await consumer.run({
				eachMessage: async ({ topic, partition, message }) => {
					let timestamp =
					new Date().getHours() +
					':' +
					new Date().getMinutes() +
					':' +
					new Date().getSeconds();
					let temperature = {
						temperature: message.value.toString(),
						timestamp: timestamp,
					};
					TemperatureController.sendTemperature(temperature);

				},
			});

		};
		
	}
	
	
}

export default KafkaClient;



