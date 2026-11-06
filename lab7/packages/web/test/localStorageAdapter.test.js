import { test } from "node:test";
import assert from "node:assert/strict";
import { NotesService } from "@smart-notes/core";
import { LocalStorageAdapter, STORAGE_KEY } from "../localStorageAdapter.js";

// Імітація localStorage: у Node.js його немає, тому підставляємо простий об'єкт
function createFakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

test("load повертає порожній масив, якщо сховище порожнє", async () => {
  const adapter = new LocalStorageAdapter(createFakeStorage());
  assert.deepEqual(await adapter.load(), []);
});

test("save записує JSON, а load читає його назад", async () => {
  const storage = createFakeStorage();
  const adapter = new LocalStorageAdapter(storage);
  const notes = [{ id: 1, text: "Нотатка" }];

  await adapter.save(notes);

  assert.equal(storage.data[STORAGE_KEY], JSON.stringify(notes));
  assert.deepEqual(await adapter.load(), notes);
});

test("load повертає [] для пошкодженого JSON та для не-масиву", async () => {
  const broken = new LocalStorageAdapter(createFakeStorage({ [STORAGE_KEY]: "{не json" }));
  const notArray = new LocalStorageAdapter(createFakeStorage({ [STORAGE_KEY]: '{"a":1}' }));

  assert.deepEqual(await broken.load(), []);
  assert.deepEqual(await notArray.load(), []);
});

test("адаптер працює зі спільним NotesService", async () => {
  const service = new NotesService(new LocalStorageAdapter(createFakeStorage()));

  const added = await service.add("  Перевірити адаптер  ");
  assert.equal(added.ok, true);
  assert.equal((await service.list()).length, 1);

  const removed = await service.remove(added.note.id);
  assert.equal(removed.ok, true);
  assert.deepEqual(await service.list(), []);
});
