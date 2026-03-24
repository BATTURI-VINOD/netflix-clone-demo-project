import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    // This is a demo login; no real auth is performed.
    login({ email });
    navigate("/");
  }

  return (
    <div className="loginPage">
      <div className="loginForm">
        <div className="loginHeader">
          <img
            src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png"
            alt="Netflix Logo"
            className="loginLogo"
          />
          <h1>Netflix Clone</h1>
          <p className="loginSubtitle">By GIST ECE C Students batch 18</p>
        </div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              required
            />
          </label>
          <button type="submit" className="loginButton">
            Sign In
          </button>
          {error && <p className="loginError">{error}</p>}
        </form>
        <p className="loginHint">
          This is a demo login; no credentials are verified.
        </p>
        <div className="loginDemo">
          <p>
            <strong>Demo credentials:</strong>
          </p>
          <p>
            Email: <code>demo@netflix.com</code>
          </p>
          <p>
            Password: <code>password123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
