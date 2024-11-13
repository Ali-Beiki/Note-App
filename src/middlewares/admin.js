// check user admin ?
async function isAdmin(req, res, next) {
    if (req.user.role === "admin") return next();
    return res.redirect("/");
}

module.exports = {
    isAdmin,
};
