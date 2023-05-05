import { CLIENT_PORT, CLIENT_URL } from '../../utils/loadEnv.js';

function checkLoggedIn(req, res, next) {
  // cookie-session  -> req.isAuthenticated() && req.user;
  // express-session -> req.session.user
  const isLoggedIn = req.isAuthenticated() && req.user; // true
  if (!isLoggedIn) return res.status(401).json({ error: 'you must login' });
  // if (!isLoggedIn) return res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/login`);
  next();
}

function checkPermissions(req, res, next) {
  const isAuthenticated = true; // req.user.authority === authority
  if (!isAuthenticated) return res.status(403).json({ error: 'forbidden' });
  // if (!isAuthenticated) return res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/login`);
  next();
}

export { checkLoggedIn, checkPermissions };
