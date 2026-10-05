import styled from "styled-components";

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 8px;
  background: ${(props) => (props.$done ? "#dcfce7" : "#e0f2fe")};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 10px;
  cursor: pointer;
`;

const Text = styled.span`
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
  color: ${(props) => (props.$done ? "#166534" : "#1f2937")};
  word-break: break-word;
`;

const DeleteButton = styled.button`
  padding: 8px 14px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`;

function NoteItem({ note, onToggle, onDelete }) {
  return (
    <Item $done={note.done}>
      <Label>
        <input
          type="checkbox"
          checked={note.done}
          onChange={() => onToggle(note.id)}
        />
        <Text $done={note.done}>{note.text}</Text>
      </Label>
      <DeleteButton type="button" onClick={() => onDelete(note.id)}>
        Видалити
      </DeleteButton>
    </Item>
  );
}

export default NoteItem;
