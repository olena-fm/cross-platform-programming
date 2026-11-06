# Smart Notes Monorepo

Лабораторна робота № 7 — проєктування спільного коду та архітектури крос-платформного застосунку.

Один монорепозиторій, у якому уся прикладна логіка нотаток винесена в спільний пакет, а кожна платформа додає лише власний інтерфейс та адаптер збереження даних.

## Архітектура

```
packages/
  core/      @smart-notes/core — спільне ядро (без залежностей від платформи)
    noteValidation.js   перевірка тексту нотатки
    noteUtils.js        створення, форматування дати, сортування, пошук, очищення даних
    storageAdapter.js   інтерфейс NoteStorageAdapter + MemoryStorageAdapter (для тестів)
    notesService.js     NotesService: list / add / remove (адаптер передається ззовні)
    index.js            публічний API пакета
  web/       веб-клієнт: index.html + script.js, адаптер localStorage, статичний сервер
  desktop/   Electron-клієнт: main.js + preload.cjs + renderer, файловий адаптер (notes.json)
```

Напрямок залежностей: `web` і `desktop` залежать від `core`; `core` не залежить ні від кого.

## Запуск

```
npm install            # з кореня монорепозиторію (завантажує Electron, може тривати кілька хвилин)
npm test               # тести всіх пакетів (node:test)
npm run start:web      # веб-клієнт: http://localhost:3000
npm run start:desktop  # десктопний клієнт (Electron)
```

Окремий пакет можна запускати з прапорцем `-w`, наприклад: `npm test -w @smart-notes/core`.

## Мобільний клієнт (концепція)

Окремого мобільного пакета в проєкті немає. У лекції та завданні описано, як він підключається за тим самим принципом:
пакет `packages/mobile` (React Native / Expo) залежить від `@smart-notes/core` і реалізує
`NoteStorageAdapter` через `AsyncStorage`.
