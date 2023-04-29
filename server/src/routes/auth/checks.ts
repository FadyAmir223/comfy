function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) return res.status(401).json({ error: 'you must log in' });
  next();
}

function checkPermissions(req, res, next) {
  const isAuthenticated = req.isAuthenticated() && req.user;
  if (!isAuthenticated) return res.status(403).json({ error: 'forbidden' });
  next();
}

export { checkLoggedIn, checkPermissions };
