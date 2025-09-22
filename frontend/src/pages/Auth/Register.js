import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Navbar from "../../components/NavBar";

const Register = () => {
  const [name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role: user
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
        role
      });

      const { token, user } = response.data;

      // save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // redirect based on role
      if (user.role === "admin") {
        navigate("/getEvents");
      } else {
        navigate("/getEvents");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log(err.message);
    }
  };

  return ( 
    <>
      <Navbar />
    <div className={styles.registerContainer}>
      <h2>Register</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already a user? {" "}
          <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
    </>
  );
};

export default Register;
