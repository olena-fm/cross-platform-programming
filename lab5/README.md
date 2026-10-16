# Smart Notes Mobile — лабораторна робота №5

Мобільний застосунок нотаток на React Native (Expo).

## Запуск

Усі команди виконуються в цій теці (там, де лежить `package.json`):

```bash
npm install
npx expo install react react-native react-native-safe-area-context
npm start
```

Друга команда підбирає версії React та React Native, сумісні з поточною версією Expo SDK.

Після `npm start` у терміналі з'явиться QR-код:

- на смартфоні відскануйте його застосунком **Expo Go** (камерою на iPhone або всередині Expo Go на Android);
- `a` — відкрити в Android-емуляторі, `i` — в iOS-симуляторі.

На iPhone Expo CLI та Expo Go мають бути авторизовані в одному безкоштовному акаунті Expo: `npx expo login`, потім вхід в Expo Go.

## Структура

```
smart-notes-mobile/
├── components/
│   ├── Header.js
│   ├── NoteForm.js
│   ├── NoteItem.js
│   └── NoteList.js
├── App.js
├── app.json
├── index.js
└── package.json
```
