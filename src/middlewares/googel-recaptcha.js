const config = require("config");
const Recaptcha = require("express-recaptcha").RecaptchaV2;
const winston = require("winston");
const debug = require("debug")("app:test");
const Controller = require("../routes/controller");
const controller = new Controller();

// configoration recaptcha
const recaptcha = new Recaptcha(
    config.get("reCaptchaGoogel.SITE_KEY"),
    config.get("reCaptchaGoogel.SECRET_KEY")
);

async function isValid(req, res, next) {
    try {
        if (!req.recaptcha.error) {
            return next();
        }

        debug(
            "ERR -> location :src/middlewares/googel-recaptcha ,middleware googel-recaptcha ,err: invalid recaptcha"
        );
        return controller.response({
            res,
            message: "Invalid Recaptcha !",
            code: 400,
            data: ["تیک گزینه امنیتی را بزنید"],
        });
    } catch (error) {
        debug("ERR ->  location :middlewares/googel-recaptcha ,func isValid ,err:", error);
        winston.error("ERR ->  location :middlewares/googel-recaptcha ,func isValid ,err:", error);
        return controller.response({
            res,
            message: "Error Server !",
            code: 500,
            data: [" خطای سرور "],
        });
    }
}

module.exports = {
    recaptcha: recaptcha.middleware.verify, // add req.recaptcha in req
    isValid,
};
