import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	temperature: String,
	timestamp: String,
});

const Temperature = mongoose.model('Temperature', schema);

export default Temperature;
