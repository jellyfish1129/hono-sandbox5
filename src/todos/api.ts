import { Hono } from "hono";

let todoList = [
  { id: "1", title: "Learning Hono", completed: false },
  { id: "2", title: "Watch the movie", completed: true },
  { id: "3", title: "Buy milk", completed: false },
];

const todos = new Hono();
todos.get("/", (c) => c.json(todoList));

todos.post("/", async (c) => {
    const param = await c.req.json<{ title: string }>();
    const newTodo = {
        id: (todoList.length + 1).toString(),
        title: param.title,
        completed: false,
    };
    todoList = [...todoList, newTodo];

    return c.json(newTodo, 201);
});

todos.put("/:id", async (c) => {
    const id = c.req.param("id");
    const todo = todoList.find((todo) => todo.id === id);
    if (!todo) {
        return c.json({ message: "Todo not found" }, 404);
    }
    const param = await c.req.json<{ title: string; completed: boolean }>();
    todoList = todoList.map((todo) => {
        if (todo.id === id) {
            return { ...todo, ...param };
        } else {
            return todo;
        }
    }) 
    return new Response(null, { status: 204 });
})

todos.delete("/:id", async(c) => {
    const id = c.req.param("id");
    const todo = todoList.find((todo) => todo.id === id);
    if (!todo) {
        return c.json({message: "Todo not found"}, 404);
    }
    todoList = todoList.filter((todo) => todo.id !== id);

    return new Response(null, { status: 204 });
})

export { todos };