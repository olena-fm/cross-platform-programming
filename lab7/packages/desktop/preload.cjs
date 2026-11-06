// preload.cjs
// Безпечний «міст» між рендер-процесом і головним процесом.
// Рендер-процес отримує лише три функції: list, add та remove.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("notesAPI", {
  list: (query) => ipcRenderer.invoke("notes:list", query),
  add: (text) => ipcRenderer.invoke("notes:add", text),
  remove: (id) => ipcRenderer.invoke("notes:remove", id),
});
