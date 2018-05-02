// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const _ = require("lodash");
const port = 3000;

app.use(express.static("client"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

let lions = [];
let id = 0;
app.param("id", (req, res, next, id) => {
  let lion = _.find(lions, { id: id });
  if (lion) {
    req.lion = lions;
    next();
  } else {
    res.send();
  }
});

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/client/index.html", function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get("/lions", (req, res) => {
  res.json(lions);
});
app.get("/lions/:id", (req, res) => {
  let lion = _.find(lions, { id: req.params.id });
  res.json(lion || {});
});
app.put("/lions/:id", (req, res) => {
  let update = req.body;
  if (update.id) {
    delete update.id;
  }
  var lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedlion = _.assign(lions[lion], update);
    res.json(updatedlion);
  }
});
app.post("/lions", (req, res) => {
  let lion = req.body;
  id++;
  lion.id = id + "";
  lions.push(lion);
  res.json(lion);
});
app.delete("/lions/:id", (req, res) => {
  let lion = _.findIndex(lions, { id: req.params.id });

  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
});
app.listen(port, function() {
  console.log("listening on localhost:", port);
});
