import passport from 'passport';
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser(async (obj, done) => {
    return done(null, obj);
});
