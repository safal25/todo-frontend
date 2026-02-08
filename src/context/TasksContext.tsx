"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { Task, TaskStatus } from "@/types/task";
import { fetchTasks, createTask, updateTask as updateTaskApi } from "@/lib/tasksApi";

export type TaskMutationResult =
  | { ok: true }
  | { ok: false; error: string };

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, "id">) => Promise<TaskMutationResult>;
  updateTask: (
    id: string,
    updates: Partial<Pick<Task, "status" | "date">>
  ) => Promise<TaskMutationResult>;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchTasks()
      .then((data) => {
        if (!cancelled) {
          setTasks(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load tasks");
          setTasks([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const addTask = useCallback(
    async (task: Omit<Task, "id">): Promise<TaskMutationResult> => {
      setError(null);
      try {
        const created = await createTask({
          name: task.name,
          date: task.date,
          status: task.status,
        });
        setTasks((prev) => [...prev, created]);
        return { ok: true };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create task";
        setError(message);
        return { ok: false, error: message };
      }
    },
    []
  );

  const updateTask = useCallback(
    async (
      id: string,
      updates: Partial<Pick<Task, "status" | "date">>
    ): Promise<TaskMutationResult> => {
      setError(null);
      try {
        const updated = await updateTaskApi(id, updates);
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? updated : t))
        );
        return { ok: true };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update task";
        setError(message);
        return { ok: false, error: message };
      }
    },
    []
  );

  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, addTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
}
