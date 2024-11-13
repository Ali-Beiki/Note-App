const autoBind = require("auto-bind");
const fs = require("fs");
const path = require("path");
const winston = require("winston");
const { validationResult } = require("express-validator");
const db = require("../../startup/db");
const debug = require("debug")("app:test");
const { User, Note, DailyVisit } = db;

module.exports = class {
    constructor() {
        autoBind(this);

        this.User = User;
        this.Note = Note;
        this.DailyVisit = DailyVisit;
    }

    validationBody(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach((err) => messages.push(err.msg));

            res.status(400).json({
                message: "Validation Error",
                data: messages,
            });
            return false;
        }
        return true;
    }

    validate(req, res, next) {
        if (!this.validationBody(req, res)) {
            return;
        }
        next();
    }

    // remove image func
    removeImg(user) {
        debug("func rm img :", user.img);

        if (path.basename(user.img) != "image-default.png") {
            let pathImg = path.join(process.cwd(), "public", user.img);

            debug("path remove imaage :", pathImg);

            fs.unlink(pathImg, (error) => {
                if (error) {
                    debug("ERR -> location :stc/routes/controller removeImg ,err:", error);
                    winston.error("ERR -> location :stc/routes/controller removeImg ,err:", error);
                } else {
                    debug("Remove Image Successfuly !");
                }
            });
        }
    }

    response({ res, message, code = 200, data = {} }) {
        res.status(code).json({
            message,
            data,
        });
    }
};
