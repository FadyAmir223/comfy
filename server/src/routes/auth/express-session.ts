import expressSession from 'express-session';
import MongoStore from 'connect-mongo';

import { SESSION_KEY_1, SESSION_KEY_2 } from '../../utils/loadEnv.js';
import { DB_URL } from '../../utils/mongo.js';

export default expressSession({
  name: 'express-session',
  secret: [SESSION_KEY_1, SESSION_KEY_2],
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 1000,
    // maxAge: 24 * 60 * 60 * 1000,
  },
  store: MongoStore.create({
    mongoUrl: DB_URL,
    autoRemove: 'native',
    // autoRemove: 'interval',
    // autoRemoveInterval: 2,
    ttl: 2 * 1000,
    // touchAfter: 24 * 60 * 60
  }),
});
