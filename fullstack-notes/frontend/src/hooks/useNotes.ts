import { useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../service/notesApi";
import type { Note } from "../types/notes";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError("Error fetching notes.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note: Omit<Note, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const newNote = await createNote(note);
      setNotes((prev) => [...prev, newNote]);
    } catch {
      setError("Error adding note.");
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError("Error deleting note.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const editNote = async (updated: Omit<Note, "id">) => {
    if (!editingNote) return;

    try {
      setLoading(true);
      setError(null);
      const updatedNote = await updateNote(editingNote.id, updated);
      setNotes((prev) =>
        prev.map((n) => (n.id == updatedNote.id ? updatedNote : n))
      );
      setEditingNote(null);
    } catch {
      setError("Error updating note.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    editingNote,
    setEditingNote,
    addNote,
    removeNote,
    editNote,
  };
}
