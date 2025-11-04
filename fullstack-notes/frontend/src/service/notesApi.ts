import type { Note } from "../types/notes";

const BASE_URL = "http://localhost:5000";

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${BASE_URL}/notes`);
  return res.json();
}

export async function createNote(newNote: Omit<Note, "id">): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  });
  return res.json();
}

export async function updateNote(
  id: number,
  data: Omit<Note, "id">
): Promise<Note> {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
}
