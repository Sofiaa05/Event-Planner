import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; // adjust path
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css'

const LogoutButton = () => {
  const { clearUser } = useContext(UserContext); // get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();            // clears user state in context
    localStorage.clear();   // optional: remove token/role from storage
    navigate("/login");     // redirect to login
  };

  return <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>;
};

export default LogoutButton;
