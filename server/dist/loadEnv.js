import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();
export const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SESSION_KEY_1, SESSION_KEY_2, } = process.env;
dotenv.config({
    path: join(dirname(fileURLToPath(import.meta.url)), '..', process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'),
});
export const { NODE_ENV, CLIENT_URL, CLIENT_PORT, SERVER_URL, SERVER_PORT } = process.env;
