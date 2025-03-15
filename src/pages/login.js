import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css"; // Import the CSS for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username); // Optionally, you can also pass password
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
