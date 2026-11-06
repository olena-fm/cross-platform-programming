import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NotesService } from "@smart-notes/core";
import { FileStorageAdapter } from "../fileStorageAdapter.js";

async function createTempFile() {
  const dir = await mkdtemp(join(tmpdir(), "smart-notes-"));
  return join(dir, "data", "notes.json");
}

test("load повертає [], якщо файлу немає", async () => {
  const adapter = new FileStorageAdapter(await createTempFile());
  assert.deepEqual(await adapter.load(), []);
});

test("save створює теку та файл, load читає дані назад", async () => {
  const filePath = await createTempFile();
  const adapter = new FileStorageAdapter(filePath);
  const notes = [{ id: 1, text: "Нотатка" }];

  await adapter.save(notes);

  assert.deepEqual(JSON.parse(await readFile(filePath, "utf-8")), notes);
  assert.deepEqual(await adapter.load(), notes);
});

test("load повертає [] для пошкодженого файлу", async () => {
  const filePath = await createTempFile();
  const adapter = new FileStorageAdapter(filePath);
  await adapter.save([]);
  await writeFile(filePath, "{не json", "utf-8");

  assert.deepEqual(await adapter.load(), []);
});

test("адаптер працює зі спільним NotesService", async () => {
  const adapter = new FileStorageAdapter(await createTempFile());
  const service = new NotesService(adapter);

  const added = await service.add("Перевірити файловий адаптер");
  assert.equal(added.ok, true);

  // Новий сервіс з тим самим файлом бачить збережені дані
  const reopened = new NotesService(new FileStorageAdapter(adapter.filePath));
  assert.equal((await reopened.list()).length, 1);
});
