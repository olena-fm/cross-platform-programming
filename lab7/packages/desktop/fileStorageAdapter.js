// fileStorageAdapter.js
// Десктопний адаптер збереження: реалізує інтерфейс NoteStorageAdapter з ядра через файл JSON на диску.
// Код не залежить від Electron (лише node:fs), тому його можна тестувати звичайним node --test.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { NoteStorageAdapter } from "@smart-notes/core";

export class FileStorageAdapter extends NoteStorageAdapter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async load() {
    try {
      const data = JSON.parse(await readFile(this.filePath, "utf-8"));
      return Array.isArray(data) ? data : [];
    } catch {
      // Файлу ще немає або він пошкоджений — починаємо з порожнього списку
      return [];
    }
  }

  async save(notes) {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(notes, null, 2), "utf-8");
  }
}
