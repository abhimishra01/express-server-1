import express from "express";
import bp from "body-parser";
import morgan from "morgan";

const { urlencoded, json } = bp;
const db = {
  todos: [],
};

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(morgan("dev"));

app.get("/todo", (req, res) => {
  res.json({ data: db.todos });
});

app.get("/todo/:id", (req, res) => {
  const todo = db.todos.find((todo) => {
    return todo.id === +req.params.id;
  });
  res.status(201).json({ data: todo });
});

app.post("/todo", (req, res) => {
  const newTodo = {
    text: req.query.text,
    complete: false,
    id: Date.now(),
  };

  db.todos.push(newTodo);
  res.status(201).json({ data: newTodo });
});

app.listen(process.env.PORT, () => {});
