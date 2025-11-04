import { useEffect, useState } from "react";
import type { Note } from "../types/notes";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../service/notesApi";
import NoteItem from "../components/NoteItem";
import NoteForm from "../components/NoteForm";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async (note: Omit<Note, "id">) => {
    const newNote = await createNote(note);
    setNotes((prev) => [...prev, newNote]);
  };

  const handleUpdate = async (updated: Omit<Note, "id">) => {
    if (!editingNote) return;

    const updatedNote = await updateNote(editingNote.id, updated);
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    setEditingNote(null);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>
      <NoteForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingNote={editingNote}
      />
      <div style={{ marginTop: 20 }}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={handleDelete}
            onEdit={() => setEditingNote(note)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
