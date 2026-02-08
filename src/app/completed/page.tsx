"use client";

import { useMemo } from "react";
import { useTasks } from "@/context/TasksContext";
import TaskRow from "@/components/TaskRow";

export default function CompletedPage() {
  const { tasks } = useTasks();

  const grouped = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "Completed");
    const byDate: Record<string, typeof tasks> = {};
    completed.forEach((t) => {
      if (!byDate[t.date]) byDate[t.date] = [];
      byDate[t.date].push(t);
    });
    return Object.keys(byDate)
      .sort()
      .reverse()
      .map((date) => ({ date, list: byDate[date] }));
  }, [tasks]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Completed Tasks</h1>
      {grouped.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No completed tasks yet.
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
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
