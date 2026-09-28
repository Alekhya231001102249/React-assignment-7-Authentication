import { useState } from "react";
import { Link } from "react-router-dom";

function Tasks({ tasks }) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Only show tasks that are NOT completed
  const activeTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  // Apply filters
  const filteredTasks = activeTasks.filter((task) => {
    const matchesSearch =
      task.header
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      task.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesCategory &&
      matchesStatus
    );
  });

  const clearFilters = () => {
    setSearch("");
    setPriorityFilter("All");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  return (
    <main className="page-container">

      {/* Page Header */}
      <div className="add-task-heading">

        <div>
          <p className="section-label">
            TASK MANAGEMENT
          </p>

          <h1 className="page-title">
            All Tasks
          </h1>

          <p className="section-subtitle">
            Manage your active and pending tasks.
          </p>
        </div>

        <Link
          to="/add-task"
          className="btn"
        >
          + Add Task
        </Link>

      </div>

      {/* Filter Section */}
      <div className="task-filter">

        <div className="filter-header">

          <div>
            <h3>Filter Tasks</h3>

            <p>
              Search and filter your active tasks
            </p>
          </div>

          <button
            type="button"
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        <div className="filter-controls">

          {/* Search */}
          <div className="filter-group search-group">

            <label>
              Search
            </label>

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Priority */}
          <div className="filter-group">

            <label>
              Priority
            </label>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="All">
                All Priorities
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>

          </div>

          {/* Category */}
          <div className="filter-group">

            <label>
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option value="All">
                All Categories
              </option>

              <option value="Academic">
                Academic
              </option>

              <option value="Personal">
                Personal
              </option>

            </select>

          </div>

          {/* Status */}
          <div className="filter-group">

            <label>
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Raised">
                Raised
              </option>

              <option value="Pending">
                Pending
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="filter-results">

        <span>
          Showing{" "}
          <strong>
            {filteredTasks.length}
          </strong>{" "}
          {filteredTasks.length === 1
            ? "task"
            : "tasks"}
        </span>

      </div>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (

        <div className="empty-state">

          <h2>
            No tasks found
          </h2>

          <p>
            Try changing your filters or create a new task.
          </p>

          <br />

          <button
            type="button"
            className="btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        <div className="task-grid">

          {filteredTasks.map((task) => (

            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-meta">

                <span className="badge">
                  {task.priority}
                </span>

                <span className="badge">
                  {task.category}
                </span>

                <span className="badge">
                  {task.status}
                </span>

              </div>

              <h2>
                {task.header}
              </h2>

              <p className="task-description">
                {task.description}
              </p>

              <p>
                Due: {formatDueDate(task.dueDate)}
              </p>

              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="btn"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

function formatDueDate(date) {
  if (!date) return "Not set";

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-");

    return `${day} ${new Date(
      year,
      month - 1
    ).toLocaleString("en-US", {
      month: "short",
    })} ${year}`;
  }

  return date;
}

export default Tasks;