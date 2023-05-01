import mongoose from 'mongoose';
import { MONGO_URL } from './loadEnv.js';
mongoose.connection.once('open', () => {
    console.log('mongoDB connection ready');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL + '/comfy');
};
const mongoDisconnect = async () => {
    await mongoose.disconnect();
};
export { mongoConnect, mongoDisconnect };
