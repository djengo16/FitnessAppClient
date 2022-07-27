import React, { useState, useEffect } from "react";
import { login, logout } from "../utils/services/authService";
import tokenStorage from "../utils/services/tokenStorage";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  onLogouut: () => {},
  onLogin: () => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedUserLogedInInformation = localStorage.getItem("IsLoggedIn");
    if (storedUserLogedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    logout();
    setEmail("");
    setRole("");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("IsLoggedIn", "1");
    let token = tokenStorage.getToken();
    setEmail(tokenStorage.decodeToken(token).email);
    setRole(tokenStorage.decodeToken(token).role);
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        role: role,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
