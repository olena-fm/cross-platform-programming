import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";

const STORAGE_KEY = "smart-notes";

// Читаємо збережені нотатки з localStorage (або порожній масив)
function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [message, setMessage] = useState(null);

  // Зберігаємо нотатки щоразу, коли змінюється стан notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Повертає true, якщо нотатку додано, і false, якщо текст порожній
  function addNote(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
      setMessage({ text: "Введіть текст нотатки.", type: "error" });
      return false;
    }

    const newNote = { id: Date.now(), text: trimmedText, done: false };
    setNotes([...notes, newNote]);
    setMessage({ text: "Нотатку додано.", type: "success" });
    return true;
  }

  function toggleNote(id) {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
    setMessage({ text: "Нотатку видалено.", type: "success" });
  }

  const doneCount = notes.filter((note) => note.done).length;

  return (
    <div className="min-h-screen bg-emerald-50 px-4 py-8 text-slate-800">
      <main className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
        <Header total={notes.length} done={doneCount} />
        <NoteForm onAdd={addNote} />
        {message && (
          <p
            className={
              message.type === "error"
                ? "mb-4 font-bold text-rose-600"
                : "mb-4 font-bold text-emerald-700"
            }
          >
            {message.text}
          </p>
        )}
        <NoteList notes={notes} onToggle={toggleNote} onDelete={deleteNote} />
      </main>
    </div>
  );
}

export default App;
