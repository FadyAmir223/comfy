import passport from 'passport';
import { findOrCreateUser, getUser } from '../../models/users.model.js';

passport.serializeUser(async (user, done) => {
  await findOrCreateUser(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUser(id);
  if (!user) return done(null, false);
  // know user authority
  return done(null, user);
});
