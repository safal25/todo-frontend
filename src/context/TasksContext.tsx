"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Task, TaskStatus } from "@/types/task";

function getToday(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const DUMMY_TASKS: Task[] = [
  { id: "1", name: "Review PR", date: getToday(), status: "Not Started" },
  { id: "2", name: "Standup", date: getToday(), status: "Completed" },
  { id: "3", name: "Ship feature", date: getToday(), status: "In Progress" },
  { id: "4", name: "Plan sprint", date: getDateOffset(1), status: "Not Started" },
  { id: "5", name: "Demo to team", date: getDateOffset(2), status: "Not Started" },
  { id: "6", name: "Retro meeting", date: getDateOffset(-1), status: "Completed" },
  { id: "7", name: "Bug fix deploy", date: getDateOffset(-2), status: "Completed" },
];

interface TasksContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (
    id: string,
    updates: Partial<Pick<Task, "status" | "date">>
  ) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);

  const addTask = useCallback((task: Omit<Task, "id">) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();
    setTasks((prev) => [...prev, { ...task, id }]);
  }, []);

  const updateTask = useCallback(
    (id: string, updates: Partial<Pick<Task, "status" | "date">>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    []
  );

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}
