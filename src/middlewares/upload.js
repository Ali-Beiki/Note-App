const debug = require("debug")("app:test");
const multer = require("multer");
const { mkdirp } = require("mkdirp");

const storageProfile = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            await mkdirp("./public/uploads/image/users");
            cb(null, "./public/uploads/image/users");
        } catch (error) {
            cb(error);
        }
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadProfile = multer({
    storage: storageProfile,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            const typeError =
                "ERR -> location :src/middlewares/upload ,middleware upload image ,err: invalid file type , you must upload only image";

            debug(typeError);
            cb(new Error(typeError), false);
        }
    },
});

module.exports = { uploadProfile };
