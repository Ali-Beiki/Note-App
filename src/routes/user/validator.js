const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
    addUserValidator() {
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

    update_infoValidator() {
        return [
            check("name").not().isEmpty().withMessage(" اسم خود را وارد کنید "),
            check("phone")
                .isLength({ min: 11, max: 11 })
                .withMessage(" طول شماره تلفن باید 11 کاراکتر باشد "),
        ];
    }

    update_password() {
        return [
            check("password")
                .isLength({ min: 5 })
                .withMessage(" طول رمز حداقل باید 5 کاراکتر باشذ"),
        ];
    }
})();
