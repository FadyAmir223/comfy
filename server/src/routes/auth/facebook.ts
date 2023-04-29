// https://developers.facebook.com/apps

import { parse } from 'url';
import express from 'express';
import passport from 'passport';
import { Strategy as facebookStrategy } from 'passport-facebook';

import {
  SERVER_URL,
  SERVER_PORT,
  CLIENT_URL,
  CLIENT_PORT,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} from '../../loadEnv.js';

function verifyFacebookCallback(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
  done(null, profile);
}

const AUTH_OPTIONS = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `https://${
    parse(SERVER_URL).hostname
  }:${SERVER_PORT}/api/auth/facebook/callback`,
  profileFields: [
    'id',
    'displayName',
    // 'email',
    // 'photos',
  ],
};

passport.use(new facebookStrategy(AUTH_OPTIONS, verifyFacebookCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // search userID in database and know its authority
  // User.findById(id).then(user => {
  //   done(null, user)
  // })
  done(null, obj);
});

const facebook = express.Router();

facebook.get('/', passport.authenticate('facebook'));

facebook.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: `${CLIENT_URL}:${CLIENT_PORT}/`,
    failureRedirect: `${CLIENT_URL}:${CLIENT_PORT}/login`,
    session: true,
  })
);

export default facebook;
