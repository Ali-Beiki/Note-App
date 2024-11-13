const { Sequelize, DataTypes } = require("sequelize");
const debug = require("debug")("app:test");
const config = require("config");
const winston = require('winston');

// connect to postgres
const sequelize = new Sequelize(
    config.get("db.name"),
    config.get("db.username"),
    config.get("db.password"),
    {
        host: config.get("db.host"),
        dialect: "postgres",
    }
);

// load model
const User = require("../src/models/user")(sequelize, DataTypes);
const Note = require("../src/models/note")(sequelize, DataTypes);
const Session = require("../src/models/session")(sequelize, DataTypes);
const DailyVisit = require("../src/models/dailyVisit")(sequelize, DataTypes);

// create opject in model
const db = {
    sequelize,
    Sequelize,
    User,
    Note,
    Session,
    DailyVisit,
};

// crate in DB
db.sequelize
    .authenticate()
    .then(() => debug("Connected to PostgreSQL"))
    .catch((error) => {
        debug("ERR ->  location :startup/db , db.sequelize ,err:", error);
        winston.error("ERR ->  location :startup/db , db.sequelize ,err:", error);
    });

db.sequelize
    .sync()
    .then(() => debug("Models synchronized "))
    .catch((err) => debug("Error synchronizing models:", err));

module.exports = db;
