import { test } from "node:test";
import assert from "node:assert/strict";
import { createNote, formatNoteDate, sortNotesByDate, filterNotesByQuery, sanitizeNotes } from "../noteUtils.js";

test("createNote обрізає пробіли та зберігає дату створення", () => {
  const now = new Date("2026-11-03T10:00:00.000Z");
  assert.deepEqual(createNote("  Купити хліб  ", { id: 7, now }), {
    id: 7,
    text: "Купити хліб",
    createdAt: "2026-11-03T10:00:00.000Z",
  });
});

test("formatNoteDate форматує дату як дд.мм.рррр", () => {
  assert.equal(formatNoteDate(new Date(2026, 10, 3, 12, 0)), "03.11.2026");
});

test("formatNoteDate повертає порожній рядок для некоректної дати", () => {
  assert.equal(formatNoteDate("не дата"), "");
});

test("sortNotesByDate ставить новіші нотатки першими й не змінює вихідний масив", () => {
  const notes = [
    { id: 1, text: "стара", createdAt: "2026-01-01T00:00:00.000Z" },
    { id: 2, text: "нова", createdAt: "2026-06-01T00:00:00.000Z" },
  ];
  const sorted = sortNotesByDate(notes);
  assert.deepEqual(sorted.map((note) => note.id), [2, 1]);
  assert.deepEqual(notes.map((note) => note.id), [1, 2]);
});

test("sortNotesByDate підтримує старі записи без createdAt (за id)", () => {
  const notes = [{ id: 100, text: "а" }, { id: 200, text: "б" }];
  assert.deepEqual(sortNotesByDate(notes).map((note) => note.id), [200, 100]);
});

test("filterNotesByQuery шукає без урахування регістру; порожній запит повертає все", () => {
  const notes = [{ id: 1, text: "Купити Хліб" }, { id: 2, text: "Зателефонувати" }];
  assert.deepEqual(filterNotesByQuery(notes, "хліб"), [notes[0]]);
  assert.deepEqual(filterNotesByQuery(notes, "   "), notes);
});

test("sanitizeNotes відкидає некоректні записи", () => {
  const notes = [{ id: 1, text: "ок" }, { id: "2", text: "id не число" }, { id: 3, text: "  " }, null, "рядок"];
  assert.deepEqual(sanitizeNotes(notes), [{ id: 1, text: "ок" }]);
  assert.deepEqual(sanitizeNotes({ id: 1 }), []);
});
