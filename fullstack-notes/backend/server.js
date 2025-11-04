const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("Note App");
});

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

//POST create note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  res.json(newNote);
});

// DELETE note
app.delete("/note/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.json({ success: true });
});

// UPDATE note
app.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });
  notes[index] = { ...notes[index], title, content };

  res.json(notes[index]);
});

app.listen(5000, () => console.log("Server running on port 5000"));
