"use client";

import { useState, useMemo } from "react";
import type { Task } from "@/types/task";
import { useTasks } from "@/context/TasksContext";
import TaskRow from "@/components/TaskRow";
import EditTaskModal from "@/components/EditTaskModal";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function UpcomingPage() {
  const { tasks, loading, error } = useTasks();
  const today = getToday();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const grouped = useMemo(() => {
    const upcoming = tasks.filter(
      (t) => t.date > today && t.status !== "Completed"
    );
    const byDate: Record<string, typeof tasks> = {};
    upcoming.forEach((t) => {
      if (!byDate[t.date]) byDate[t.date] = [];
      byDate[t.date].push(t);
    });
    return Object.keys(byDate)
      .sort()
      .map((date) => ({ date, list: byDate[date] }));
  }, [tasks, today]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Tasks</h1>
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : grouped.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No upcoming tasks. Add tasks with a future date.
        </p>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ date, list }) => (
            <section key={date}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {date}
              </h2>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {list.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onEdit={(t) => setEditingTask(t)}
                  />
                ))}
              </div>
            </section>
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
