import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
        <h2 className={styles.title}>Event Planner</h2>
        <LogoutButton />
    </nav>
  );
};

export default Navbar;
