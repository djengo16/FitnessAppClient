import React, { useState, useEffect } from "react";
import { tokenStorage } from "../utils/services/storageService";

const UserContext = React.createContext({
  email: "",
  role: "",
  userId: "",
  profilePictureUrl: "",
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    role: "",
    userId: "",
    profilePictureUrl: "",
  });

  function loadContext() {
    let decodedToken = tokenStorage.decodeToken();
    if (!decodedToken) {
      return;
    }
    let { email, role } = decodedToken;
    let userId = decodedToken.nameid;
    let profilePictureUrl = localStorage.getItem("profilePictureUrl");
    setUserData({ email, role, userId, profilePictureUrl });
  }

  useEffect(() => {
    loadContext();
  }, []);

  return (
    <UserContext.Provider value={[userData, setUserData, loadContext]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
