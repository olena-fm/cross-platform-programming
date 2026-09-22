import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./services/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Сервер працює!");
});

app.use("/api/notes", noteRoutes);

connectDB(process.env.MONGO_URI).catch((err) =>
  console.error("Помилка підключення до MongoDB:", err)
);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
