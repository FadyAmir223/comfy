import refresh from 'passport-oauth2-refresh';
import { updateUserAccessToken } from '../../models/users.model.js';

async function refreshTokenMiddleware(req, res, next) {
  const provider = req?.user?.provider;

  if (
    !(
      ['google', 'github'].includes(provider) &&
      req?.user?.expireDate <= Math.floor(Date.now() / 1000)
    )
  )
    return next();

  refresh.requestNewAccessToken(
    provider,
    req.user.refreshToken,
    async (err, accessToken, refreshToken) => {
      console.log({ err, accessToken, refreshToken });

      if (err) return next(err);
      if (!accessToken) return next();
      await updateUserAccessToken(req.user.id, accessToken, refreshToken);
      return next();
    }
  );
}

export default refreshTokenMiddleware;
