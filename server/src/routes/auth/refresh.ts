import refresh from 'passport-oauth2-refresh';

function refreshTokenMiddleware(req, res, next) {
  if (!(req?.user?.provider === 'google' && req?.isAuthenticated()))
    return next();

  refresh.requestNewAccessToken(
    req.user.provider,
    req.user.refreshToken,
    (err, accessToken, refreshToken) => {
      if (!accessToken) return next();

      req.user.accessToken = accessToken;
      console.log(accessToken);
      req.session.save(() => {
        return next();
      });
    }
  );
}

export default refreshTokenMiddleware;
