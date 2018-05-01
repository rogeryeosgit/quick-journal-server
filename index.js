var express = require("express"),
  http = require("http"),
  port = 777,
  app = require("express")(),
  server = http.createServer(app),
  bodyParser = require("body-parser");

console.log("Journal Server running");
console.log("Server started");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", function(req, res) {
  res.send("Journal Server running.");
});

app.use('/api/entryList', require("./api/entryList"));
//app.use("/api/inventory", require("./api/inventory"));

server.listen(port, () => console.log(`Listening on port ${port}`));