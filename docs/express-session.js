
// npm install express-session

import expressSession from 'express-session';

app.use(
  expressSession({
    secret: '', // required - <string | string[]>
    name: 'connect.sid', // <string>
    proxy: undefined, // <bool | undefined>
    saveUninitialized: true, // false is useful for implementing login sessions
    resave: true, // How do I know if this is necessary for my store? check with your store if it implements the touch method. If it does, then you can safely set resave: false. If it does not and your store sets an expiration date on stored sessions, then you likely need resave: true.
    rolling: false, // reset maxAge (to original) on every response
    store: , // The session store instance, defaults: new MemoryStore
    unset: 'keep', // <'keep' | 'destroy'> Control the result of unsetting req.session (through delete, setting to null, etc
    genid: (req) => genuuid(), // use UUIDs for session IDs
    cookie: {
      maxAge: null, // duration in ms
      secure: false, // <bool | 'auto'>
      httpOnly: true, // <bool>
      expires: null, // <date>
      path: '/',
      domain: null, //current <string>
      sameSite: false, // <bool | 'lax' | 'none' | 'strict'>
    }
  })
);

// access
req.session

// To regenerate the session simply invoke the method. Once complete, a new SID and Session instance will be initialized at req.session and the callback will be invoked.
req.session.regenerate((err) => { /* will have a new session here */ })

// Destroys the session and will unset the req.session property. Once complete, the callback will be invoked.
req.session.destroy((err) => { /* cannot access session here */ })

// Reloads the session data from the store and re-populates the req.session object. Once complete, the callback will be invoked.
req.session.reload((err) => { /* session updated */ })


// automatically called at end of HTTP response if the session data has been altered
// There are some cases where it is useful to call this method,
// example: redirects, long-lived requests or in WebSockets.
req.session.save((err) => { /* session saved */ })

// Updates the .maxAge property. Typically this is not necessary to call, as the session middleware does this for you.
req.session.touch()

req.session.id = req.sessionID

// Each session has a unique cookie object accompany it. allows you alter session cookie per visitor
req.session.cookie

req.session.cookie.expires
req.session.cookie.maxAge
req.session.cookie.originalMaxAge
