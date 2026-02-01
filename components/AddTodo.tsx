"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function AddTodo() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (task.length < 4) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("todos").insert({
      task,
      user_id: user.id,
    });

    if (error) {
      console.error(error);
    } else {
      setTask("");
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo} disabled={loading}>
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </div>
  );
}


