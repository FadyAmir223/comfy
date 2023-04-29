import https from 'https';
import { readFileSync } from 'fs';
import { SERVER_URL, SERVER_PORT } from './utils/loadEnv.js';
import app from './app.js';
const server = https.createServer({
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
}, app);
(async function startServer() {
    server.listen(SERVER_PORT, () => {
        const serverUrl = `${SERVER_URL}:${SERVER_PORT}`;
        console.log('\x1b[36m', serverUrl, '\x1b[0m');
    });
})();
