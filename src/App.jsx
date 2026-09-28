import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import CompletedTasks from "./pages/CompletedTasks";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [tasks, setTasks] = useState([
    {
      id: 1,
      header: "Complete React Assignment",
      description: "Finish the Task Manager application.",
      priority: "High",
      category: "Academic",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Pending",
    },
    {
      id: 2,
      header: "Gym Workout",
      description: "Complete today's workout session.",
      priority: "Medium",
      category: "Personal",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Raised",
    },
    {
      id: 3,
      header: "Submit Project",
      description: "Submit the completed project.",
      priority: "High",
      category: "Academic",
      raisedDate: new Date().toLocaleString(),
      dueDate: "28 Aug 2026",
      status: "Completed",
    },
  ]);

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-container">
      {!isLoginPage && <Navbar />}

      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} />
            </ProtectedRoute>
          }
        />

        {/* Protected Tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks tasks={tasks} />
            </ProtectedRoute>
          }
        />

        {/* Protected Add Task */}
        <Route
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTask
                tasks={tasks}
                setTasks={setTasks}
              />
            </ProtectedRoute>
          }
        />

        {/* Protected Task Details */}
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails
                tasks={tasks}
                setTasks={setTasks}
              />
            </ProtectedRoute>
          }
        />

        {/* Protected Completed Tasks */}
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <CompletedTasks tasks={tasks} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;