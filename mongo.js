import mongoose from 'mongoose';

const URI = 'mongodb://127.0.0.1:27017/stackPortal';

class Database {
	constructor() {
		this.init();
	}

	init() {
		mongoose
			.connect(URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.info('Database connected sucessfully');
			})
			.catch((err) => {
				console.error('Database connection fail');
				console.error(err);
			});
	}
}
export default new Database();
