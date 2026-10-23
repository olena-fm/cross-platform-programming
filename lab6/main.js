// main.js
// Головний процес (main process) Electron: створює вікно та обробляє файлові операції.

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// Шлях до файлу notes.json у системній папці даних застосунку
function getNotesFilePath() {
  return path.join(app.getPath("userData"), "notes.json");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    title: "Smart Notes Desktop",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

// Читання нотаток із файлу. Якщо файлу немає або він пошкоджений — порожній список
ipcMain.handle("notes:load", () => {
  const filePath = getNotesFilePath();

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.error("Не вдалося прочитати notes.json:", error);
    return [];
  }
});

// Запис нотаток у файл
ipcMain.handle("notes:save", (event, notes) => {
  fs.writeFileSync(getNotesFilePath(), JSON.stringify(notes, null, 2), "utf-8");
  return true;
});

app.whenReady().then(() => {
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
