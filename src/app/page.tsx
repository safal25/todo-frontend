"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import { useTasks } from "@/context/TasksContext";
import TodayTaskRow from "@/components/TodayTaskRow";
import EditTaskModal from "@/components/EditTaskModal";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Home() {
  const { tasks, loading, error } = useTasks();
  const today = getToday();
  const todayTasks = tasks.filter((t) => t.date === today);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Today&apos;s Tasks</h1>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : todayTasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No tasks for today. Add one from the Add Task page.
        </p>
      ) : (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {todayTasks.map((task) => (
            <TodayTaskRow
              key={task.id}
              task={task}
              onEdit={(t) => setEditingTask(t)}
            />
          ))}
        </div>
      )}
      <EditTaskModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
      />
    </div>
  );
}
