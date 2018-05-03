var router = require("express").Router();
var logger = require("../../util/logger");
const controller = require("./postController");
const createRoutes = require("../../util/createRoutes");
createRoutes(controller, router);

module.exports = router;
