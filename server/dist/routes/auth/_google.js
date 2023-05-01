import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { SERVER_URL, SERVER_PORT, CLIENT_URL, CLIENT_PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } from '../../utils/loadEnv.js';
function verifyGoogleCallback(accessToken, refreshToken, profile, done) {
    console.log({ refreshToken });
    done(null, profile);
}
const AUTH_OPTIONS = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `https://${parse(SERVER_URL).hostname}:${SERVER_PORT}/api/auth/google/callback`,
};
passport.use(new googleStrategy(AUTH_OPTIONS, verifyGoogleCallback));
const google = express.Router();
google.get('/', passport.authenticate('google', {
    scope: ['email', 'profile'],
    accessType: 'offline',
}));
google.get('/callback', passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
}));
export default google;