import { test } from "node:test";
import assert from "node:assert/strict";
import { NotesService } from "../notesService.js";
import { MemoryStorageAdapter } from "../storageAdapter.js";
import { ERROR_EMPTY } from "../noteValidation.js";

const FIXED_NOW = new Date("2026-11-03T10:00:00.000Z");

function createService(initialNotes = []) {
  const adapter = new MemoryStorageAdapter(initialNotes);
  return { adapter, service: new NotesService(adapter, { now: () => FIXED_NOW }) };
}

test("add зберігає нотатку в адаптері", async () => {
  const { adapter, service } = createService();
  const result = await service.add("  Підготувати звіт ");
  assert.equal(result.ok, true);
  assert.equal(result.note.text, "Підготувати звіт");
  assert.equal((await adapter.load()).length, 1);
});

test("add не зберігає некоректну нотатку й повертає повідомлення про помилку", async () => {
  const { adapter, service } = createService();
  assert.deepEqual(await service.add("   "), { ok: false, error: ERROR_EMPTY });
  assert.equal((await adapter.load()).length, 0);
});

test("add видає унікальні id навіть за однакового часу", async () => {
  const { service } = createService();
  const first = await service.add("перша");
  const second = await service.add("друга");
  assert.notEqual(first.note.id, second.note.id);
});

test("remove видаляє нотатку за id", async () => {
  const { service } = createService([{ id: 1, text: "перша" }, { id: 2, text: "друга" }]);
  assert.deepEqual(await service.remove(1), { ok: true });
  assert.deepEqual((await service.list()).map((note) => note.id), [2]);
});

test("remove повідомляє, якщо нотатки немає", async () => {
  const { service } = createService([{ id: 1, text: "перша" }]);
  assert.equal((await service.remove(99)).ok, false);
});

test("list повертає нотатки від новіших до старіших і підтримує пошук", async () => {
  const { service } = createService([
    { id: 1, text: "Купити хліб", createdAt: "2026-01-01T00:00:00.000Z" },
    { id: 2, text: "Зателефонувати", createdAt: "2026-06-01T00:00:00.000Z" },
  ]);
  assert.deepEqual((await service.list()).map((note) => note.id), [2, 1]);
  assert.deepEqual((await service.list("хліб")).map((note) => note.id), [1]);
});

test("list ігнорує пошкоджені записи в сховищі", async () => {
  const { service } = createService([{ id: 1, text: "ок" }, { id: "x" }, null]);
  assert.deepEqual((await service.list()).map((note) => note.id), [1]);
});
