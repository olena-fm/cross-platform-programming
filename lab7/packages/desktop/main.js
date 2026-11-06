// main.js
// Головний процес Electron (ES-модуль): створює вікно та підключає спільне ядро до IPC.
// Уся прикладна логіка — у @smart-notes/core, тут лише Electron-специфічний код.

import { app, BrowserWindow, ipcMain } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { NotesService } from "@smart-notes/core";
import { FileStorageAdapter } from "./fileStorageAdapter.js";
import { createHandlers } from "./ipcHandlers.js";

// В ES-модулях немає __dirname — отримуємо його з import.meta.url
const currentDir = dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    title: "Smart Notes Desktop",
    webPreferences: {
      // Preload має бути CommonJS-файлом (.cjs), навіть якщо проєкт — ES-модуль
      preload: join(currentDir, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(join(currentDir, "renderer", "index.html"));
}

app.whenReady().then(() => {
  // Адаптер створюємо після app.whenReady(): лише тоді відомий шлях userData
  const adapter = new FileStorageAdapter(join(app.getPath("userData"), "notes.json"));
  const handlers = createHandlers(new NotesService(adapter));

  ipcMain.handle("notes:list", (event, query) => handlers.list(query));
  ipcMain.handle("notes:add", (event, text) => handlers.add(text));
  ipcMain.handle("notes:remove", (event, id) => handlers.remove(id));

  createWindow();

  // macOS: якщо в Dock клікнули на іконку, а вікон немає — створюємо нове
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Закриваємо застосунок, коли закрито всі вікна (крім macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
