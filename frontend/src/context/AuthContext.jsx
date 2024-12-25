import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Cookies } from "react-cookie";

// สร้างอินสแตนซ์ของ Cookies เพื่อจัดการกับ cookies
const cookie = new Cookies();
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = cookie.get("user");

    // ตรวจสอบว่า savedUser มีข้อมูลและสามารถแปลงเป็น JSON ได้หรือไม่
    if (savedUser) {
      try {
        return JSON.parse(savedUser); 
      } catch (e) {
        console.error("Error parsing user data from cookie:", e); 
        return null; 
      }
    }
    return null; 
  });

  // ฟังก์ชันสำหรับเข้าสู่ระบบ
  const login = (user) => {
    setUser(user); 
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = () => {
    AuthService.logout(); 
    setUser(null); 
  };

  // useEffect hook สำหรับการอัพเดท cookie เมื่อ user state เปลี่ยน
  useEffect(() => {
    if (user) {
      cookie.set("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // กำหนดอายุของ cookie เป็น 1 วัน (86400 วินาที)
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
