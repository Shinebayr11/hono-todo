import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

const todos = [
  {
    id: 1,
    ajil: "hool hiih",
    isdone: false,
  },
  {
    id: 2,
    ajil: "ayga ugaah",
    isdone: false,
  },
];

//  todos
app.get("/api/todos", (c) => {
  return c.json(todos);
});

// todo
app.get("/api/todos/:id", (c) => {
  const id = Number(c.req.param("id"));
  const todo = todos.find((t) => t.id === id);
  if (!todo) return c.json({ error: "Олдсонгүй" }, 404);
  return c.json(todo);
});

//

app.post("/api/todos", async (c) => {
  const input = await c.req.json();
  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    ajil: input.ajil,
    isdone: false,
  };

  todos.push(newTodo);
  console.log(todos, "todo");
  return c.json({
    message: "amjilttai",
    todo: newTodo,
  });
});

//

// app.patch("/api/todos/:id", (c) => {

//   return c.json()
// });

// //

// app.delete("/api/todos/:id" , (c) => {

//   return c.json()
// })

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
