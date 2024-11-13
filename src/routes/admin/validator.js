const expressValidator = require("express-validator");
const path = require("path");
const check = expressValidator.check;

module.exports = new (class {
    adminValidator() {
        return [];
    }
})();
