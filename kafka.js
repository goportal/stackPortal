const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'server',
	brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

let auxConsumer = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: 'test-topic', fromBeginning: false });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			let timestamp =
				new Date().getHours() +
				':' +
				new Date().getMinutes() +
				':' +
				new Date().getSeconds();
			let temperature = {
				temp: message.value.toString(),
				timestamp: timestamp,
			};
		},
	});
};

auxConsumer();
