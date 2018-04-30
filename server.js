// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
const express = require("express");
const app = express();
const port = 3000;

var jsonData = { count: 12, message: "hey" };
const fs = require("fs");
app.get("/", function(req, res) {
  res.sendfile(__dirname + "/index.html", function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.get("/data", function(req, res) {
  res.json(jsonData);
});

app.listen(port, function() {
  console.log("listening on localhost:", port);
});
