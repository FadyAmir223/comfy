import passport from 'passport';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  // search userID in database and know its authority
  // check if access token is expired
  // if (accessTokenIsExpired) {
  // use refresh token to get new access token
  // update the user's record in the database with the new access token
  // }
  // find the user in the database and pass it to the done callback
  done(null, obj);
});

// test

const accessTokenIsExpired = (accessToken) => {
  // const tokenExp = jwt.decode(accessToken).exp;

  const now = Date.now();
  const expiresIn = accessToken.expires_in || accessToken.expiresIn;
  const expirationTime = accessToken.created_at + expiresIn * 1000;
  return now > expirationTime;
};
