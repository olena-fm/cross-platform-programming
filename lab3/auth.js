import jwt from "jsonwebtoken";
import { users } from "./data.js";

// Секретний ключ для підпису токена.
// У реальному проєкті зберігається у змінних середовища (.env), а не в коді.
const JWT_SECRET = "secret_key_for_lab_work";

// Створення JWT-токена для користувача.
export function createToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
}

// Перевірка токена та пошук відповідного користувача.
export function getUserFromToken(token) {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return users.find((user) => user.id === decoded.userId) || null;
  } catch (error) {
    return null;
  }
}

// Отримання користувача з HTTP-заголовка Authorization: Bearer <token>.
export function getUserFromAuthHeader(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "").trim();
  return getUserFromToken(token);
}
