import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as githubStrategy } from 'passport-github2';
import { SERVER_URL, SERVER_PORT, CLIENT_URL, CLIENT_PORT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, } from '../../loadEnv.js';
function verifyGithubCallback(accessToken, refreshToken, profile, done) {
    done(null, profile);
}
const AUTH_OPTIONS = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `https://${parse(SERVER_URL).hostname}:${SERVER_PORT}/api/auth/github/callback`,
};
passport.use(new githubStrategy(AUTH_OPTIONS, verifyGithubCallback));
passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    console.log('deserializeUser');
    done(null, obj);
});
const github = express.Router();
github.get('/', passport.authenticate('github', { scope: ['user:email'] }));
github.get('/callback', passport.authenticate('github', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
}));
export default github;
