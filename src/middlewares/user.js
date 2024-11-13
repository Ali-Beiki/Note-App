const debug = require("debug")("app:test");
const Controller = require("../routes/controller");
const controller = new Controller();
const winston = require("winston");

async function repetitiveInfo(req, res, next) {
    try {
        let user = await controller.User.findByPk(req.params.id);
        if (!user) {
            controller.response({
                res,
                message: "User Not Found !",
                code: 400,
                data: [" خطای پردازش "],
            });
            return;
        }

        debug("loca : middlewares/user ,func repetitiveInfo ,req.body :" + req.body);
        debug("loca : middlewares/user ,func repetitiveInfo ,user :" + user);

        if (req.body.name == user.dataValues.name && req.body.phone == user.dataValues.phone) {
            return controller.response({
                res,
                message: "Repetitive Data !",
                code: 400,
                data: [" باید یک فیلد را  حتمی تغییر بدی "],
            });
        }

        return next();
    } catch (error) {
        debug("ERR ->  location :middlewares/user ,func repetitiveInfo ,err:", error);
        winston.error("ERR ->  location :middlewares/user ,func repetitiveInfo ,err:", error);
        return controller.response({
            res,
            message: "Error Server !",
            code: 500,
            data: ["ارور از سمت سرور"],
        });
    }
}

module.exports = { repetitiveInfo };
