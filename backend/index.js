import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app = express();
const PORT = process.env.PORT || 8080;

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

let todos = [];

app.get("/health", (req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  const todo = { id: nanoid(8), title: title.trim(), completed: false, createdAt: new Date().toISOString() };
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const patch = req.body || {};
  todos[idx] = { ...todos[idx], ...patch, updatedAt: new Date().toISOString() };
  res.json(todos[idx]);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const removed = todos.splice(idx, 1)[0];
  res.json(removed);
});

app.listen(PORT, () => console.log(`Todos API listening on ${PORT}`));

export default app;