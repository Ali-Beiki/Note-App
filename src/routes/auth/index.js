const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const middlewaresGoogelRecaptcha = require("../../middlewares/googel-recaptcha"); // configoration googel recaptcha middlewares

router.get("/register", controller.registerForm);
router.get("/login", controller.loginForm);

router.post(
    "/register",
    validator.registerValidator(),
    controller.validate,
    middlewaresGoogelRecaptcha.recaptcha,
    middlewaresGoogelRecaptcha.isValid,
    controller.register
);

router.post(
    "/login",
    validator.loginValidator(),
    controller.validate,
    middlewaresGoogelRecaptcha.recaptcha,
    middlewaresGoogelRecaptcha.isValid,
    controller.login
);

module.exports = router;
