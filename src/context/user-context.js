import React, { useState, useEffect } from "react";
import tokenStorage from "../utils/services/tokenStorage";

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

  useEffect(() => {
    if (!tokenStorage.decodeToken()) {
      return;
    }
    let email = tokenStorage.decodeToken().email;
    let role = tokenStorage.decodeToken().role;
    let userId = tokenStorage.decodeToken().nameId;
    let profilePictureUrl = localStorage.getItem("profilePictureUrl");

    setUserData({ email, role, userId, profilePictureUrl });
  }, []);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
