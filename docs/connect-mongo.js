// https://www.npmjs.com/package/connect-mongo#options

// npm install connect-mongo

import expressSession from 'express-session';
import MongoStore from 'connect-mongo';

import { DB_URL } from '../utils/mongo.js';

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: '', // mongodb://localhost/test-app
      touchAfter: 0, // 24 * 3600 in seconds
      // Interval (in seconds) between session updates
      // if you don't want to resave all the session on database every single time that the user refreshes the page, you can lazy update the session, by limiting a period of time
      crypto: {}, // working with sensitive session data recommended to use encryption
      autoRemove: 'native', // <'native' | 'disabled'> expired sessions
      autoRemoveInterval: 10, // in minutes
    }),
  })
);

// events
create: 'session created';
touch: 'session touched (but not modified)';
update: 'session updated';
set: 'session created OR updated';
destroy: 'session destroyed manually';

// When the session cookie has an expiration date, connect-mongo will use it
// Each time user interacts with the server, its session expiration date refreshed
