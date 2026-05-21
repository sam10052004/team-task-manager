import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Tasks() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
  });

  const load = async () => {
    const t = await api.get("/tasks");
    setTasks(t.data);

    const p = await api.get("/projects");
    setProjects(p.data);

    if (user?.role === "Admin") {
      const u = await api.get("/auth/users");
      setUsers(u.data);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    await api.post("/tasks", form);

    setForm({
      title: "",
      description: "",
      projectId: "",
      assignedTo: "",
      dueDate: "",
    });

    load();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}/status`, { status });
    load();
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    await api.delete(`/tasks/${id}`);
    load();
  };

  return (
    <div className="page">
      <h1>Tasks</h1>

      {user?.role === "Admin" && (
        <form className="form" onSubmit={createTask}>
          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <select
            value={form.projectId}
            onChange={(e) => setForm({ ...form, projectId: e.target.value })}
            required
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          <select
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            required
          >
            <option value="">Assign To</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} - {u.role}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />

          <button type="submit">Create Task</button>
        </form>
      )}

      <div className="list">
        {tasks.map((task) => (
          <div className="item" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Project: {task.projectId?.title || "N/A"}</p>
            <p>Assigned To: {task.assignedTo?.name || "N/A"}</p>
            <p>
              Due:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>

            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {user?.role === "Admin" && (
              <button onClick={() => deleteTask(task._id)}>
                Delete Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}