function Header({ total, done }) {
  return (
    <header>
      <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">
        Smart Notes SPA
      </h1>
      <p className="mb-5 text-center text-slate-600">
        Усього нотаток: {total} · Виконано: {done}
      </p>
    </header>
  );
}

export default Header;
