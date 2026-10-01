# Лабораторна робота №3 — GraphQL API засобами Apollo Server, автентифікація користувачів

Навчальний приклад застосунку **Smart Notes**: GraphQL API на основі Apollo
Server із реєстрацією, входом та JWT-автентифікацією користувачів.

## Встановлення та запуск

```bash
npm install
npm run dev
```

Сервер стартує на порті `4001`. У консолі з'явиться повідомлення
`GraphQL API запущено за адресою: http://localhost:4001/`. Відкрийте це
посилання у браузері, щоб скористатися вбудованою **Apollo Sandbox**.

## Структура проєкту

```
lab3/
├── index.js        — точка входу, запуск Apollo Server
├── data.js         — тимчасове сховище користувачів (без БД)
├── auth.js         — створення та перевірка JWT-токенів
├── schema.js       — GraphQL-схема (typeDefs)
├── resolvers.js     — resolvers для Query та Mutation
├── queries.graphql — приклади запитів для Apollo Sandbox
└── package.json
```

## Приклади запитів

Див. файл [`queries.graphql`](./queries.graphql) — реєстрація, вхід,
захищений запит `me` та створення нотатки.
