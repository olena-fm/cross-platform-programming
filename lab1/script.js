/*
  Лабораторна робота 1.2: Основи кросплатформності

  Цей JavaScript-файл відповідає за логіку простого застосунку нотаток:
  - отримання тексту з поля уведення;
  - додавання нотатки до списку;
  - виведення повідомлення користувачу;
  - видалення нотаток.
*/

// Отримуємо поле уведення за його id
const noteInput = document.getElementById("noteInput");

// Отримуємо кнопку додавання нотатки
const addNoteButton = document.getElementById("addNoteButton");

// Отримуємо список, у який будуть додаватися нотатки
const notesList = document.getElementById("notesList");

// Отримуємо елемент для повідомлень користувачу
const message = document.getElementById("message");

/*
  Функція showMessage показує повідомлення користувачу.

  Параметри:
  text — текст повідомлення;
  color — колір повідомлення.
*/
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

/*
  Функція createNoteElement створює HTML-елемент нотатки.

  Параметр:
  noteText — текст нотатки, який ввів користувач.
*/
function createNoteElement(noteText) {
    // Створюємо елемент списку <li>
    const noteItem = document.createElement("li");

    // Додаємо CSS-клас для оформлення нотатки
    noteItem.className = "note-item";

    // Створюємо елемент для тексту нотатки
    const textSpan = document.createElement("span");

    // Додаємо CSS-клас для тексту
    textSpan.className = "note-text";

    // Записуємо текст нотатки
    textSpan.textContent = noteText;

    // Створюємо кнопку для видалення нотатки
    const deleteButton = document.createElement("button");

    // Додаємо CSS-клас для кнопки видалення
    deleteButton.className = "delete-button";

    // Текст на кнопці
    deleteButton.textContent = "Видалити";

    /*
      Додаємо обробник події click.
      Коли користувач натискає кнопку "Видалити",
      відповідна нотатка буде видалена зі списку.
    */
    deleteButton.addEventListener("click", function () {
        noteItem.remove();
        showMessage("Нотатку видалено.", "#ef4444");
    });

    // Додаємо текст нотатки всередину елемента <li>
    noteItem.appendChild(textSpan);

    // Додаємо кнопку видалення всередину елемента <li>
    noteItem.appendChild(deleteButton);

    // Повертаємо готовий HTML-елемент нотатки
    return noteItem;
}

/*
  Функція addNote додає нову нотатку до списку.
*/
function addNote() {
    // Отримуємо текст із поля введення та прибираємо зайві пробіли
    const noteText = noteInput.value.trim();

    // Перевіряємо, чи користувач не залишив поле порожнім
    if (noteText === "") {
        showMessage("Будь ласка, введіть текст нотатки.", "#ef4444");
        return;
    }

    // Створюємо новий елемент нотатки
    const noteElement = createNoteElement(noteText);

    // Додаємо нотатку до списку
    notesList.appendChild(noteElement);

    // Очищаємо поле введення після додавання
    noteInput.value = "";

    // Встановлюємо фокус назад у поле введення
    noteInput.focus();

    // Показуємо повідомлення про успішне додавання
    showMessage("Нотатку успішно додано.", "#16a34a");
}

/*
  Додаємо обробник події click для кнопки.
  Коли користувач натискає кнопку, викликається функція addNote.
*/
addNoteButton.addEventListener("click", addNote);

/*
  Додаємо можливість додавати нотатку клавішею Enter.
  Це покращує зручність використання застосунку.
*/
noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});
