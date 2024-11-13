const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");

router.get("/", controller.notePannel);
router.post("/add", validator.noteValidator(), controller.validate, controller.add);
router.put("/:id", validator.noteValidator(), controller.validate, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
