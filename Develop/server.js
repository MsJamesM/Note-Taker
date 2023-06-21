// packages needed for application
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// note functions
function grabData() {
  const notesPath = path.join(__dirname, "./db/db.json");
  const data = fs.readFileSync(notesPath, "utf8");
  return JSON.parse(data);
}

function writeData(notes) {
  const notesPath = path.join(__dirname, "./db/db.json");
  fs.writeFileSync(notesPath, JSON.stringify(notes), "utf8");
}

// routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  let notes = grabData();
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const filePath = "./db/db.json";

  // fs read & write
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const parsedData = JSON.parse(data);
    const newNote = req.body;
    newNote.id = parsedData.length + 1;
    parsedData.push(newNote);

    fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Added new note:", newNote.title);
      res.json(newNote);
    });
  });
});

// listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
