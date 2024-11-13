const controller = require("../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
    async panelAdmin(req, res) {
        let users = await this.User.findAll({
            order: [["createdAt", "ASC"]],
        });
        return res.render("admin/users", { user: req.user, users });
    }

    async daySection(req, res) {
        let dayInformation = await this.DailyVisit.findAll({
            order: [["visit_date", "ASC"]],
        });
        return res.render("admin/dailyVisit", { days: dayInformation });
    }
})();
