import passport from 'passport';
passport.serializeUser((user, done) => {
    console.log('serializeUser');
    const { sub, name, picture, email } = user._json;
    done(null, { sub, name, picture, email });
});
passport.deserializeUser((obj, done) => {
    console.log('deserializeUser');
    done(null, obj);
});
