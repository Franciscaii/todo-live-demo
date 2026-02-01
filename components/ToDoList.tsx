"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type Todo = {
  id: number;
  task: string;
  is_complete: boolean;
};

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("id, task, is_complete")
      .order("inserted_at", { ascending: false });

    if (!error && data) {
      setTodos(data);
    }
  };

  const toggleTodo = async (id: number, is_complete: boolean) => {
    await supabase
      .from("todos")
      .update({ is_complete: !is_complete })
      .eq("id", id);

    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.is_complete}
            onChange={() => toggleTodo(todo.id, todo.is_complete)}
          />
          <span
            style={{
              textDecoration: todo.is_complete ? "line-through" : "none",
            }}
          >
            {todo.task}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

