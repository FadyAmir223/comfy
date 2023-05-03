function checkLoggedIn(req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn)
        return res.status(401).json({ error: 'you must login' });
    next();
}
function checkPermissions(req, res, next) {
    const isAuthenticated = true;
    if (!isAuthenticated)
        return res.status(403).json({ error: 'forbidden' });
    next();
}
export { checkLoggedIn, checkPermissions };
