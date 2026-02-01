import AddTodo from "@/components/AddTodo";
import ToDoList from "@/components/ToDoList";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>📝 Mis Todos</h1>

      <AddTodo />

      <hr style={{ margin: "1.5rem 0" }} />

      <ToDoList />
    </main>
  );
}
