// renderer/script.js
// Логіка рендер-процесу. Доступу до fs/Node.js напряму немає —
// усі файлові операції виконуються через window.notesAPI (preload.js).

const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

let notes = [];

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = note.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";

    deleteButton.addEventListener("click", async () => {
      notes = notes.filter((item) => item.id !== note.id);
      renderNotes();
      await window.notesAPI.saveNotes(notes);
      showMessage("Нотатку видалено.", "#ef4444");
    });

    noteItem.appendChild(textSpan);
    noteItem.appendChild(deleteButton);
    notesList.appendChild(noteItem);
  });
}

async function addNote() {
  const text = noteInput.value.trim();

  if (text === "") {
    showMessage("Будь ласка, введіть текст нотатки.", "#ef4444");
    return;
  }

  notes.push({ id: Date.now(), text });
  noteInput.value = "";
  renderNotes();

  // Зберігаємо оновлений список нотаток у файл на диску
  await window.notesAPI.saveNotes(notes);
  showMessage("Нотатку успішно додано та збережено у файл.", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);

noteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});

// Завантажуємо нотатки з файлу одразу після запуску вікна
window.addEventListener("DOMContentLoaded", async () => {
  notes = await window.notesAPI.loadNotes();
  renderNotes();
});
