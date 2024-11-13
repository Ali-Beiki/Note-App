async function rejectUserNotLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

async function isLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
}

module.exports = {
    isLogin,
    rejectUserNotLogin,
};
