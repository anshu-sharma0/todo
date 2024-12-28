'use client'
import { useEffect, useState } from "react";

export default function Home() {

  const [task, setTask] = useState([])
  const [todo, setTodo] = useState("")

  useEffect(() => {
    const storedTask = JSON.parse(window.localStorage.getItem("todo") || "[]")
    setTask(storedTask)
    console.log({storedTask})
  }, [])

  const addTodo = () => {
    const updated = [...task, todo]; // Add the new todo to the list
    setTask(updated); // Update the task state
    setTodo('')
    window.localStorage.setItem("todo", JSON.stringify(updated))
  }

  const clearTodos = () => {
    setTask([]); // Clear tasks in state
    window.localStorage.clear(); // Clear tasks in local storage
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div>
        {task.map((task, index) => (
          <li key={index} className="text-black bg-gray-200 p-2 my-1 rounded-md">
          {task}
        </li>
        ))}
      </div>

      <label htmlFor="todo">Add Todo</label>
      <input
        type="text" 
        // id="todo"
        value={todo}
        onChange={(e: any) => setTodo(e.target.value)}
        className="p-2 bg-gray-400 text-black" />

      <button
        className="bg-blue-500 p-2 rounded-lg px-4 hover:bg-blue-700"
        onClick={addTodo}
      >
        Add Todo
      </button>

      <button
        className="bg-red-500 p-2 rounded-lg px-4 hover:bg-red-700"
        onClick={clearTodos}
      >
        Clear
      </button>
    </div>
  );
}
