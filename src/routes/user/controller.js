const controller = require("../controller");
const debug = require("debug")("app:test");
const winston = require("winston");
const passport = require("passport");
const config = require("config");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
    async userInformation(req, res) {
        return res.render("user/profile", { user: req.user });
    }

    async update_infoForm(req, res) {
        return res.render("user/update_information", { user: req.user });
    }

    async update_profForm(req, res) {
        return res.render("user/update_profile", { user: req.user });
    }

    async logout(req, res) {
        req.logout((error) => {
            debug(
                "ERR -> /user/logout ,method:GET , location :user/controller/func logout ,err:",
                error
            );
        });
        return res.redirect("/");
    }

    async addUser(req, res, next) {
        debug(req.body);
        passport.authenticate("register", (err, user, info) => {
            return this.response({
                res: res,
                message: info.message,
                code: info.code,
                data: info.data,
            });
        })(req, res, next);
    }

    async update_infoUser(req, res) {
        try {
            let user = await this.User.findByPk(req.params.id);

            debug(
                "/user/info/:id ,method:PUT , location :user/controller/func update_infoUser user :" +
                    user
            );
            debug(
                "/user/info/:id ,method:PUT , location :user/controller/func update_infoUser req.body :" +
                    req.body
            );

            if (!user) {
                this.response({
                    res,
                    message: "Can Not Update User Information !",
                    code: 400,
                    data: [" خطای پردازش "],
                });
                return;
            }

            await user.update({
                name: req.body.name,
                phone: req.body.phone,
            });

            return this.response({
                res,
                message: "User Update Successfuly !",
                code: 200,
                data: [" کاربر اپدیت شد "],
            });
        } catch (error) {
            debug(
                "ERR -> /user/info/:id ,method:PUT , location :user/controller/func update_infoUser ,err:",
                error
            );
            winston.error(
                "ERR -> /user/info/:id ,method:PUT , location :user/controller/func update_infoUser ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Sever !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async update_profUser(req, res) {
        try {
            // console.log(req.body);
            // console.log(req.params.id);
            // console.log(req.file);
            // console.log(req.file.path.replace("\\", "/").substring(6));

            // let user = await this.User.findOne({ _id: req.params.id });

            if (req.file) {
                req.body.img = req.file.path.replace("\\\\", "/").substring(6);
            }

            let user = await this.User.findByPk(req.params.id);
            if (!user) {
                this.response({
                    res,
                    message: "Can Not Update User Image !",
                    code: 400,
                    data: [" خطای پردازش "], // کاربری با این اطلاعات نیست که اپدیتش کنم
                });
                return;
            }

            debug(
                "/user/prof/:id ,method:PUT , location :user/controller/func update_profUser user :" +
                    user
            );

            this.removeImg(user._previousDataValues);

            await user.update({
                img: req.body.img,
            });

            return this.response({
                res,
                message: "User Update Successfuly !",
                code: 200,
                data: [" کاربر اپدیت شد "],
            });
        } catch (error) {
            debug(
                "ERR -> /user/prof/:id ,method:PUT , location :user/controller/func update_profUser ,err:",
                error
            );
            winston.error(
                "ERR -> /user/prof/:id ,method:PUT , location :user/controller/func update_profUser ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async update_password(req, res) {
        try {
            let user = await this.User.findByPk(req.params.id);

            debug(
                "/user/password/:id ,method:PUT , location :user/controller/func update_password user :" +
                    user
            );
            debug(
                "/user/info/:id ,method:PUT , location :user/controller/func update_password req.body :" +
                    req.body
            );

            if (!user) {
                this.response({
                    res,
                    message: "Can Not Update User Password !",
                    code: 400,
                    data: [" خطای پردازش "],
                });
                return;
            }

            const salt = await bcrypt.genSalt(config.get("bcryptLength"));
            const newPassword = await bcrypt.hash(req.body.password, salt);

            await user.update({
                password: newPassword,
            });

            return this.response({
                res,
                message: "User Update Successfuly !",
                code: 200,
                data: [" کاربر اپدیت شد "],
            });
        } catch (error) {
            debug(
                "ERR -> /user/password/:id ,method:PUT , location :user/controller/func update_password ,err:",
                error
            );
            winston.error(
                "ERR -> /user/password/:id ,method:PUT , location :user/controller/func update_password ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Sever !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async remove(req, res) {
        try {
            const user = await this.User.findOne({
                where: { id: req.params.id },
            });

            // const deletedUser = await this.User.destroy({
            //     where: { id: req.params.id },
            // });

            if (!user) {
                this.response({
                    res,
                    message: "can not remove user ,invalid data !",
                    code: 400,
                    data: [" خطای پردازش "],
                });
                return;
            }

            await user.destroy();

            this.removeImg(user.dataValues);

            return this.response({
                res,
                message: "Remove User Successfuly !",
                code: 200,
                data: ["کاربر حذف شد"],
            });
        } catch (error) {
            debug(
                "ERR -> /user/:id ,method:DELETE , location :user/controller/func remove ,err:",
                error
            );
            winston.error(
                "ERR -> /user/:id ,method:DELETE , location :user/controller/func remove ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }
})();
