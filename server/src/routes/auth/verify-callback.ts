import { findOrCreateUser } from '../../models/users.model.js';

// switch (profile.provider) {
//   case 'google':
//   case 'facebook':
//   case 'github':
//   case 'twitter':
// }

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const { id, displayName } = profile;
  const imgUrl = profile?.photos[0]?.value;

  const user = {
    id,
    displayName,
    imgUrl,
    accessToken,
    refreshToken,
  };

  await findOrCreateUser(user);
  done(null, profile);
};

export default verifyCallback;
