"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TasksContext";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AddTaskPage() {
  const { addTask } = useTasks();
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState(getToday());
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Task name is required.");
      return;
    }
    if (!date) {
      setError("Task date is required.");
      return;
    }
    setError("");
    const result = await addTask({ name: trimmed, date, status: "Not Started" });
    if (result.ok) {
      setName("");
      setDate(getToday());
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Task Name (required)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            placeholder="e.g. Review PR"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Task Date (required)
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2 font-medium hover:opacity-90 disabled:opacity-50"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
