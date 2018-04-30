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

app.post("/lions", (req, res) => {
  let lion = req.body;
  id++;
  lion.id = id + "";
  lions.push(lion);
  res.json(lion);
});

app.listen(port, function() {
  console.log("listening on localhost:", port);
});
