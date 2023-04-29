import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { checkLoggedIn, checkPermissions } from './checks.js';
import './passportSetup.js';
import google from './_google.js';
import facebook from './_facebook.js';
import github from './_github.js';
import twitter from './_twitter.js';
import { CLIENT_URL, CLIENT_PORT, SESSION_KEY_1, SESSION_KEY_2, } from '../../utils/loadEnv.js';
const auth = express.Router();
auth.use(cookieSession({
    name: 'session',
    keys: [SESSION_KEY_1, SESSION_KEY_2],
    maxAge: 24 * 60 * 60 * 1000,
}));
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
auth.use(cookieParser());
auth.use(passport.initialize());
auth.use(passport.session());
auth.use('/google', google);
auth.use('/facebook', facebook);
auth.use('/github', github);
auth.use('/twitter', twitter);
auth.get('/logout', (req, res) => {
    req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});
auth.get('/secret', checkLoggedIn, checkPermissions, (req, res) => res.status(200).json({ secret: 42 }));
export default auth;
