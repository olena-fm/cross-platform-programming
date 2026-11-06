// noteValidation.js
// Правила перевірки нотатки. Спільні для всіх клієнтів: змінюємо тут — змінюється всюди.
// Чисті функції: не залежать від DOM чи будь-яких платформних API.

export const MAX_NOTE_LENGTH = 500;

export const ERROR_EMPTY = "Будь ласка, введіть текст нотатки.";
export const ERROR_TOO_LONG = `Текст нотатки не повинен перевищувати ${MAX_NOTE_LENGTH} символів.`;

// Перевіряє текст нотатки. Повертає { isValid, error }.
export function validateNoteText(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return { isValid: false, error: ERROR_EMPTY };
  }

  if (text.trim().length > MAX_NOTE_LENGTH) {
    return { isValid: false, error: ERROR_TOO_LONG };
  }

  return { isValid: true, error: null };
}
