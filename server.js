import app from './app.js';

const port = process.env.port || 3000;

try {
	app.listen(port, () => {
		console.info(`Server running on port ${port}`);
	});
} catch (error) {
	console.error(error);
	process.exit(1);
}
