# Team Task Manager

A full-stack MERN application for managing projects, assigning tasks, and tracking team progress with JWT authentication and role-based access control.

## Features

### Authentication
- User Signup & Login
- JWT Authentication
- Protected Routes
- Persistent Login using Local Storage

### Role-Based Access

#### Admin
- Create Projects
- Create Tasks
- Assign Tasks to Members
- View Dashboard Analytics

#### Member
- View Assigned Tasks
- Update Task Status

### Project Management
- Create Projects
- View All Projects
- Track Team Members

### Task Management
- Create Tasks
- Assign Tasks
- Update Task Status
- Due Date Tracking

### Dashboard
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overdue Tasks

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Installation

### Clone Repository

```bash
git clone https://github.com/sam10052004/team-task-manager.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Routes

### Authentication
- POST /auth/signup
- POST /auth/login
- GET /auth/users

### Projects
- GET /projects
- POST /projects

### Tasks
- GET /tasks
- POST /tasks
- PUT /tasks/:id/status

### Dashboard
- GET /dashboard/stats

## Future Improvements
- Email Notifications
- Team Chat
- Activity Logs
- Dark Mode
- Deployment

## Author

Saumya Mathur

GitHub:
https://github.com/sam10052004
