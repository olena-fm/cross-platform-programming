// localStorageAdapter.js
// Веб-адаптер збереження: реалізує інтерфейс NoteStorageAdapter з ядра через localStorage.
// Сховище передається ззовні (за замовчуванням — localStorage браузера), тому адаптер легко тестувати.

import { NoteStorageAdapter } from "@smart-notes/core";

export const STORAGE_KEY = "smart-notes";

export class LocalStorageAdapter extends NoteStorageAdapter {
  constructor(storage = globalThis.localStorage, key = STORAGE_KEY) {
    super();
    this.storage = storage;
    this.key = key;
  }

  async load() {
    const raw = this.storage.getItem(this.key);

    if (raw === null) {
      return [];
    }

    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch {
      // Пошкоджений JSON не повинен ламати застосунок
      return [];
    }
  }

  async save(notes) {
    this.storage.setItem(this.key, JSON.stringify(notes));
  }
}
