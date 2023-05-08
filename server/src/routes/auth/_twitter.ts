// https://developer.twitter.com/en/apps
// problem: exchange refreshToken for accessToekn

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-twitter';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '../../utils/loadEnv.js';
import verifyCallback from './verify-callback.js';

const AUTH_OPTIONS = {
  consumerKey: TWITTER_API_KEY,
  consumerSecret: TWITTER_API_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/twitter/callback`,
};

const twitterStrategy = new Strategy(AUTH_OPTIONS, verifyCallback);

passport.use(twitterStrategy);

const twitter = express.Router();

twitter.get(
  '/',
  passport.authenticate('twitter', {
    scope: ['tweet.read', 'users.read', 'offline.access'],
  })
);

twitter.get(
  '/callback',
  passport.authenticate('twitter', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
  })
);

export default twitter;
