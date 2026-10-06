import { useState } from "react";

function NoteForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const added = onAdd(text);

    if (added) {
      setText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-3 max-sm:flex-col">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введіть нову нотатку"
        aria-label="Текст нотатки"
        className="flex-1 rounded-lg border border-emerald-300 px-4 py-3 text-base"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-3 text-base text-white hover:bg-emerald-800"
      >
        Додати
      </button>
    </form>
  );
}

export default NoteForm;
