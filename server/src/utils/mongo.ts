import mongoose from 'mongoose';
import { MONGO_URL } from './loadEnv.js';

const DB_URL = MONGO_URL + '/comfy';

// 'mongodb://localhost/app-name'
// 'mongodb://username:foobar@localhost/app-name?authSource=admin&w=1'

mongoose.connection.once('open', () => {
  console.log('mongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(DB_URL);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export { DB_URL, mongoConnect, mongoDisconnect };
