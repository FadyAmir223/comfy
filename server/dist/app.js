import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CLIENT_URL, CLIENT_PORT, NODE_ENV } from './loadEnv.js';
import api from './routes/api.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const clientUrl = `${CLIENT_URL}:${CLIENT_PORT}`;
const app = express();
app.use(cors({ origin: clientUrl }));
app.use(helmet());
app.use(express.json());
if (NODE_ENV === 'development')
    app.use(morgan('dev'));
app.use(express.static(join(__dirname, '..', 'public')));
app.use('/api', api);
app.get('/*', (_, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});
export default app;
