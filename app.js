import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index.js';

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);
		this.server.use(bodyParser.json());
		this.server.use(morgan('combined'));
	}

	routes() {
		this.server.use(routes);
	}
}

export default new App().server;
