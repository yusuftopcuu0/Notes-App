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
import Spinner from "../components/Spinner";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError("Notes could not be loaded.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async (note: Omit<Note, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const newNote = await createNote(note);
      setNotes((prev) => [...prev, newNote]);
    } catch {
      setError("Note could not be added.");
    } finally {
      setLoading(false);
    }
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
    try {
      setLoading(true);
      setError(null);
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      setError("Note could not be deleted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>

      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
