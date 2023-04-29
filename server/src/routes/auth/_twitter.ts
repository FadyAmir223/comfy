// https://developer.twitter.com/en/apps

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as twitterStrategy } from 'passport-twitter';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '../../utils/loadEnv.js';

function verifyTwitterCallback(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  // console.log(profile);
  done(null, profile);
}

const AUTH_OPTIONS = {
  consumerKey: TWITTER_API_KEY,
  consumerSecret: TWITTER_API_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/twitter/callback`,
};

passport.use(new twitterStrategy(AUTH_OPTIONS, verifyTwitterCallback));

const twitter = express.Router();

twitter.get('/', passport.authenticate('twitter'));

twitter.get(
  '/callback',
  passport.authenticate('twitter', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
  })
);

export default twitter;
