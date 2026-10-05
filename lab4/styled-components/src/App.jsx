import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header.jsx";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";

const STORAGE_KEY = "smart-notes";

const Page = styled.div`
  min-height: 100vh;
  padding: 32px 16px;
  color: #1f2937;
`;

const Card = styled.main`
  max-width: 760px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
`;

const Message = styled.p`
  margin: 0 0 16px;
  font-weight: bold;
  color: ${(props) => (props.$type === "error" ? "#ef4444" : "#16a34a")};
`;

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
    <Page>
      <Card>
        <Header total={notes.length} done={doneCount} />
        <NoteForm onAdd={addNote} />
        {message && <Message $type={message.type}>{message.text}</Message>}
        <NoteList notes={notes} onToggle={toggleNote} onDelete={deleteNote} />
      </Card>
    </Page>
  );
}

export default App;
