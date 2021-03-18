const http = require('http');
const express = require('express');
const app = express();
const { Kafka } = require('kafkajs');
const mongo = require('mongodb');
const { syncBuiltinESMExports } = require('module');
const mongoClient = mongo.MongoClient;

// This should be implemented in a config file.
const url = 'mongodb://127.0.0.1:27017/';

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

			mongoClient.connect(url, (err, db) => {
				if (err) throw err;

				let dbo = db.db('stackPortal');

				dbo
					.collection('temperatures')
					.insertOne(temperature, (err, response) => {
						if (err) throw err;
						console.log('New temperature added...' + temperature);
						db.close();
					});
			});
		},
	});
};

auxConsumer();

app.get('/', (req, res) => {
	res.send('<h1>Servidor rodando !</h1>');
});

app.get('/lastTemperature', (req, res) => {
	mongoClient.connect(url, (err, db) => {
		if (err) throw err;
		let dbo = db.db('stackPortal');
		let cursor = dbo
			.collection('temperatures')
			.find()
			.limit(1)
			.sort({ $natural: -1 });

		cursor.toArray(function (err, results) {
			if (err) throw err;
			res.send(results);
			console.log('%j', results);
			db.close();
		});
	});
});

http.createServer(app).listen(3000, () => {
	console.log('Servidor rodando na porta local 3000');
});
