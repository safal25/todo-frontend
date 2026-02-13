"use client";

import type { Task } from "@/types/task";

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

interface TodayTaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TodayTaskRow({ task, onEdit }: TodayTaskRowProps) {
  const isPast = task.date < getToday();
  const isOverdueIncomplete = isPast && task.status !== "Completed";
  const isPastAndCompleted = isPast && task.status === "Completed";

  return (
    <div
      className={`flex items-center gap-3 py-3 px-4 border-b last:border-b-0 ${
        isOverdueIncomplete
          ? "border-red-200 bg-red-50/70 dark:border-red-800 dark:bg-red-950/30"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <span className="font-medium flex-1 min-w-0">{task.name}</span>
      <span
        className={`text-sm shrink-0 ${
          isOverdueIncomplete
            ? "text-red-700 dark:text-red-300"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {task.status}
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
