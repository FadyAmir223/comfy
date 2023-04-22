import { readFileSync } from 'fs';
import https from 'https';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import {
  CLIENT_URL,
  CLIENT_PORT,
  SERVER_URL,
  SERVER_PORT,
} from './utils/loadEnv.js';

const __dirname = dirname(fileURLToPath(import.meta.url)),
  clientUrl = `${CLIENT_URL}:${CLIENT_PORT}`,
  serverUrl = `${SERVER_URL}:${SERVER_PORT}`;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: clientUrl,
  })
);

app.get('/test', (req, res) => {
  return res.status(200).json({ success: false });
});

app.use(express.static(join(__dirname, '..', 'public')));

app.get('/*', (_, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

const server = https.createServer(
  {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
  },
  app
);

server.listen(SERVER_PORT, () => {
  console.log(serverUrl);
});
