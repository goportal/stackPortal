import mongoose from 'mongoose';

const URI = `mongodb://${process.env.DATABASE_USERNAME}1:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOSTNAME}/${process.env.DATABASE_DATABASE}`;
// 'mongodb://127.0.0.1:27017/';

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