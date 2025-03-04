import React, { createContext, useState, useEffect } from "react";

export const tokenAuthContext = createContext();

const ContextAPI = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = JSON.parse(sessionStorage.getItem("users"));
    const storedAdmin = JSON.parse(sessionStorage.getItem("admin"));

    if (token) {
      if (storedAdmin) {
        setIsAdmin(true);
        setUser(storedAdmin);
      } else if (storedUser) {
        setIsAdmin(false);
        setUser(storedUser);
      }
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userToken, userData, role) => {
    sessionStorage.setItem("token", userToken);
    if (role === "admin") {
      sessionStorage.setItem("admin", JSON.stringify(userData));
      setIsAdmin(true);
    } else {
      sessionStorage.setItem("users", JSON.stringify(userData));
      setIsAdmin(false);
    }
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return (
    <tokenAuthContext.Provider value={{ user, isAdmin, isAuthenticated, login, logout }}>
      {children}
    </tokenAuthContext.Provider>
  );
};

export default ContextAPI;
