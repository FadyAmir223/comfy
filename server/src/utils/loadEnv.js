import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));

// dotenv.config()

dotenv.config({
  path: join(
    __dirname,
    '..',
    '..',
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  ),
});

export const { NODE_ENV, CLIENT_URL, CLIENT_PORT, SERVER_URL, SERVER_PORT } =
  process.env;
