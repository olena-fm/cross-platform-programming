import { test } from "node:test";
import assert from "node:assert/strict";
import { validateNoteText, MAX_NOTE_LENGTH, ERROR_EMPTY, ERROR_TOO_LONG } from "../noteValidation.js";

test("коректний текст проходить перевірку", () => {
  assert.deepEqual(validateNoteText("Підготувати звіт"), { isValid: true, error: null });
});

test("порожній текст і самі пробіли не проходять перевірку", () => {
  assert.deepEqual(validateNoteText(""), { isValid: false, error: ERROR_EMPTY });
  assert.deepEqual(validateNoteText("    "), { isValid: false, error: ERROR_EMPTY });
});

test("не рядок не проходить перевірку", () => {
  assert.equal(validateNoteText(undefined).isValid, false);
  assert.equal(validateNoteText(42).isValid, false);
});

test("межа довжини: рівно MAX_NOTE_LENGTH символів допустимо, на один більше — ні", () => {
  assert.equal(validateNoteText("а".repeat(MAX_NOTE_LENGTH)).isValid, true);
  assert.deepEqual(validateNoteText("а".repeat(MAX_NOTE_LENGTH + 1)), { isValid: false, error: ERROR_TOO_LONG });
});
