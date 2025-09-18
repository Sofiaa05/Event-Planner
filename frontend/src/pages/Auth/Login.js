import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save JWT token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/getEvents");
      } else {
        navigate("/getEvents");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {error && <p className={styles.error}>{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
