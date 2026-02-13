"use client";

import type { Task } from "@/types/task";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function PencilIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskRow({ task, onEdit }: TaskRowProps) {
  const isPastAndCompleted = task.date < getToday() && task.status === "Completed";

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 px-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span className="font-medium flex-1 min-w-[120px]">{task.name}</span>
      <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0">
        {task.status}
      </span>
      <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0">
        {task.date}
      </span>
      {!isPastAndCompleted && (
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          aria-label="Edit task"
        >
          <PencilIcon />
        </button>
      )}
    </div>
  );
}
