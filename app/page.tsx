'use client';
import React, { useEffect, useState } from "react";
import { Trash2, Plus, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the type for a task
type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

export default function Home() {
  // State declarations with proper types
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = () => {
      setLoading(true);
      try {
        const storedTasks = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
      setLoading(false);
    };

    loadTasks();
  }, []);

  const addTodo = (): void => {
    if (todo.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: todo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const toggleTask = (id: number): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: number): void => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
  };

  const clearTodos = (): void => {
    setTasks([]);
    localStorage.removeItem("todos");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Input and Add Button */}
            <div className="flex space-x-2">
              <Input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                className="flex-1"
              />
              <Button onClick={addTodo}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Alert */}
            {showAlert && (
              <Alert variant="destructive">
                <AlertDescription>Task cannot be empty!</AlertDescription>
              </Alert>
            )}

            {/* Loading Indicator */}
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              /* Tasks List */
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <span
                        className={`${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer with Clear All Button */}
            {tasks.length > 0 && (
              <div className="flex justify-between items-center pt-4">
                <span className="text-sm text-gray-500">
                  {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </span>
                <Button variant="destructive" size="sm" onClick={clearTodos}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
