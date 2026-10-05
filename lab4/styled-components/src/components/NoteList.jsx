import styled from "styled-components";
import NoteItem from "./NoteItem.jsx";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Empty = styled.p`
  text-align: center;
  color: #64748b;
`;

function NoteList({ notes, onToggle, onDelete }) {
  if (notes.length === 0) {
    return <Empty>Нотаток поки немає. Додайте першу!</Empty>;
  }

  return (
    <List>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

export default NoteList;
