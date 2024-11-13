const express = require("express");
const debug = require("debug")("app:test");
const app = express();
const config = require("config");
const _ = require("lodash");

const port = config.get("port") || 3000;

const router = require("./src/routes");

require("./startup/config")(app, express);
require("./startup/passport")(app);

app.get("/", async (req, res) => {
    await require("./startup/dailyVisitHandlert")();
    return res.render("index", { user: req.user });
});

app.use("/", router); // router for request

app.all("*", (req, res) => {
    return res.render("404");
});

app.listen(port, () => debug(`listening on port ${port}`));
