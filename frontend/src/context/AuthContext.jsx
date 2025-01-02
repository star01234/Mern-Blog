import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  const login = (user) => setUser(user);

  const logout = () => {
    AuthService.logout();
    cookie.remove("user", { path: "/" });
    setUser(null);
  };

  function getUser() {
    const savedUser = cookie.get("user") || null;
    return savedUser ? JSON.parse(savedUser) : null;
  }

  useEffect(() => {
    if (user) {
      cookie.set("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });
    } else {
      cookie.remove("user", { path: "/" });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
