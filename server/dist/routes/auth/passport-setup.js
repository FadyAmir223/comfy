import passport from 'passport';
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
const accessTokenIsExpired = (accessToken) => {
    const now = Date.now();
    const expiresIn = accessToken.expires_in || accessToken.expiresIn;
    const expirationTime = accessToken.created_at + expiresIn * 1000;
    return now > expirationTime;
};
