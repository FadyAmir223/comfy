import passport from 'passport';
passport.serializeUser((user, done) => {
    console.log(user);
    const { id, displayName } = user;
    done(null, { id, displayName });
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
