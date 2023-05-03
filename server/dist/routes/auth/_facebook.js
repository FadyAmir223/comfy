import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as facebookStrategy } from 'passport-facebook';
import { SERVER_URL, SERVER_PORT, CLIENT_URL, CLIENT_PORT, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, } from '../../utils/loadEnv.js';
import verifyCallback from './verify-callback.js';
const AUTH_OPTIONS = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `https://${parse(SERVER_URL).hostname}:${SERVER_PORT}/api/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'email', 'photos'],
};
passport.use(new facebookStrategy(AUTH_OPTIONS, verifyCallback));
const facebook = express.Router();
facebook.get('/', passport.authenticate('facebook'));
facebook.get('/callback', passport.authenticate('facebook', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
}));
export default facebook;
