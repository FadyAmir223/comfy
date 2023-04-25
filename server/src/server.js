import express from 'express';
import cors from 'cors';
import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
} from './utils/loadEnv.js';
import imageRoute from './utils/imageUpload.js';

const serverUrl = `${SERVER_URL}:${SERVER_PORT}`;
const clientUrl = `${CLIENT_URL}:${CLIENT_PORT}`;

const app = express();

app.use(cors({ origin: clientUrl }));
app.use('/api/image', imageRoute);

app.listen(SERVER_PORT, () => {
  console.log('\x1b[36m', serverUrl, '\x1b[0m');
});
