import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">✓</span>
        TaskFlow
      </div>

      <div className="nav-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/tasks">
          Tasks
        </NavLink>

        <NavLink to="/add-task">
          + Add Task
        </NavLink>

        <NavLink to="/completed">
          Completed
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;