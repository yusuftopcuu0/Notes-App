import type { Note } from "../types/notes";

interface Props {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const NoteItem = ({ note, onDelete, onEdit }: Props) => {
  return (
    <div style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
      <button onClick={() => onEdit()}>Edit</button>
    </div>
  );
};

export default NoteItem;
