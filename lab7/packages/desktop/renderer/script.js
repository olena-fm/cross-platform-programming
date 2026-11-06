// renderer/script.js
// Інтерфейс десктопного клієнта. Прямого доступу до Node.js немає —
// усі операції виконуються через window.notesAPI (preload.cjs), а логіка — у спільному ядрі.

const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNoteButton");
const searchInput = document.getElementById("searchInput");
const notesList = document.getElementById("notesList");
const message = document.getElementById("message");

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

async function renderNotes() {
  const notes = await window.notesAPI.list(searchInput.value);
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const content = document.createElement("div");
    content.className = "note-content";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = note.text;

    const dateSpan = document.createElement("span");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.dateLabel;

    content.append(textSpan, dateSpan);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";
    deleteButton.addEventListener("click", async () => {
      await window.notesAPI.remove(note.id);
      await renderNotes();
      showMessage("Нотатку видалено.", "#ef4444");
    });

    noteItem.append(content, deleteButton);
    notesList.appendChild(noteItem);
  });
}

async function addNote() {
  const result = await window.notesAPI.add(noteInput.value);

  if (!result.ok) {
    showMessage(result.error, "#ef4444");
    return;
  }

  noteInput.value = "";
  await renderNotes();
  showMessage("Нотатку успішно додано та збережено у файл.", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);
noteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});
searchInput.addEventListener("input", renderNotes);

window.addEventListener("DOMContentLoaded", renderNotes);
