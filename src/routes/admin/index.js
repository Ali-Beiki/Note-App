const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.panelAdmin);
router.get("/daily-visit", controller.daySection);

module.exports = router;
