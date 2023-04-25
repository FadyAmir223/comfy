import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// dotenv.config()

dotenv.config({
  path: join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
  ),
});

export const { NODE_ENV, CLIENT_URL, CLIENT_PORT, SERVER_URL, SERVER_PORT } =
  process.env;
