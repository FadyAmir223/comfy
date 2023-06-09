// https://console.cloud.google.com/apis/credentials

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import refresh from 'passport-oauth2-refresh';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../utils/loadEnv.js';
import verifyCallback from './verify-callback.js';

const AUTH_OPTIONS = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/google/callback`,
};

const googleStrategy = new Strategy(AUTH_OPTIONS, verifyCallback);

passport.use(googleStrategy);

refresh.use(googleStrategy);

const google = express.Router();

google.get(
  '/',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    accessType: 'offline',
    // prompt: 'consent',
  })
);

google.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
  })
);

export default google;
