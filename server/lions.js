var lionRouter = require("express").Router();
const _ = require("lodash");
var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + "";
  }
  next();
};

lionRouter.param("id", function(req, res, next, id) {
  var todo = _.find(todos, { id: id });

  if (todo) {
    req.todo = todo;
    next();
  } else {
    res.send();
  }
});
lionRouter
  .route("/")
  .get(function(req, res) {
    res.json(lions);
  })
  .post(updateId, function(req, res) {
    var lion = req.body;

    lions.push(lion);

    res.json(lion);
  });

lionRouter
  .route("/:id")
  .get(function(req, res) {
    var lion = req.todo;
    res.json(lion || {});
  })
  .delete((req, res) => {
    var lion = _.findIndex(lions, { id: req.params.id });
    lions.splice(lion, 1);
    res.json(lion || {});
  })
  .put(function(req, res) {
    var update = req.body;
    if (update.id) {
      delete update.id;
    }

    var lion = _.findIndex(lions, { id: req.params.id });
    if (!lions[lion]) {
      res.send();
    } else {
      var updatedLion = _.assign(lions[lion], update);
      res.json(updatedLion);
    }
  });

module.exports = lionRouter;
