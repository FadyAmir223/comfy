import { CLIENT_PORT, CLIENT_URL } from '../../utils/loadEnv.js';

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user; // true
  if (!isLoggedIn) return res.status(401).json({ error: 'you must login' });
  // res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/login`);
  next();
}

function checkPermissions(req, res, next) {
  const isAuthenticated = true; // req.user.authority === authority
  if (!isAuthenticated) return res.status(403).json({ error: 'forbidden' });
  // res.redirect(`${CLIENT_URL}:${CLIENT_PORT}/login`);
  next();
}

export { checkLoggedIn, checkPermissions };
