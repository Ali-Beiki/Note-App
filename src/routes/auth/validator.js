const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
    registerValidator() {
        return [
            check("email").isEmail().withMessage(" ایمیل نا معتبر است "),
            check("name").not().isEmpty().withMessage(" اسم خود را وارد کنید "),
            check("phone")
                .isLength({ min: 11, max: 11 })
                .withMessage(" طول شماره تلفن باید 11 کاراکتر باشد "),
            check("password").not().isEmpty().withMessage(" یک رمز وارد کنید "),
            check("passwordRepetitive").not().isEmpty().withMessage(" تکرار رمز را وارد کنید "),
            check("password")
                .isLength({ min: 5 })
                .withMessage(" طول رمز حداقل باید 5 کاراکتر باشذ"),
            check("passwordRepetitive").custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("رمزها با هم مطابقت ندارند");
                }
                return true;
            }),
        ];
    }

    loginValidator() {
        return [
            check("email").isEmail().withMessage(" ایمیل نا معتبر است "),
            check("password").not().isEmpty().withMessage(" یک رمز وارد کنید "),
            check("password")
                .isLength({ min: 5 })
                .withMessage(" طول رمز حداقل باید 5 کاراکتر باشذ"),
        ];
    }
    forgotPasswordValidator() {
        return [
            check("email").isEmail().withMessage(" ایمیل نا معتبر است "),
            check("phone")
                .isLength({ min: 11, max: 11 })
                .withMessage(" طول شماره تلفن باید 11 کاراکتر باشد "),
        ];
    }
    changePassword() {
        return [
            check("password").not().isEmpty().withMessage(" یک رمز وارد کنید "),
            check("passwordRepetitive").not().isEmpty().withMessage(" رمز را تکرار کنید "),
            check("passwordRepetitive")
                .not()
                .equals("password")
                .withMessage("رمزها با هم مطابقت ندارند"),
        ];
    }
})();
