// preload.js
// Безпечний «міст» між рендер-процесом і головним процесом.
// Рендер-процес отримує лише дві функції: loadNotes та saveNotes.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("notesAPI", {
  loadNotes: () => ipcRenderer.invoke("notes:load"),
  saveNotes: (notes) => ipcRenderer.invoke("notes:save", notes),
});
