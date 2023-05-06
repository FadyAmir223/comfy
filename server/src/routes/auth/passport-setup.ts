import passport from 'passport';
import { findOrCreateUser, getUser } from '../../models/users.model.js';

passport.serializeUser(async (user, done) => {
  await findOrCreateUser(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUser(id);
  if (!user) return done(null, false);
  // know user authority
  // if (accessTokenIsExpired)
  // get new accessToken by refreshToken
  // update user in DB with new access token

  return done(null, user);
  // console.log('deserializeUser', { id, user });
});

// const isAccessTokenIsExpired = (accessToken) => {
//   const now = Date.now();
//   const expiresIn = accessToken.expires_in || accessToken.expiresIn;
//   const expirationTime = accessToken.created_at + expiresIn * 1000;
//   return now > expirationTime;
// };
