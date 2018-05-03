// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require("express");
const app = express();
const api = require("./api/api");
const config = require("./config/config");
require("mongoose").connect(config.db.url);
require("./middleware/appMiddleware")(app);

app.use("/api", api);

module.exports = app;
