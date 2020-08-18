const express = require("express");
const app = express();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.send("Running");
});

exports.app = app;
let http;
exports.http = http = require("http").createServer(app);
require("./socket");
const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log("listening on *:5000");
});
