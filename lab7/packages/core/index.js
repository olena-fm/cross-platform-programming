// index.js
// Публічний API пакета @smart-notes/core: усе, що доступно клієнтам, експортується звідси.

export {
  MAX_NOTE_LENGTH,
  ERROR_EMPTY,
  ERROR_TOO_LONG,
  validateNoteText,
} from "./noteValidation.js";

export {
  createNote,
  formatNoteDate,
  sortNotesByDate,
  filterNotesByQuery,
  sanitizeNotes,
} from "./noteUtils.js";

export { NoteStorageAdapter, MemoryStorageAdapter } from "./storageAdapter.js";
export { NotesService } from "./notesService.js";
