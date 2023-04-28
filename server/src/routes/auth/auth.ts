import express from 'express';
import { parse } from 'url';

import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';

import cookieSession from 'cookie-session';
// import expressSession from 'express-session';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_KEY_1,
  SESSION_KEY_2,
} from '../../loadEnv.js';

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) return res.status(401).json({ error: 'you must log in' });
  next();
}

function checkPermissions(req, res, next) {
  const isAuthenticated = req.isAuthenticated() && req.user;
  if (!isAuthenticated) return res.status(403).json({ error: 'forbidden' });
  next();
}

const config = {
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_KEY_1,
  SESSION_KEY_2,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/google/callback`,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  done(null, profile);
}

passport.serializeUser((user, done) => {
  const { sub, name, picture, email } = user._json;
  done(null, { sub, name, picture, email });
});

passport.deserializeUser((obj, done) => {
  // search userID in database and know its authority
  // User.findById(id).then(user => {
  //   done(null, user)
  // })
  done(null, obj);
});

passport.use(new googleStrategy(AUTH_OPTIONS, verifyCallback));

const auth = express.Router();

auth.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SESSION_KEY_1, config.SESSION_KEY_2],
  })
);

auth.use((req, res, next) => {
  if (req.session && !req.session.regenerate)
    req.session.regenerate = (cb) => {
      cb();
    };
  if (req.session && !req.session.save)
    req.session.save = (cb) => {
      cb();
    };
  next();
});

auth.use(passport.initialize());

auth.use(passport.session());

auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    // failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login-failure`,
    failureRedirect: '/api/auth/failure',
    session: true,
  })
);

auth.get('/logout', (req, res) => {
  req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});

auth.get('/failure', (req, res) =>
  res.status(200).json({ message: 'failed to log in' })
);

auth.get('/secret', checkLoggedIn, checkPermissions, (req, res) =>
  res.status(200).json({ secret: 42 })
);

export default auth;

// google
// facebook
// github
// twitter
// email?

// TODO: refresh token
// https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/

// TODO: server side sessions using mongoDB
// https://github.com/expressjs/session#compatible-session-stores

// TODO: different users different permissions (role base access control)
// https://www.okta.com/identity-101/what-is-role-based-access-control-rbac/

// hosting: aws
// buy domain: ?
// cert: letsencrypt.org
// should have domain name & ip address on some server
