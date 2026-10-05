import styled from "styled-components";

const Title = styled.h1`
  margin: 0 0 8px;
  color: #2563eb;
  text-align: center;
`;

const Stats = styled.p`
  margin: 0 0 20px;
  text-align: center;
  color: #475569;
`;

function Header({ total, done }) {
  return (
    <header>
      <Title>Smart Notes SPA</Title>
      <Stats>
        Усього нотаток: {total} · Виконано: {done}
      </Stats>
    </header>
  );
}

export default Header;
