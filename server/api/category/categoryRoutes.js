var router = require("express").Router();
var logger = require("../../util/logger");
const controller = require("./categoryController");
const createRoutes = require("../../util/createRoutes");
createRoutes(controller, router);
module.exports = router;
