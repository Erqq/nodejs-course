const config = require("./server/config/config");
var app = require("./server/server");
const logger = require("./server/util/logger");
app.listen(config.port);
console.log("listening on http://localhost:" + config.port);
