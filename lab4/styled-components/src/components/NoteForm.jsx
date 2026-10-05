import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 16px;
`;

const AddButton = styled.button`
  padding: 12px 18px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #1e40af;
  }
`;

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
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введіть нову нотатку"
        aria-label="Текст нотатки"
      />
      <AddButton type="submit">Додати</AddButton>
    </Form>
  );
}

export default NoteForm;
