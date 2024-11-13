const winston = require("winston");
const cookieParser = require("cookie-parser");
const config = require("config");

module.exports = function (app, express) {
    app.use(express.urlencoded({ extended: true })); // encoding sending data
    app.use(express.json()); // encoding sending data
    app.use(express.static("public")); // folder static file
    app.use(cookieParser(config.get("cookie")));

    app.set("view engine", "ejs"); // set view engine

    winston.add(
        new winston.transports.File({
            filename: "file.log",
        })
    );
};
