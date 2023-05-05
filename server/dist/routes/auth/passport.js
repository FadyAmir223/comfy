import passport from 'passport';
passport.serializeUser((user, done) => {
  const { sub, name, picture, email } = user._json;
  done(null, { sub, name, picture, email });
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
