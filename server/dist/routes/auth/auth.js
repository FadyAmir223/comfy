import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { checkLoggedIn, checkPermissions } from './checks.js';
import google from './google.js';
import facebook from './facebook.js';
import { CLIENT_URL, CLIENT_PORT, SESSION_KEY_1, SESSION_KEY_2, } from '../../loadEnv.js';
import github from './github.js';
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
auth.use(passport.initialize());
auth.use(passport.session());
auth.use('/google', google);
auth.use('/facebook', facebook);
auth.use('/github', github);
auth.get('/logout', (req, res) => {
    req.logout((err) => res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/`));
});
auth.get('/secret', checkLoggedIn, checkPermissions, (req, res) => res.status(200).json({ secret: 42 }));
export default auth;
