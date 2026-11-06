// storageAdapter.js
// Інтерфейс адаптера збереження. Ядро знає лише про ці два методи;
// як саме зберігаються дані — вирішує кожна платформа у власному класі-адаптері.

export class NoteStorageAdapter {
  // Повертає масив усіх збережених нотаток
  async load() {
    throw new Error("Метод load() не реалізовано");
  }

  // Зберігає масив нотаток повністю
  async save(notes) {
    throw new Error("Метод save() не реалізовано");
  }
}

// Адаптер у пам'яті: потрібен для тестів та прототипів, нічого не пише на диск
export class MemoryStorageAdapter extends NoteStorageAdapter {
  constructor(initialNotes = []) {
    super();
    this.notes = [...initialNotes];
  }

  async load() {
    return [...this.notes];
  }

  async save(notes) {
    this.notes = [...notes];
  }
}
