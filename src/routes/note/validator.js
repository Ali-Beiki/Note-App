const expressValidator = require("express-validator");
const path = require("path");
const check = expressValidator.check;

module.exports = new (class {
    noteValidator() {
        return [
            check("title").not().isEmpty().withMessage("باید همه فیلد ها رو پر کنی"),
            check("content").not().isEmpty().withMessage("باید همه فیلد ها رو پر کنی"),
        ];
    }
})();
