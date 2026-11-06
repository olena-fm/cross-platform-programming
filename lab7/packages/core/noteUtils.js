// noteUtils.js
// Допоміжні функції роботи з нотатками (чисті функції без побічних ефектів).

// Створює об'єкт нотатки зі збереженням дати створення
export function createNote(text, { id = Date.now(), now = new Date() } = {}) {
  return { id, text: text.trim(), createdAt: now.toISOString() };
}

// Форматує дату створення у вигляді дд.мм.рррр. Для некоректної дати повертає порожній рядок
export function formatNoteDate(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Час створення нотатки: для старих записів без createdAt використовується id (мітка часу)
function getNoteTime(note) {
  const time = new Date(note.createdAt ?? note.id).getTime();
  return Number.isNaN(time) ? 0 : time;
}

// Сортування: спочатку новіші нотатки. Вихідний масив не змінюється
export function sortNotesByDate(notes) {
  return [...notes].sort((a, b) => getNoteTime(b) - getNoteTime(a));
}

// Пошук за підрядком у тексті нотатки без урахування регістру
export function filterNotesByQuery(notes, query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return notes;
  }

  return notes.filter((note) => note.text.toLowerCase().includes(normalizedQuery));
}

// Залишає лише коректні записи: об'єкти з числовим id та непорожнім текстом
export function sanitizeNotes(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }

  return notes.filter(
    (note) =>
      note !== null &&
      typeof note === "object" &&
      typeof note.id === "number" &&
      typeof note.text === "string" &&
      note.text.trim() !== ""
  );
}
