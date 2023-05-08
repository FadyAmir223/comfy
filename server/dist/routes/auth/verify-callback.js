import axios from 'axios';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../../utils/loadEnv.js';
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, provider } = profile;
    const imgUrl = profile?.photos[0]?.value;
    let url, expiresIn, expireDate;
    if (provider === 'google')
        url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
    else if (provider === 'facebook') {
        url = `https://graph.facebook.com/v16.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`;
    }
    if (url)
        try {
            const { data: { access_token, expires_in }, } = await axios.get(url);
            [accessToken, expiresIn] = [access_token, expires_in];
        }
        catch (error) {
            return done(error);
        }
    if (provider === 'github')
        expiresIn = 8 * 60 * 60;
    if (expiresIn)
        expireDate = Math.floor(Date.now() / 1000) + expiresIn;
    return done(null, {
        id,
        displayName,
        imgUrl,
        provider,
        accessToken,
        expireDate,
        refreshToken,
    });
};
export default verifyCallback;
