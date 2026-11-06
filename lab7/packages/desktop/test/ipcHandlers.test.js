import { test } from "node:test";
import assert from "node:assert/strict";
import { MemoryStorageAdapter, NotesService } from "@smart-notes/core";
import { createHandlers } from "../ipcHandlers.js";

function createTestHandlers(initialNotes = []) {
  return createHandlers(new NotesService(new MemoryStorageAdapter(initialNotes)));
}

test("add і list: нотатка з'являється з полем dateLabel", async () => {
  const handlers = createTestHandlers();

  const result = await handlers.add("Перша нотатка");
  const notes = await handlers.list("");

  assert.equal(result.ok, true);
  assert.equal(notes.length, 1);
  assert.match(notes[0].dateLabel, /^\d{2}\.\d{2}\.\d{4}$/);
});

test("add повертає помилку для порожнього та нетекстового значення", async () => {
  const handlers = createTestHandlers();

  assert.equal((await handlers.add("   ")).ok, false);
  assert.equal((await handlers.add(42)).ok, false);
  assert.equal((await handlers.add(undefined)).ok, false);
});

test("list ігнорує запит неправильного типу, а рядковий запит фільтрує", async () => {
  const handlers = createTestHandlers([
    { id: 1, text: "Купити молоко" },
    { id: 2, text: "Написати звіт" },
  ]);

  assert.equal((await handlers.list({ evil: true })).length, 2);
  assert.equal((await handlers.list("звіт")).length, 1);
});

test("remove приймає id як число або рядок", async () => {
  const handlers = createTestHandlers([{ id: 1, text: "А" }, { id: 2, text: "Б" }]);

  assert.equal((await handlers.remove(1)).ok, true);
  assert.equal((await handlers.remove("2")).ok, true);
  assert.equal((await handlers.remove(99)).ok, false);
  assert.deepEqual(await handlers.list(""), []);
});
