import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../../utils/loadEnv.js';
import request from 'request';
const verifyCallback = (accessToken, refreshToken, profile, done) => {
    const { id, displayName, provider } = profile;
    const imgUrl = profile?.photos[0]?.value;
    if (provider === 'facebook') {
        const FACEBOOK_GRAPH_API_VERSION = 'v16.0';
        request({
            url: `https://graph.facebook.com/${FACEBOOK_GRAPH_API_VERSION}/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${accessToken}`,
            method: 'GET',
        }, (error, response, body) => {
            if (error)
                return done(error);
            const { access_token, expires_in } = JSON.parse(body);
            done(null, {
                id,
                displayName,
                imgUrl,
                provider,
                accessToken: access_token,
            });
        });
    }
    else {
        done(null, {
            id,
            displayName,
            imgUrl,
            provider,
            accessToken,
            refreshToken,
        });
    }
};
export default verifyCallback;
