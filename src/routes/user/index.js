const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const middlewaresAdmin = require("../../middlewares/admin");
const middlewaresUpload = require("../../middlewares/upload");
const middlewaresUser = require("../../middlewares/user");

router.get("/me", controller.userInformation);
router.get("/logout", controller.logout);
router.get("/update-info", controller.update_infoForm);
router.get("/update-prof", controller.update_profForm);

router.put(
    "/info/:id",
    middlewaresUser.repetitiveInfo,
    validator.update_infoValidator(),
    controller.validate,
    controller.update_infoUser
);

router.put("/prof/:id", middlewaresUpload.uploadProfile.single("img"), controller.update_profUser);

router.post(
    "/add",
    validator.addUserValidator(),
    controller.validate,
    middlewaresAdmin.isAdmin, //access admin only
    controller.addUser
);

//only admin
router.put(
    "/password/:id",
    validator.update_password(),
    controller.validate,
    middlewaresAdmin.isAdmin, //access admin only
    controller.update_password
);
router.delete("/:id", middlewaresAdmin.isAdmin, controller.remove);

module.exports = router;
