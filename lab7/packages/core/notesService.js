// notesService.js
// Прикладна логіка застосунку: додавання, видалення та перегляд нотаток.
// Сервіс отримує адаптер ззовні (dependency injection), тому однаково працює
// з будь-яким сховищем: браузерним, файлом на диску чи мобільним.

import { validateNoteText } from "./noteValidation.js";
import { createNote, filterNotesByQuery, sanitizeNotes, sortNotesByDate } from "./noteUtils.js";

export class NotesService {
  constructor(adapter, { now = () => new Date() } = {}) {
    this.adapter = adapter;
    this.now = now;
  }

  // Усі нотатки (за потреби — відфільтровані за запитом), спочатку новіші
  async list(query = "") {
    const notes = sanitizeNotes(await this.adapter.load());
    return sortNotesByDate(filterNotesByQuery(notes, query));
  }

  // Додає нотатку після перевірки. Повертає { ok, note } або { ok: false, error }
  async add(text) {
    const validation = validateNoteText(text);

    if (!validation.isValid) {
      return { ok: false, error: validation.error };
    }

    const notes = sanitizeNotes(await this.adapter.load());
    const now = this.now();
    const lastId = notes.reduce((max, note) => Math.max(max, note.id), 0);
    // id має бути унікальним навіть тоді, коли дві нотатки додано в одну мілісекунду
    const note = createNote(text, { id: Math.max(now.getTime(), lastId + 1), now });

    await this.adapter.save([...notes, note]);
    return { ok: true, note };
  }

  // Видаляє нотатку за id. Повертає { ok } або { ok: false, error }
  async remove(id) {
    const notes = sanitizeNotes(await this.adapter.load());
    const rest = notes.filter((note) => note.id !== id);

    if (rest.length === notes.length) {
      return { ok: false, error: "Нотатку не знайдено." };
    }

    await this.adapter.save(rest);
    return { ok: true };
  }
}
