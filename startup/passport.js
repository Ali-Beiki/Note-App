const debug = require("debug")("app:test");
const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const winston = require("winston");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const db = require("./db");

module.exports = function (app) {
    //connect to postgres
    const pool = new Pool({
        user: config.get("db.username"),
        host: config.get("db.host"),
        database: config.get("db.name"),
        password: config.get("db.password"),
        port: 5432,
    });

    // session middleware
    app.use(
        session({
            store: new pgSession({
                pool: pool, // connect
                tableName: "session", // name
            }),
            secret: config.get("session"), //key
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 6, // 6 ساعت
            },
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findByPk(id);
            if (user) {
                done(null, user); //ok
            } else {
                done(new Error("کاربر پیدا نشد"), null);
            }
        } catch (error) {
            debug("ERR ->  location :startup/passport/ ,func deserializeUser ,err:", error);
            winston.error("ERR ->  location :startup/passport/ ,func deserializeUser ,err:", error);
            return done(null, false, {
                message: "User Not Found !",
                code: 400,
                data: ["کاربر با این مشخصات وجود ندارد"],
            });
        }
    });

    passport.use(
        "register",
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    let user = await db.User.findOne({ where: { email } });
                    if (user) {
                        return done(null, false, {
                            message: "Repetitive Email !",
                            code: 400,
                            data: ["کاربر با این ایمیل از قبل وجود دارد"],
                        });
                    }

                    user = db.User.build(_.pick(req.body, ["name", "email", "password", "phone"]));

                    const salt = await bcrypt.genSalt(config.get("bcryptLength"));
                    user.password = await bcrypt.hash(password, salt);

                    await user.save();

                    return done(null, user, {
                        message: "Create User Successfuly !",
                        code: 200,
                        data: ["ثبت نام موفقیت‌آمیز بود"],
                    });
                } catch (error) {
                    debug("ERR ->  location :startup/passport/ ,register localStrategy ,err:", error);
                    winston.error(
                        "ERR ->  location :startup/passport/ ,register localStrategy ,err:",
                        error
                    );
                    return done(null, false, {
                        message: "Error Server !",
                        code: 500,
                        data: ["خطای سرور"],
                    });
                }
            }
        )
    );

    passport.use(
        "login",
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    let user = await db.User.findOne({ where: { email } });

                    if (!user) {
                        return done(null, false, {
                            message: "user not found !",
                            code: 400,
                            data: ["کاربر با این مشخصات وجود ندارد"],
                        });
                    }

                    let isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) {
                        return done(null, false, {
                            message: "Invalid Email OR Password !",
                            code: 400,
                            data: ["رمز عبور اشتباه است"],
                        });
                    }

                    // ورود موفقیت‌آمیز
                    return done(null, user, {
                        message: "Login Successfuly !",
                        code: 200,
                        data: ["ورود موفقیت‌آمیز بود"],
                    });
                } catch (error) {
                    debug("ERR ->  location :startup/passport/ ,login localStrategy ,err:", error);
                    winston.error(
                        "ERR ->  location :startup/passport/ ,login localStrategy ,err:",
                        error
                    );
                    return done(null, false, {
                        message: "Error Server !",
                        code: 500,
                        data: ["خطای سرور"],
                    });
                }
            }
        )
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
};
