# Todo App - Frontend

A modern, full-featured todo application built with Next.js, React, and TypeScript. This frontend application connects to a RESTful backend API to manage tasks with features like task creation, editing, status tracking, and date-based organization.

## Features

- **Task Management**: Create, view, and update tasks with name, date, and status
- **Status Tracking**: Three statuses - "Not Started", "In Progress", "Completed"
- **Date Organization**: Tasks organized by date (Today, Upcoming, Completed)
- **Smart Editing**: Modal-based editing to prevent multiple API calls when updating both status and date
- **Past Task Protection**: Past-dated tasks are read-only to maintain data integrity
- **Responsive Design**: Modern UI with dark mode support using Tailwind CSS
- **Real-time Updates**: Tasks sync with backend API for persistent storage

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Today's tasks (home page)
│   ├── add/               # Add new task page
│   ├── upcoming/          # Upcoming tasks page
│   └── completed/         # Completed tasks page
├── components/            # React components
│   ├── TaskRow.tsx        # Task row with edit button (Upcoming/Completed)
│   ├── TodayTaskRow.tsx   # Task row for today's tasks
│   ├── EditTaskModal.tsx  # Modal for editing tasks
│   └── Navbar.tsx         # Navigation component
├── context/               # React Context providers
│   └── TasksContext.tsx   # Global task state management
├── lib/                   # Utility functions
│   └── tasksApi.ts        # API client for backend communication
└── types/                 # TypeScript type definitions
    └── task.ts            # Task type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API server running (see [todo-backend](../todo-backend) for backend setup)

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Set `NEXT_PUBLIC_API_URL` to your backend API URL (default: `http://localhost:5000`)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## API Configuration

The app requires a backend API server to function. The backend should provide the following endpoints:

- `GET /api/tasks` - Fetch all tasks
- `GET /api/tasks/past` - Fetch past-dated tasks
- `GET /api/tasks/upcoming` - Fetch upcoming tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task (status and/or date)
- `DELETE /api/tasks/:id` - Delete a task

Set the `NEXT_PUBLIC_API_URL` environment variable to point to your backend server.

## Key Features Explained

### Task Organization

- **Today's Tasks**: Tasks scheduled for today (home page)
- **Upcoming Tasks**: Future tasks grouped by date
- **Completed Tasks**: All completed tasks, including past ones

### Edit Flow

Tasks are edited through a modal dialog to ensure atomic updates. When editing both status and date, only a single API call is made, preventing race conditions and duplicate requests.

### Past Task Protection

Tasks with dates in the past are automatically marked as read-only. The edit button is hidden for these tasks to prevent accidental modifications to historical data.

## Development

- **Linting**: `npm run lint`
- **Type Checking**: Built into Next.js build process
- **Hot Reload**: Enabled in development mode

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is private and proprietary.
