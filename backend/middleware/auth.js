const { getUser } = require('../service/auth');

//authentication middleware
function checkForAuth(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie )
        return next();
    
    const token = tokenCookie;
    const user=getUser(token);
    if (user) {
    req.user = user;
    res.locals.user = user; 
    }
    return next();
}

module.exports = checkForAuth;