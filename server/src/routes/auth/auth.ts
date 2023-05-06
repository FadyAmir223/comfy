import express from 'express';
import passport from 'passport';

import { checkLoggedIn, checkPermissions } from './checks.js';
import './passport-setup.js';
import cookieSession from './cookie-session.js';
// import expressSession from './express-session.js';
import refreshTokenMiddleware from './refresh.js';

import google from './_google.js';
import facebook from './_facebook.js';
import github from './_github.js';
import twitter from './_twitter.js';

import { CLIENT_URL, CLIENT_PORT } from '../../utils/loadEnv.js';

const auth = express.Router();

auth.use(cookieSession);
// auth.use(expressSession);

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

auth.use('/google', google);

auth.use('/facebook', facebook);

auth.use('/github', github);

auth.use('/twitter', twitter);

auth.get('/logout', (req, res) => {
  req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});

auth.get(
  '/secret',
  refreshTokenMiddleware,
  checkLoggedIn,
  checkPermissions,
  (req, res) => {
    // req.session.passport.user === req.user
    // return res.status(200).json(req.session.passport.user);
    return res.status(200).json(req.user);
  }
);

export default auth;

// TODO: refresh token
// https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/

// TODO: server side sessions using mongoDB
// https://github.com/expressjs/session#compatible-session-stores
// https://github.com/senchalabs/connect#readme

// TODO: different users different permissions (role base access control)
// https://www.okta.com/identity-101/what-is-role-based-access-control-rbac/

// TODO: more security
// https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

// hosting: aws
// buy domain: ?
// cert: letsencrypt.org
// should have domain name & ip address on some server
