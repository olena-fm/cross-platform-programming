# Smart Notes Tauri

Лабораторна робота № 7 — десктопна версія Smart Notes на Tauri 2 (Rust + системний WebView).

Потрібні Rust (rustup) і системні залежності Tauri — див. https://tauri.app/start/prerequisites/

```
npm install
npm run tauri dev
```

Перша компіляція Rust-коду триває кілька хвилин. Нотатки зберігаються у файлі `notes.json`
у папці даних застосунку (`app_data_dir`). Збірка інсталятора: `npm run tauri build`.
