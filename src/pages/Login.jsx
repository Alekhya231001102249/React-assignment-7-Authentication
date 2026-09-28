import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    let score = 0;

    // 8+ characters
    if (password.length >= 8) {
      score++;
    }

    // Lowercase
    if (/[a-z]/.test(password)) {
      score++;
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
      score++;
    }

    // Number
    if (/[0-9]/.test(password)) {
      score++;
    }

    // Special character
    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    if (score <= 2) {
      setPasswordStrength("Weak");
    } else if (score <= 4) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Username validation
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    // Password validation
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    // Minimum password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Calculate password score
    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[a-z]/.test(password)) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    // Reject weak passwords
    if (score < 3) {
      setError(
        "Password is too weak. Use uppercase, lowercase, numbers and special characters."
      );
      return;
    }

    // Simulated JWT token
    const fakeJWT =
      "fake-jwt-" +
      btoa(username) +
      "-" +
      Date.now();

    // Store simulated JWT
    localStorage.setItem("authToken", fakeJWT);

    // Remember username
    localStorage.setItem("username", username);

    // Update authentication state
    setIsAuthenticated(true);

    // Navigate to Dashboard
    navigate("/");
  };

  return (
    <main className="login-page">

      {/* Background effects */}
      <div className="login-background-glow glow-one"></div>

      <div className="login-background-glow glow-two"></div>

      {/* Login Card */}
      <section className="login-card">

        {/* Logo */}
        <div className="login-logo">
          <span>✓</span>
        </div>

        {/* Heading */}
        <div className="login-heading">

          <p className="login-brand">
            TASKFLOW
          </p>

          <h1>
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p className="login-subtitle">
            Sign in to manage your tasks
            <br />
            and stay productive.
          </p>

        </div>

        {/* Login Form */}
        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          {/* Username */}
          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-input-wrapper">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="show-password-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* Password Strength */}
          {password && (
            <div className="password-strength">

              <div className="strength-header">

                <span>
                  Password strength
                </span>

                <strong
                  className={`strength-${passwordStrength.toLowerCase()}`}
                >
                  {passwordStrength}
                </strong>

              </div>

              <div className="strength-bar">

                <div
                  className={`strength-fill strength-${passwordStrength.toLowerCase()}`}
                ></div>

              </div>

            </div>
          )}

          {/* Password Requirements */}
          {password && (
            <div className="password-requirements">

              <p>
                {password.length >= 8 ? "✓" : "○"} 8+ characters
              </p>

              <p>
                {/[A-Z]/.test(password) ? "✓" : "○"} Uppercase letter
              </p>

              <p>
                {/[a-z]/.test(password) ? "✓" : "○"} Lowercase letter
              </p>

              <p>
                {/[0-9]/.test(password) ? "✓" : "○"} Number
              </p>

              <p>
                {/[^A-Za-z0-9]/.test(password)
                  ? "✓"
                  : "○"}{" "}
                Special character
              </p>

            </div>
          )}

          {/* Error */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >

            <span>
              Sign in to TaskFlow
            </span>

            <span className="login-arrow">
              →
            </span>

          </button>

        </form>

        {/* Security Note */}
        <p className="login-note">
          Authentication protected · JWT simulation
        </p>

      </section>

      {/* Footer */}
      <div className="login-footer">
        TaskFlow · Authentication System
      </div>

    </main>
  );
}

export default Login;