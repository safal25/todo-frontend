"use client";

import { useState, useEffect } from "react";
import type { Task, TaskStatus } from "@/types/task";
import { useTasks } from "@/context/TasksContext";

const STATUS_OPTIONS: TaskStatus[] = ["Not Started", "In Progress", "Completed"];

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task,
}: EditTaskModalProps) {
  const { updateTask } = useTasks();
  const [status, setStatus] = useState<TaskStatus>("Not Started");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (task) {
      setStatus(task.status);
      setDate(task.date);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateTask(task!.id, { status, date });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task name
            </label>
            <p className="py-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
              {task.name}
            </p>
          </div>
          <div>
            <label
              htmlFor="edit-status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="edit-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
