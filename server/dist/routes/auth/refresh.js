import refresh from 'passport-oauth2-refresh';
import { updateUser } from '../../models/users.model.js';
import axios from 'axios';
async function refreshTokenMiddleware(req, res, next) {
    const provider = req?.user?.provider;
    if (!(['google', 'github'].includes(provider) &&
        req?.user?.expireDate <= Math.floor(Date.now() / 1000)))
        return next();
    refresh.requestNewAccessToken(provider, req.user.refreshToken, async (err, accessToken, refreshToken) => {
        if (err)
            return next(err);
        if (!accessToken)
            return next();
        let expiresIn;
        if (provider === 'google')
            try {
                const { data: { expires_in }, } = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
                expiresIn = expires_in;
                console.log(expiresIn);
            }
            catch (error) {
                return next(error);
            }
        else if (provider === 'github')
            expiresIn = 8 * 60 * 60;
        const user = {
            id: req.user.id,
            accessToken,
            expireDate: Math.floor(Date.now() / 1000) + expiresIn,
            refreshToken,
        };
        await updateUser(user);
        return next();
    });
}
export default refreshTokenMiddleware;
