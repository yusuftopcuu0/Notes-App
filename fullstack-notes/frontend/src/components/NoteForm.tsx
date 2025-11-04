import { useEffect, useState } from "react";
import type { Note } from "../types/notes";

interface Props {
  onAdd: (note: { title: string; content: string }) => void;
  onUpdate?: (note: { title: string; content: string }) => void;
  editingNote?: Note | null;
}

const NoteForm = ({ onAdd, onUpdate, editingNote }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingNote && onUpdate) {
      onUpdate({ title, content });
    } else {
      onAdd({ title, content });
    }

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{editingNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
