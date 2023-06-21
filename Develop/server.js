// packages needed for application
const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.port || 3001;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// get
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./db/db.json"))
);

// post
app.post("/api/notes", (req, res) => {
  // fill
  if (err) {
    console.log();
  } else {
  }
});

// listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
