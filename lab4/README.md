# Лабораторна робота №4 — Розробка вебверсії SPA-застосунку (React Hooks, Styled Components / Tailwind CSS)

Навчальний приклад застосунку **Smart Notes SPA**: односторінковий застосунок на
React (Vite) для ведення списку нотаток. Використано хуки `useState` та
`useEffect`, дані зберігаються в `localStorage`. Два варіанти стилізації —
у двох окремих проєктах із однаковою функціональністю та інтерфейсом:

| Тека | Стилізація |
|------|-----------|
| [`styled-components/`](./styled-components) | Styled Components (CSS-in-JS) |
| [`tailwind/`](./tailwind) | Tailwind CSS (utility-first) |

## Запуск (для кожного варіанту окремо)

```bash
cd styled-components      # або: cd tailwind
npm install
npm run dev
```

Vite виведе адресу на кшталт `http://localhost:5173/` — відкрийте її в браузері.

> Увага: `package.json` знаходиться всередині кожної підтеки, тому команди
> `npm install` та `npm run dev` потрібно виконувати саме в ній, а не в корені
> репозиторію.

## Структура кожного проєкту

```
src/
├── main.jsx               — точка входу, підключення React до сторінки
├── index.css              — глобальні стилі
├── App.jsx                — стан застосунку (useState, useEffect) і збирання сторінки
└── components/
    ├── Header.jsx         — заголовок і лічильники
    ├── NoteForm.jsx       — форма додавання нотатки
    ├── NoteList.jsx       — список нотаток
    └── NoteItem.jsx       — одна нотатка (позначити виконаною, видалити)
```
