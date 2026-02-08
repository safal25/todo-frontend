"use client";

import type { Task, TaskStatus } from "@/types/task";
import { useTasks } from "@/context/TasksContext";

const STATUS_OPTIONS: TaskStatus[] = ["Not Started", "In Progress", "Completed"];

export default function TaskRow({ task }: { task: Task }) {
  const { updateTask } = useTasks();

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span className="font-medium flex-1 min-w-[120px]">{task.name}</span>
      <select
        value={task.status}
        onChange={(e) =>
          updateTask(task.id, {
            status: e.target.value as TaskStatus,
          })
        }
        className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={task.date}
        onChange={(e) => updateTask(task.id, { date: e.target.value })}
        className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm"
      />
    </div>
  );
}
