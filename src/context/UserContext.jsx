
// import { createContext } from "react";
// const UserContext=createContext();
// export default UserContext;


import { createContext, useState } from "react";
import axios from "../config/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [serverErrors, setServerErrors] = useState("");

  // ✅ LOGIN FUNCTION
  const handleLogin = async (formData, resetForm) => {
    try {
      const response = await axios.post("/users/login", formData);

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      // ✅ Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Update state
      setUser(user);
      setIsLoggedIn(true);
      setServerErrors("");

      resetForm();
      alert("Login successful ✅");

    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.data?.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        setServerErrors("Invalid email or password");
      }
    }
  };

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        serverErrors,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
