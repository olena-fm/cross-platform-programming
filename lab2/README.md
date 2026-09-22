# Лабораторна робота 2

## ЗАВДАННЯ 2. Ініціалізація проєкту та встановлення залежностей

У терміналі WebStorm виконайте:

```
npm init -y
npm install express mongoose cors dotenv
```

Призначення пакетів:

| Пакет | Призначення |
|---|---|
| express | Створення вебсервера та обробка HTTP-запитів |
| mongoose | Робота зі схемами та документами MongoDB |
| cors | Дозвіл міждоменних запитів від frontend-застосунку |
| dotenv | Зчитування змінних середовища з файлу .env |

У файлі `package.json` у корені проєкту додайте підтримку ES-модулів:

```json
"type": "module"
```

та скрипт запуску із режимом автоматичного перезапуску:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node --watch server.js"
}
```

## ЗАВДАННЯ 3. Створення базового сервера (server.js)

### 3.1. Файл змінних середовища

У корені проєкту створіть файл `.env`:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/lab2
```

Додайте `.env` до `.gitignore`, щоб не публікувати локальні налаштування у репозиторії.

### 3.2. Створення файлу server.js

У корені проєкту створіть файл `server.js` та підключіть встановлені пакети:

```js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
```

### 3.3. Підключення middleware

Додайте обробку JSON у тілі запитів та дозвіл міждоменних запитів:

```js
app.use(cors());
app.use(express.json());
```

### 3.4. Базовий маршрут

Додайте тестовий маршрут, щоб перевірити роботу сервера:

```js
app.get("/", (req, res) => {
  res.send("Сервер працює!");
});
```

### 3.5. Підключення до MongoDB

Підключіться до бази даних за допомогою `mongoose`, використовуючи адресу з файлу `.env`:

```js
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Підключено до MongoDB"))
  .catch((err) => console.error("Помилка підключення до MongoDB:", err));
```

### 3.6. Запуск сервера

Додайте виклик `app.listen`, щоб сервер почав слухати запити:

```js
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
```

### 3.7. Перевірка роботи

Запустіть сервер у режимі розробки командою:

```
npm run dev
```

Відкрийте у браузері `http://localhost:3000` — має з'явитися повідомлення `Сервер працює!`, а в терміналі — рядок `Підключено до MongoDB` (за умови, що MongoDB запущена локально або доступна за адресою з `.env`).
