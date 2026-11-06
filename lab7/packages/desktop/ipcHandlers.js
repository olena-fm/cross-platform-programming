// ipcHandlers.js
// Обробники IPC-запитів головного процесу. Це «тонкий шар» над спільним NotesService:
// перевіряє типи даних, що надходять з рендер-процесу, і готує нотатки до показу.
// Електрона тут немає, тому обробники тестуються без запуску вікна.

import { formatNoteDate } from "@smart-notes/core";

export function createHandlers(service) {
  return {
    async list(query) {
      const notes = await service.list(typeof query === "string" ? query : "");
      return notes.map((note) => ({ ...note, dateLabel: formatNoteDate(note.createdAt ?? note.id) }));
    },

    add(text) {
      return service.add(typeof text === "string" ? text : "");
    },

    remove(id) {
      return service.remove(Number(id));
    },
  };
}
