import { Kafka } from 'kafkajs';

const kafka = new Kafka({
	clientId: 'Client01',
	brokers: ['localhost:9092'],
});

let send = async () => {
	const producer = kafka.producer();

	await producer.connect();

	let online = true;
	let temperature = 35;

	do {
		if (Math.floor(Math.random() * Math.floor(11)) % 2 == 0) {
			temperature += 1;
		} else {
			temperature -= 1;
		}

		console.log('Sending ' + temperature + 'c temperature');

		await producer.send({
			topic: 'temperature-topic',
			messages: [{ value: temperature.toString() }],
		});

		await new Promise((resolve) => setTimeout(resolve, 5000));
	} while (online);
	await producer.disconnect();
};

send();
