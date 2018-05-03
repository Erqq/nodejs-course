var Category = require("./categoryModel");
var _ = require("lodash");

exports.params = function(req, res, next, id) {
  Category.findById(id).then(
    category => {
      if (!category) {
        next(new Error("NO gategory with that id"));
      } else {
        req.category = category;
        next();
      }
    },
    err => {
      next(err);
    }
  );
};

exports.get = function(req, res, next) {
  Category.find({}).then(
    categories => {
      res.json(categories);
    },
    err => {
      next(err);
    }
  );
};

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};

exports.put = function(req, res, next) {
  var category = req.category;

  var update = req.body;

  _.merge(category, update);

  category.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function(req, res, next) {
  var newcategory = req.body;

  Category.create(newcategory).then(
    function(category) {
      res.json(category);
    },
    function(err) {
      next(err);
    }
  );
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
