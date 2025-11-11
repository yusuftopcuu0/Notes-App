import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";
import { useNotes } from "../hooks/useNotes";

const NotesPage = () => {
  const {
    notes,
    loading,
    error,
    editingNote,
    setEditingNote,
    addNote,
    removeNote,
    editNote,
  } = useNotes();

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>

      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <NoteForm onAdd={addNote} onUpdate={editNote} editingNote={editingNote} />

      <div style={{ marginTop: 20 }}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={removeNote}
            onEdit={() => setEditingNote(note)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
