const { getUser } = require('../service/auth')

async function restrictToLoggedInUserOnly(req, res, next){
    const UserId = req.cookies?.uid;

    if (!UserId) return res.redirect('/login');
    const user = getUser(UserId);

    if(!user) return res.redirect('/login');
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
}