// https://console.cloud.google.com/apis/credentials

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as googleStrategy } from 'passport-google-oauth20';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../loadEnv.js';

function verifyGoogleCallback(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  done(null, profile);
}

const AUTH_OPTIONS = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/google/callback`,
};

passport.use(new googleStrategy(AUTH_OPTIONS, verifyGoogleCallback));

passport.serializeUser((user, done) => {
  const { sub, name, picture, email } = user._json;
  done(null, { sub, name, picture, email });
});

passport.deserializeUser((obj, done) => {
  // search userID in database and know its authority
  // User.findById(id).then(user => {
  //   done(null, user)
  // })
  done(null, obj);
});

const google = express.Router();

google.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
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