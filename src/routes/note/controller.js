const controller = require("../controller");
const debug = require("debug")("app:test");
const winston = require("winston");

module.exports = new (class extends controller {
    async notePannel(req, res) {
        try {
            let notes = await this.Note.findAll({ where: { owner: req.user.id } }); //get
            return res.render("note/note", { user: req.user, notes });
        } catch (error) {
            debug(
                "ERR -> rout :/note/ ,method:GET , location :note/controller/ ,func notePannel ,err:",
                error
            );
            winston.error(
                "ERR -> rout :/note/ ,method:GET , location :note/controller/ ,func notePannel ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async add(req, res) {
        try {
            debug(
                "/note/add ,method:POST , location :note/controller/func add ,req.body :" + req.body
            );

            let newNote = this.Note.build({
                title: req.body.title,
                content: req.body.content,
                date: new Date(),
                owner: req.user.id,
            });
            await newNote.save();

            return this.response({
                res,
                message: "Add Note Successfuly !",
                code: 200,
                data: ["یادداشت افزوده شد"],
            });
        } catch (error) {
            debug(
                "ERR -> rout :/note/add ,method:POST , location :note/controller/ ,func add ,err:",
                error
            );
            winston.error(
                "ERR -> rout :/note/add ,method:POST , location :note/controller/ ,func add ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async update(req, res) {
        try {
            const noteId = req.params.id;

            const updatedData = {
                title: req.body.title,
                content: req.body.content,
                date: new Date(),
            };

            const [updatedCount] = await this.Note.update(updatedData, {
                where: { id: noteId, owner: req.user.id },
            });
            if (!updatedCount) {
                this.response({
                    res,
                    message: "Can Not Update Note !",
                    code: 400,
                    data: [" خطای پردازش "],
                });
                return;
            }
            return this.response({
                res,
                message: "Update Note Successfuly !",
                code: 200,
                data: ["یادداشت اپدیت شد"],
            });
        } catch (error) {
            debug(
                "ERR -> rout :/note/:id ,method:PUT , location :note/controller/ ,func update ,err:",
                error
            );
            winston.error(
                "ERR -> rout :/note/:id ,method:PUT , location :note/controller/ ,func update ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }

    async remove(req, res) {
        try {
            const noteId = req.params.id;

            const deletedNote = await this.Note.destroy({
                where: { id: noteId, owner: req.user.id },
            });

            if (!deletedNote) {
                this.response({
                    res,
                    message: "Can Not Remove Note !",
                    code: 400,
                    data: [" خطای پردازش "],
                });
                return;
            }
            return this.response({
                res,
                message: "Remove Note Successfuly !",
                code: 200,
                data: ["یادداشت حذف شد"],
            });
        } catch (error) {
            debug(
                "ERR -> rout :/note/:id ,method:DELETE , location :note/controller/ ,func remove ,err:",
                error
            );
            winston.error(
                "ERR -> rout :/note/:id ,method:DELETE , location :note/controller/ ,func remove ,err:",
                error
            );
            return this.response({
                res,
                message: "Error Server !",
                code: 500,
                data: ["ارور از سمت سرور"],
            });
        }
    }
})();
