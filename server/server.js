// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const _ = require("lodash");
const port = 3000;

const lionRouter = require("./lions");
const tigerRouter = require("./tigers");

app.use(express.static("client"));
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use("/tigers", tigerRouter);
app.use("/lions", lionRouter);
let lions = [];
let id = 0;

app.get("/", (req, res) => {
  res.sendfile(__dirname + "/client/index.html", function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);

    res.status(500).send(err);
  }
});
app.listen(port, function() {
  console.log("listening on localhost:", port);
});
