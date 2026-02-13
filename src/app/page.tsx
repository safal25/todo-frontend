"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import { useTasks } from "@/context/TasksContext";
import TodayTaskRow from "@/components/TodayTaskRow";
import EditTaskModal from "@/components/EditTaskModal";

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const StatusOrder: Record<Task["status"], number> = {
  "Not Started": 0,
  "In Progress": 1,
  "Completed": 2,
};

export default function Home() {
  const { tasks, loading, error } = useTasks();
  const today = getToday();

  const isTodayOrIncomplete = (task: Task): boolean =>
    task.date === today || task.status !== "Completed";
  const isOverdueIncomplete = (task: Task): boolean =>
    task.date < today && task.status !== "Completed";
  const compareForHome = (a: Task, b: Task): number => {
    const overdueDiff =
      Number(isOverdueIncomplete(b)) - Number(isOverdueIncomplete(a));
    if (overdueDiff !== 0) return overdueDiff;

    const statusDiff = StatusOrder[a.status] - StatusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    return a.date.localeCompare(b.date);
  };

  const todayTasks = tasks.filter(isTodayOrIncomplete).sort(compareForHome);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Today &amp; Incomplete Tasks</h1>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : todayTasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No tasks due today or pending from earlier. Add one from the Add
          Task page.
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
