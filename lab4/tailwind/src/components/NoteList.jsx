import NoteItem from "./NoteItem.jsx";

function NoteList({ notes, onToggle, onDelete }) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-slate-500">
        Нотаток поки немає. Додайте першу!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default NoteList;
