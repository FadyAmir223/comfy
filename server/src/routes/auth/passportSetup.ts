import passport from 'passport';

passport.serializeUser((user, done) => {
  console.log(user);

  const { id, displayName } = user;
  done(null, { id, displayName });
});

passport.deserializeUser((obj, done) => {
  // search userID in database and know its authority
  // User.findById(id).then(user => {
  //   done(null, user)
  // })
  done(null, obj);
});
