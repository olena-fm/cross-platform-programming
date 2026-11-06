// script.js
// Інтерфейс веб-клієнта. Уся логіка (перевірка, сортування, пошук, збереження) — у спільному ядрі;
// тут лише робота з DOM та вибір адаптера localStorage.

import { NotesService, formatNoteDate } from "@smart-notes/core";
import { LocalStorageAdapter } from "./localStorageAdapter.js";

const service = new NotesService(new LocalStorageAdapter());

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
  const notes = await service.list(searchInput.value);
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
    dateSpan.textContent = formatNoteDate(note.createdAt ?? note.id);

    content.append(textSpan, dateSpan);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Видалити";
    deleteButton.addEventListener("click", async () => {
      await service.remove(note.id);
      await renderNotes();
      showMessage("Нотатку видалено.", "#ef4444");
    });

    noteItem.append(content, deleteButton);
    notesList.appendChild(noteItem);
  });
}

async function addNote() {
  const result = await service.add(noteInput.value);

  if (!result.ok) {
    showMessage(result.error, "#ef4444");
    return;
  }

  noteInput.value = "";
  await renderNotes();
  showMessage("Нотатку успішно додано.", "#16a34a");
}

addNoteButton.addEventListener("click", addNote);
noteInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});
searchInput.addEventListener("input", renderNotes);

renderNotes();
