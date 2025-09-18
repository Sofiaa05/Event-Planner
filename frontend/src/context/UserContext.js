import React, { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: null,
    role: null,
  });

  // Load user from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
