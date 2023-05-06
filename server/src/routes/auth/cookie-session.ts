import cookieSession from 'cookie-session';

import { SESSION_KEY_1, SESSION_KEY_2 } from '../../utils/loadEnv.js';

export default cookieSession({
  name: 'cookie-session',
  keys: [SESSION_KEY_1, SESSION_KEY_2],
  // maxAge: 10 * 1000,
  maxAge: 24 * 60 * 60 * 1000,
});
