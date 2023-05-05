// https://github.com/settings/apps

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-github2';
import refresh from 'passport-oauth2-refresh';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '../../utils/loadEnv.js';
import verifyCallback from './verify-callback.js';

const AUTH_OPTIONS = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/github/callback`,
};

const githubStrategy = new Strategy(AUTH_OPTIONS, verifyCallback);

passport.use(githubStrategy);

// refresh.use(githubStrategy);

const github = express.Router();

github.get('/', passport.authenticate('github', { scope: ['user:email'] }));

github.get(
  '/callback',
  passport.authenticate('github', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
  })
);

export default github;
