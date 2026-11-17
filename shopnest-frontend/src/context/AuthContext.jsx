
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopnest-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const token = localStorage.getItem("shopnest-token");

  const login = (data) => {
    localStorage.setItem("shopnest-token", data.token);
    localStorage.setItem("shopnest-user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("shopnest-token");
    localStorage.removeItem("shopnest-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoggedIn: !!user && !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
