import passport from 'passport';
// import User from '../../models/users.mongo.js';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (obj, done) => {
  return done(null, obj);
  // search userID in database and
  // check if access token is expired

  // try {
  //   const user = await User.findById(obj); // id
  //   if (!user) return done(null, false);
  // know user authority
  // if (accessTokenIsExpired)
  // get new accessToken by refreshToken
  // update user in DB with new access token
  //   return done(null, user);
  // } catch (error) {
  //   return done(error);
  // }
});

// const isAccessTokenIsExpired = (accessToken) => {
//   const now = Date.now();
//   const expiresIn = accessToken.expires_in || accessToken.expiresIn;
//   const expirationTime = accessToken.created_at + expiresIn * 1000;
//   return now > expirationTime;
// };
