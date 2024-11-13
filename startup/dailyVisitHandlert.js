const debug = require("debug")("app:test");
const winston = require("winston");
const Controller = require("../src/routes/controller");
let controller = new Controller();

module.exports = async function () {
    try {
        const today = new Date().toISOString().split("T")[0]; // تاریخ امروز به فرمت YYYY-MM-DD

        // بررسی وجود رکورد برای تاریخ امروز
        let visitRecord = await controller.DailyVisit.findOne({ where: { visit_date: today } });

        if (visitRecord) {
            // اگر رکورد وجود دارد، تعداد بازدید را افزایش می‌دهیم
            visitRecord.visit_count += 1;
            await visitRecord.save();
        } else {
            // اگر رکورد وجود ندارد، رکورد جدید ایجاد می‌کنیم
            await controller.DailyVisit.create({
                visit_date: today,
                visit_count: 1,
            });
        }
    } catch (error) {
        debug("ERR ->  location :startup/dailyVisitHandlert/  ,err:", error);
        winston.error("ERR ->  location :startup/dailyVisitHandlert/  ,err:", error);
    }
};
