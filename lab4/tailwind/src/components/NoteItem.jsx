function NoteItem({ note, onToggle, onDelete }) {
  return (
    <li
      className={
        note.done
          ? "flex items-center justify-between gap-3 rounded-lg bg-slate-200 p-3"
          : "flex items-center justify-between gap-3 rounded-lg bg-emerald-100 p-3"
      }
    >
      <label className="flex flex-1 cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          className="accent-emerald-600"
          checked={note.done}
          onChange={() => onToggle(note.id)}
        />
        <span
          className={
            note.done
              ? "break-words text-slate-500 line-through"
              : "break-words text-slate-800"
          }
        >
          {note.text}
        </span>
      </label>
      <button
        type="button"
        onClick={() => onDelete(note.id)}
        className="cursor-pointer rounded-lg bg-rose-500 px-3.5 py-2 text-white hover:bg-rose-700"
      >
        Видалити
      </button>
    </li>
  );
}

export default NoteItem;
