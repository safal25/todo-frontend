import type { Task, TaskStatus } from "@/types/task";

const BASE_URL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:5000";

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data?.error === "string" ? data.error : "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/api/tasks`);
  return handleResponse<Task[]>(res);
}

export interface CreateTaskBody {
  name: string;
  date: string;
  status: TaskStatus;
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  const res = await fetch(`${BASE_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<Task>(res);
}

export interface UpdateTaskUpdates {
  status?: TaskStatus;
  date?: string;
}

export async function updateTask(
  id: string,
  updates: UpdateTaskUpdates
): Promise<Task> {
  const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse<Task>(res);
}
