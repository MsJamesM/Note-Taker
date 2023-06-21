// packages needed for application
const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.port || 3001;
const app = express();

// express
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// get
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, " ")));

// post
app.post("/api/notes", (req, res) => {
  // fill
  if (err) {
    console.log();
  } else {
  }

  let res = {
    status: "note received",
  };
});

// listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
