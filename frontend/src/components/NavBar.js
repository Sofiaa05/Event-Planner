import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const location = useLocation(); // get current route path

  // list of routes where we don't want the logout button
  const hideLogoutOn = ["/login", "/register"];

  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}>Event Planner</h2>

      {!hideLogoutOn.includes(location.pathname) && <LogoutButton />}
    </nav>
  );
};

export default Navbar;
