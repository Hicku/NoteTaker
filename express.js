const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const low = require('lowdb')
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const PORT = process.env.PORT || 3000;

// initialize lowdb
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ notes: [] }).write();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// loads notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/views/notes.html"))
);

// All notes
app.get("/api/notes", (req, res) => {
  const notes = db.get("notes").value();
  res.json(notes);
});

// save note
app.post("/api/notes", (req, res) => {
  const note = { ...req.body, id: uuid() };
  db.get("notes").push(note).write();
  res.json(note);
});

// delete note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  db.get("notes").remove({ id }).write();
  res.send(id);
});

// Other routes to homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/views/index.html"))
);

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
