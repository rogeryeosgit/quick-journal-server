var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
var Datastore = require("nedb");
var async = require("async");

app.use(bodyParser.json());

module.exports = app;

// Creates  Database
var entryListDB = new Datastore({
  filename: "./databases/entryList.db",
  autoload: true
});

// GET entryList
app.get("/", function(req, res) {
  res.send("EntryList API");
});

// GET an entry from entryList by _id
app.get("/entry/:entryId", function(req, res) {
  if (!req.params.entryId) {
    res.status(500).send("ID field is required.");
  } else {
    entryListDB.findOne({ _id: req.params.entryId }, function(err, entry) {
      res.send(entry);
    });
  }
});

// GET all entries
app.get("/entries", function(req, res) {
  entryListDB.find({}, function(err, allEntries) {
    console.log("Listing all entries");
    res.send(allEntries);
  });
});

// Create entry
app.post("/entry", function(req, res) {
  var newEntry = req.body;
  entryListDB.insert(newEntry, function(err, entry) {
    if (err) res.status(500).send(err);
    else res.send(entry);
  });
});

// Delete entry
app.delete("/entry/:entryId", function(req, res) {
  entryListDB.remove({ _id: req.params.entryId }, function(err, numRemoved) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Updates entry
app.put("/entry", function(req, res) {
  var entryId = req.body._id;
    entryListDB.update({ _id: entryId }, req.body, {}, function(
    err,
    numReplaced,
    entry
  ) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
