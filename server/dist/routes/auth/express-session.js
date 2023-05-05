import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import { SESSION_KEY_1, SESSION_KEY_2 } from '../../utils/loadEnv.js';
import { DB_URL } from '../../utils/mongo.js';
export default expressSession({
    name: 'express-session',
    secret: [SESSION_KEY_1, SESSION_KEY_2],
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
        mongoUrl: DB_URL,
    }),
});
