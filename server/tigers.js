var tigerRouter = require("express").Router();
const _ = require("lodash");
var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + "";
  }
  next();
};

tigerRouter.param("id", function(req, res, next, id) {
  var todo = _.find(todos, { id: id });

  if (todo) {
    req.todo = todo;
    next();
  } else {
    res.send();
  }
});
tigerRouter
  .route("/")
  .get(function(req, res) {
    res.json(tigers);
  })
  .post(updateId, function(req, res) {
    var tiger = req.body;

    lions.push(tiger);

    res.json(tiger);
  });
tigerRouter
  .route("/:id")
  .get(function(req, res) {
    var tiger = req.todo;
    res.json(lion || {});
  })
  .delete((req, res) => {
    var tiger = _.findIndex(tigers, { id: req.params.id });
    tigers.splice(tiger, 1);
    res.json(tiger);
  })
  .put(function(req, res) {
    var update = req.body;
    if (update.id) {
      delete update.id;
    }

    var tiger = _.findIndex(tiger, { id: req.params.id });
    if (!tiger[tiger]) {
      res.send();
    } else {
      var updatedTiger = _.assign(tigers[tiger], update);
      res.json(updatedTiger);
    }
  });

module.exports = tigerRouter;
