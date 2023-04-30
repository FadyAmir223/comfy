import passport from 'passport';
passport.serializeUser((user, done) => {
    const { id, displayName } = user;
    done(null, { id, displayName });
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
