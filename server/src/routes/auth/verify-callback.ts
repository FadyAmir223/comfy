/*
google:
  h1 accessToken & long-lived refreshToken
  exhange  refreshToken -> accessToken
facebook:
  short-lived accessToken
  exchange  accessToken -> 2m accessToken
github:
  lifetime accessToken  |  8h accessToken & 6m refreshToken
  exchange accessToken & 6m refreshToken (used once)
*/

import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../../utils/loadEnv.js';
import request from 'request';

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  const { id, displayName, provider } = profile;
  const imgUrl = profile?.photos[0]?.value;
  // const email= profile.emails[0].value,

  try {
    let url;

    if (provider === 'google')
      url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
    else if (provider === 'facebook') {
      url = `https://graph.facebook.com/v16.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`;
    }

    let expireDate; // githubt don't provide endpoint for lifespan
    if (provider === 'github')
      expireDate = Math.floor(Date.now() / 1000) + 8 * 60 * 60;

    if (!url)
      return done(null, {
        id,
        displayName,
        imgUrl,
        provider,
        accessToken,
        refreshToken,
        expireDate,
      });

    request({ url, method: 'GET' }, (error, response, body) => {
      if (error) return done(error);
      const { access_token, expires_in } = JSON.parse(body);
      const expireDate = Math.floor(Date.now() / 1000) + expires_in;

      done(null, {
        id,
        displayName,
        imgUrl,
        provider,
        accessToken: access_token,
        expireDate,
        refreshToken,
      });
    });
  } catch (error) {
    done(error);
  }
};

export default verifyCallback;
