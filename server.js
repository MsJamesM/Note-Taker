// packages needed for application
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "")));

// note function
function grabData() {
  const notesPath = path.join(__dirname, "./db/db.json");
  const data = fs.readFileSync(notesPath, "utf8");
  return JSON.parse(data);
}

// routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
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

// delete note
app.delete("/api/notes/:id", (req, res) => {
  const filePath = "./db/db.json";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const parsedData = JSON.parse(data);
    const noteId = parseInt(req.params.id);
    const noteIndex = parsedData.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    parsedData.splice(noteIndex, 1);

    fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Deleted note with ID:", noteId);
      res.sendStatus(204);
    });
  });
});

// listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
