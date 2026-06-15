"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: number;
  ajil: string;
  isdone: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addTodo = async () => {
    const ajil = input.trim();
    if (!ajil) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ajil }),
    });
    const data = await res.json();
    setTodos([...todos, data.todo]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="placeholder"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <button
            onClick={addTodo}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-gray-200"
          >
            <span className="flex-1 text-gray-800">{todo.ajil}</span>
          </li>
        ))}
      </div>
    </div>
  );
}
