const controller = require("./../controller");
const config = require("config");
const passport = require("passport");

module.exports = new (class extends controller {
    async registerForm(req, res) {
        return res.render("auth/register", { sitekey: config.get("reCaptchaGoogel.SITE_KEY") });
    }

    async loginForm(req, res) {
        return res.render("auth/login", { sitekey: config.get("reCaptchaGoogel.SITE_KEY") });
    }

    async register(req, res, next) {
        passport.authenticate("register", (err, user, info) => {
            return this.response({
                res: res,
                message: info.message,
                code: info.code,
                data: info.data,
            });
        })(req, res, next);
    }

    async login(req, res, next) {
        passport.authenticate("login", (err, user, info) => {
            if (!user || err) {
                return this.response({
                    res: res,
                    message: info.message,
                    code: info.code,
                    data: info.data,
                });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return this.response({
                        res: res,
                        message: "error logIn ( login passport)",
                        code: 500,
                        data: err,
                    });
                }
                return this.response({
                    res: res,
                    message: info.message,
                    code: info.code,
                    data: info.data,
                });
            });
        })(req, res, next);
    }
})();
