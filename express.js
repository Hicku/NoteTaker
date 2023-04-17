const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");



const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data with querystring library
app.use(express.json()); // Middleware to parse incoming JSON data
app.use(express.static("public")); // Middleware to serve static files from the "public" directory

// Route to  notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  // Route to home page
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });






app.listen (3000, () => {
    console.log("Listening on port 3000")
})