export type TaskStatus = "Not Started" | "In Progress" | "Completed";

export interface Task {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  status: TaskStatus;
}
