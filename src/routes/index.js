const express = require("express");
const winston = require("winston");
const debug = require("debug")("app:test");
const router = express.Router();
const authRouter = require("./auth");
const noteRouter = require("./note");
const userRouter = require("./user");

const adminRouter = require("./admin");
const Controller = require("./controller");
const controller = new Controller();

const middlewaresAuth = require("../middlewares/auth");
const middlewaresAdmin = require("../middlewares/admin");

router.use("/auth", middlewaresAuth.rejectUserNotLogin, authRouter);
router.use("/user", middlewaresAuth.isLogin, userRouter);
router.use("/note", middlewaresAuth.isLogin, noteRouter);
router.use("/admin", middlewaresAuth.isLogin, middlewaresAdmin.isAdmin, adminRouter);

// error route | middleware
router.use((error, req, res, next) => {
    debug("ERR -> location :stc/routes/index ,middleware error handler ,err:", error);
    winston.error("ERR -> location :stc/routes/index ,middleware error handler ,err:", error);
    return controller.response({
        res,
        message: "Error in Router",
        code: 500,
        data: ["ارور از سمت سرور"],
    });
});

module.exports = router;
